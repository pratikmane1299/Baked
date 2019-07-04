import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCartService } from './../../services/shopping-cart-service/shopping-cart.service';
import { PlaceOrderService } from './../../services/order-service/place-order.service';
import { Router, NavigationEnd } from '@angular/router';
import { BootstrapAlertService, ToastMessageModel } from 'ngx-bootstrap-alert-service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit, OnDestroy {

  mobileRegex: string = "^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$";
  cartProducts: any[] = [];
  totalCartProducts: number;
  cartTotal: any;
  custId:number;
  subscription;
  messageList: ToastMessageModel[]=[];

  constructor(
    private cartService: ShoppingCartService,
    private placeOrderService: PlaceOrderService,
    private alert:BootstrapAlertService,
    private router:Router) {

      this.cartTotal = 0;
      this.cartProducts = [];
      let cart:any[] = JSON.parse(localStorage.getItem('cart'));
      if (cart != null) {
        if( cart.length > 0){
          for (let index = 0; index < cart.length; index++) {
            this.cartProducts[index] = JSON.parse(cart[index]);
          }
        }
        console.log(this.cartProducts);
      }
      this.totalCartProducts = this.cartService.getTotalCartProductCount();

      for (let index = 0; index < this.cartProducts.length; index++) {
        this.cartTotal = this.cartTotal + this.cartProducts[index].price;
      }

      let cust = JSON.parse(localStorage.getItem('loggedInUser'));
      this.custId = cust.id as number;
      console.log(this.custId);


      /* this.subscription = this.router.events.subscribe(
        e => {
          if (e instanceof NavigationEnd) {
            this.cartProducts = [];
            this.cartTotal = 0;
            this.cartProducts = this.cartService.getCartProducts();
            this.totalCartProducts = this.cartService.getTotalCartProductCount();

             let cart:any[] = JSON.parse(localStorage.getItem('cart'));
            if (cart != null) {
              if( cart.length > 0){
                for (let index = 0; index < cart.length; index++) {
                  this.cartProducts[index] = JSON.parse(cart[index]);
                }
              }
              console.log(this.cartProducts);
            }
            for (let index = 0; index < this.cartProducts.length; index++) {
              this.cartTotal = this.cartTotal + this.cartProducts[index].price;
            } 
          } 
        }
      ); */
    }

  ngOnInit() {
    this.alert.getAlertEvent().subscribe(r => {
      this.messageList.push(r);
    });
  }

  placeOrder(f){
    let json = {
      "firstname":f.value.firstName,
      "lastname":f.value.lastName,
      "mobile":f.value.mobile,
      "address":f.value.address,
      "state":f.value.state,
      "pincode":f.value.pinCode,
      "city":f.value.city,
      "paymentmode":f.value.paymentMode,
      "cartitems":this.cartProducts,
      "carttotal":this.cartTotal,
      "custid":this.custId as number
    };
    console.log(json);
    this.placeOrderService.placeOrder(json)
      .subscribe(
        res => {
          if (res["success"]) {
            this.alert.showSucccess(res['message']);
            setTimeout(() => {
              this.router.navigate(['/order-success']);
            },2000); 
          } else {
            this.alert.showError(res["message"]);
          }
        },
        error => {
          this.alert.showError(error['message']);
        }
      ); 
  }

  ngOnDestroy(){
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}

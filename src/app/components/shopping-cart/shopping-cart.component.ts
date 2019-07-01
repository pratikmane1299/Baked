import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCartService } from '../../services/shopping-cart-service/shopping-cart.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit, OnDestroy {

  cartProducts:any[] = [];
  totalCartProducts: number;
  subscription;
  cartTotal:number = 0;
  grandTotal:number = 0;

  constructor(private cartService: ShoppingCartService,private router:Router) {

    this.cartTotal = 0;
    this.grandTotal = 0;
    this.cartProducts = [];
    this.cartProducts = this.cartService.getCartProducts()
    this.totalCartProducts = this.cartService.getTotalCartProductCount();

    for (let index = 0; index < this.cartProducts.length; index++) {
      this.cartTotal = this.cartTotal + this.cartProducts[index].price;
    }

    this.grandTotal = this.cartTotal;
    console.log(this.cartTotal,this.grandTotal);



    this.subscription = this.router.events.subscribe(
      e => {
        if (e instanceof NavigationEnd) {
          this.cartProducts = [];
          this.cartTotal = 0;
          this.grandTotal = 0;
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
      
          this.grandTotal = this.cartTotal;
        } 
      }
    );
   }
  
  ngOnInit() {
    
    
    /*let cart:any[] = JSON.parse(localStorage.getItem('cart'));
    if (cart != null) {
      if( cart.length > 0){
        for (let index = 0; index < cart.length; index++) {
          this.cartProducts[index] = JSON.parse(cart[index]);
        }
        this.totalCartProducts = cart.length;
      }
      console.log(this.cartProducts);
    } else {
      this.totalCartProducts = 0;
    }*/
  }

  removeCartProduct(id){
    this.cartService.removeCartProduct(id);
    
    /* for(let i = 0;i < cart.length;i++){
      this.cartProducts[i] = JSON.parse(cart[i]);
    } */
    //this.cartProducts = this.cartService.getCartProducts()
    //this.totalCartProducts = this.cartService.getTotalCartProductCount(); 
    //console.log(this.cartProducts,this.totalCartProducts);
    this.router.navigate(['my-cart']);
    //window.location.reload();
  }

  sendToCheckout(){
    this.router.navigate(['/checkout']);
  }
  
  ngOnDestroy() {
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}

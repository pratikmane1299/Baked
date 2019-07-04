import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import * as $ from 'jquery';
import { Router, NavigationEnd } from '@angular/router';
import { CategoryService } from '../../services/category service/category.service';
import { ShoppingCartService } from '../../services/shopping-cart-service/shopping-cart.service';
import { Observable } from 'rxjs';
import { CompleterData, CompleterService, CompleterItem } from 'ng2-completer';
import { ProductServiceService } from '../../services/product-service/product-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  public isUserLoggedIn;
  public email;
  public user;
  public productNames: string[] = [];
  public categories;
  public totalCartProducts: number;
  public cartProducts: any = [];
  public subscription;
  public searchStr: string;
  public captain: string;
  public dataSource: CompleterData;
  public showSidebar: boolean = false;


  constructor(
    private router: Router,
    private categoryService: CategoryService,
    private cartService: ShoppingCartService,
    private productService: ProductServiceService,
    private completerService: CompleterService
  ) {
    this.getCategories();

    this.subscription = this.router.events.subscribe(
      e => {
        if (e instanceof NavigationEnd) {
          this.cartProducts = [];
          this.totalCartProducts = this.cartService.getTotalCartProductCount();
          let cart: any[] = JSON.parse(localStorage.getItem('cart'));
          if (cart != null) {
            if (cart.length > 0) {
              for (let index = 0; index < cart.length; index++) {
                this.cartProducts[index] = JSON.parse(cart[index]);
              }
            }
            console.log(this.cartProducts);
          }
        }
      }
    );
  }

  getCategories() {
    this.categoryService.getAllCategories()
      .subscribe(
        res => {
          console.log(res);
          this.categories = res;
        },
        error => {
          console.log(error);
        }
      );
  }

  sendToCategoryPage(category) {
    this.router.navigate(['/products', category.id, category.name]);
    $("#overlay").hide();
    $("#sidebarMenuContainer").animate({left:"-300px"},"fast");
  }

  ngOnInit() {

    $(document).ready(function(){
      $("#overlay").hide();
      $("#openSidebarButton").on('click',function(){
        $("#overlay").show();
        $("#sidebarMenuContainer").animate({left:"0px"},900);
        
      });
      $("#overlay").click(function () {
        $("#overlay").hide();
        $("#sidebarMenuContainer").animate({left:"-300px"},900);
      })
    });

    this.checkIfUserLoggedIn();
    this.checkForCartTotal();
    this.getCartProducts();
  }

  getCartProducts() {
    this.cartProducts = this.cartService.getCartProducts();
  }

  checkForCartTotal() {
    this.totalCartProducts = this.cartService.getTotalCartProductCount();
  }

  checkIfUserLoggedIn() {
    if (localStorage.getItem('loggedInUser') != null) {
      this.isUserLoggedIn = true;
      this.user = JSON.parse(localStorage.getItem("loggedInUser"));
    }
    else {
      this.isUserLoggedIn = false;
    }
  }

  logout() {
    localStorage.removeItem("loggedInUser");
    this.router.navigate(['/login']);
  }

  goToCart() {
    this.router.navigate(['/my-cart']);
  }

  removeCartProduct(id) {
    this.cartService.removeCartProduct(id);

    /* for(let i = 0;i < cart.length;i++){
      this.cartProducts[i] = JSON.parse(cart[i]);
    } */
    //this.cartProducts = this.cartService.getCartProducts()
    //this.totalCartProducts = this.cartService.getTotalCartProductCount(); 
    //console.log(this.cartProducts,this.totalCartProducts);
    //window.location.reload();
    let currentURL = this.router.url;
    if (currentURL == 'product-details') {
      this.router.navigate([currentURL])
    } else {
      this.router.navigate([currentURL]);
    }
  }

  getData() {
    this.productService.readAllProductsName()
      .subscribe(
        data => {
          this.productNames = data['products'];
          this.dataSource = this.completerService.local(this.productNames, 'name', 'name');
        }
      );
  }

  onSelected(item: CompleterItem) {
    this.router.navigate(['search-result'],{ queryParams: { 'searchQuery':item.title }})
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}

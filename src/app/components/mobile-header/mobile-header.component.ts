import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { ShoppingCartService } from 'src/app/services/shopping-cart-service/shopping-cart.service';

@Component({
  selector: 'app-mobile-header',
  templateUrl: './mobile-header.component.html',
  styleUrls: ['./mobile-header.component.css']
})
export class MobileHeaderComponent implements OnInit {
  cartProducts: any;
  totalCartProducts: number;

  constructor(private location: Location,private cartService: ShoppingCartService) { 
  }

  @Input() pageTitle: string;
  @Input() showCartDropdown: boolean;
  ngOnInit() {
  }

  goBack() {
    this.location.back();
  }

  getCartProducts() {
    this.cartProducts = this.cartService.getCartProducts();
  }

  checkForCartTotal() {
    this.totalCartProducts = this.cartService.getTotalCartProductCount();
  }

}

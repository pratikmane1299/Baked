import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  cartProducts: any = [];
  cartTotal: number;
  grandTotal: number;

  constructor() {
    this.cartTotal = 0;
    this.grandTotal = 0;
   }

  addToCart(product){
    if (localStorage.getItem('cart') == null){
      let cart: any[] = [];
      cart.push(JSON.stringify(product));
      localStorage.setItem('cart',JSON.stringify(cart));
    } else {
      let cart: any = JSON.parse(localStorage.getItem('cart'));
       cart.push(JSON.stringify(product));
      localStorage.setItem('cart',JSON.stringify(cart));
    }

    return true;
  }

  getCartProducts() {
    let cart:any[] = JSON.parse(localStorage.getItem('cart'));
    if (cart != null) {
      if( cart.length > 0){
        for (let index = 0; index < cart.length; index++) {
          this.cartProducts[index] = JSON.parse(cart[index]);
        }
        return this.cartProducts;
      }
    }
  }

  getTotalCartProductCount() {
    let cart:any[] = JSON.parse(localStorage.getItem('cart'));
    if( cart != null) {
      return cart.length;
    } else {
      return 0;
    }
  }

  removeCartProduct(id) {
    let cart:any[] = JSON.parse(localStorage.getItem('cart'));
    if (cart.length > 0) {
      for (let index = 0; index < cart.length; index++) {
        let item = JSON.parse(cart[index]);
        if (item.productID != id) {
          continue;
        } else {
          cart.splice(index,1);
          break;
        }
      }
    }

    localStorage.setItem('cart',JSON.stringify(cart));
  }

  getCartTotalAmount() {
    for (let index = 0; index < this.cartProducts.length; index++) {
      this.cartTotal = this.cartTotal + this.cartProducts[index].price;
    }
    //console.log(this.cartTotal);
    return this.cartTotal;
  }

  getCartGrandAmount(){
    for (let index = 0; index < this.cartProducts.length; index++) {
      this.grandTotal = this.grandTotal + this.cartProducts[index].price;
    }
    return this.grandTotal;
  }
}

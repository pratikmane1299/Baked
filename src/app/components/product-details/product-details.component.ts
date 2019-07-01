import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from '../../product';
import { JsonPipe } from '@angular/common';
import { Route } from '@angular/compiler/src/core';
import { ShoppingCartService } from '../../services/shopping-cart-service/shopping-cart.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product={
    "productID":0,
    "name":"",
    "brandName":"",
    "categoryName":"",
    "price":0,
    "quantity":0,
    "desc":"",
    "imageURL":""
  };
  productPrice:number;
  quantityArray:any[] = [];
  temp = 'select';

  constructor(private route:ActivatedRoute,private r:Router,private cartService: ShoppingCartService) {
    
   }

  ngOnInit() {
    this.route.paramMap.subscribe(
      params => {
        this.product.productID = Number(params.get('product-id'));
        this.product.name = params.get("name");
        this.product.brandName = params.get("brand");
        this.product.categoryName = params.get("category");
        this.product.desc = params.get("desc");
        this.product.imageURL = params.get("imageURL");
        this.product.price = Number(params.get('price'));
        this.product.quantity = Number(params.get('quantity'));
        this.productPrice = Number(params.get('price'));
        console.log(this.product);
      }
      
    );

    for (let index = 0; index < this.product.quantity; index++) {
      this.quantityArray[index]=index+1; 
    }

    console.log(this.quantityArray);
  }

  quantityChange(quantity) {
    if (quantity == "select") {
      this.product.price = this.product.price;  
      
    } else{
      this.product.price = quantity*this.productPrice;
      this.product.quantity = quantity;
    }
    console.log(quantity);
  }

  addToCart() {
    if(this.cartService.addToCart(this.product)){
      console.log("product added");

      this.r.navigate(['/product-details',this.product.productID,this.product.name,this.product.brandName,this.product.categoryName,this.product.price,this.product.quantity,this.product.desc,this.product.imageURL])

    }
    
    /* if (localStorage.getItem('cart') == null){
      let cart: any[] = [];
      cart.push(JSON.stringify(this.product));
      localStorage.setItem('cart',JSON.stringify(cart));
    } else {
      let cart: any = JSON.parse(localStorage.getItem('cart'));
       cart.push(JSON.stringify(this.product));
      localStorage.setItem('cart',JSON.stringify(cart));
      console.log(cart);
    } */

  }

}

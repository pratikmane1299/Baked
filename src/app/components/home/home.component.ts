import { Component, OnInit } from '@angular/core';
import 'bootstrap';
import { ProductServiceService } from '../../services/product-service/product-service.service';
import { CategoryService } from '../../services/category service/category.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  /*
  [
    {
      "category":"cakes",
      "pro":
      [
        {
          "name":"chocolate cake",
          "price": 340,
          "url": "./../../assets/img/ProductImages/1/Chocolate Cake.jpg"
        },
        {
          "name":"chocolate cake",
          "price": 340,
          "url": "./../../assets/img/ProductImages/1/Chocolate Cake.jpg"
        },
        {
          "name":"chocolate cake",
          "price": 340,
          "url": "./../../assets/img/ProductImages/1/Chocolate Cake.jpg"
        },
        {
          "name":"chocolate cake",
          "price": 340,
          "url": "./../../assets/img/ProductImages/1/Chocolate Cake.jpg"
        }
      ]
    },
    {
      "category":"cup-cakes",
      "pro":
      [
        {
          "name":"mixed-fruit cake",
          "price": 250,
          "url": "./../../assets/img/ProductImages/16/Coca cola cupcake.jpg"
        },
        {
          "name":"mixed-fruit cake",
          "price": 250,
          "url": "./../../assets/img/ProductImages/16/Coca cola cupcake.jpg"
        },
        {
          "name":"mixed-fruit cake",
          "price": 250,
          "url": "./../../assets/img/ProductImages/16/Coca cola cupcake.jpg"
        },
        {
          "name":"mixed-fruit cake",
          "price": 250,
          "url": "./../../assets/img/ProductImages/16/Coca cola cupcake.jpg"
        }
      ]
    }
  ] 
  */
  
  constructor(private categoryService: CategoryService) {
  }

  getCategories(){
    this.categoryService.getAllCategories()
      .subscribe(
        res => {
          /*for (let index = 0; index < this.temp.length; index++) {
            this.categoryId[index] = this.temp[index].id;
            this.categoryName[index] = this.temp[index].name;
          }
          console.log(this.categoryId);
          console.log(this.categoryName);*/
        },
        error => {
          console.log(error);
        }
      );
  }

  getHomePageProducts(){
  }

  ngOnInit() {
    //this.getCategories();
  }

}

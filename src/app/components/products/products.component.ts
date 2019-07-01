import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { ProductServiceService } from '../../services/product-service/product-service.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { IProduct } from '../../product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  category;
  categoryName;
  categoryid;
  temp;
  products:IProduct[] = [];
  subscription;

  constructor(private route:ActivatedRoute, private proService:ProductServiceService, private router:Router) { 
    this.route.paramMap.subscribe(params => {
        this.categoryid = params.get("category-id");
        this.categoryName = params.get("category-name");
      }
    );
  }

  getBgColorBootstrapClass(){
    switch(this.categoryName){
      case 'cakes':
        return 'bg-info';
      case 'cup-cakes':
        return 'bg-success';
      case 'pies':
        return 'bg-warning';
      case 'breads-and-buns':
        return 'bg-danger';
    }
  }

  getBorderColorBootstrapClass(){
    switch(this.categoryName){
      case 'cakes':
        return 'border-info';
      case 'cup-cakes':
        return 'border-success';
      case 'pies':
        return 'border-warning';
      case 'breads-and-buns':
        return 'border-danger';
    }
  }

  getTextColorBootstrapClass(){
    switch(this.categoryName){
      case 'cakes':
        return 'text-info';
      case 'cup-cakes':
        return 'text-success';
      case 'pies':
        return 'text-warning';
      case 'breads-and-buns':
        return 'text-danger';
    }
  }

  getProductsByCategory(id){
    this.proService.readProductByCategory(id)
    .subscribe(
      res =>  {
        this.products  = res["products"]; 
        console.log(res["products"]);
      },
      error => {
        console.log(error["message"]);
      }
    );
  }

  ngOnInit() {

    this.getProductsByCategory(this.categoryid);

    this.subscription = this.router.events.subscribe(
      e => {
        if (e instanceof NavigationEnd) {
          this.getProductsByCategory(this.categoryid);
        }
      }
    );
  }

  ngOnDestroy() {
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }

  sendToDetailsPage(product){
    this.router.navigate(['/product-details',product.id,product.name,product.brandname,product.categoryname,product.price,product.quantity,product.desc,product.imageURL]);
  }
}

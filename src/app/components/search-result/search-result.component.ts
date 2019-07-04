import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { query } from '@angular/core/src/render3';
import { ProductServiceService } from 'src/app/services/product-service/product-service.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {

  constructor(private route:ActivatedRoute,private router: Router, private productService: ProductServiceService) { }
  product:any[]=[];
  ngOnInit() {
    let productName: string;
    this.route.queryParams
      .subscribe(
        params => {
          productName = params.searchQuery; 
          this.getProduct(productName);
        }
      );    
  }

  getProduct(productName){
    this.productService.readProductByName(productName)
      .subscribe(
        data => {
          console.log(data);
          this.product[0] = data;
        }
      );  
  }

  sendToDetailsPage(product){
    this.router.navigate(['/product-details',product.id,product.name,product.brandname,product.categoryname,product.price,product.quantity,product.desc,product.imageURL]);
  }

}

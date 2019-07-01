import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from 'src/app/services/product-service/product-service.service';

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.css']
})
export class ManageProductsComponent implements OnInit {

  selectedBrand = 0;
  selectedCategory = 0;

  productImage: File;

  constructor(private proService: ProductServiceService) { }

  ngOnInit() {
  }

  onFileSelect(event){
    this.productImage = event.target.files[0];
  }

  addProduct(f){
    const formData: FormData = new FormData();
    formData.append('proimg',this.productImage);
    formData.append("proname",f.value.productName);
    formData.append("probrand",f.value.productBrand);
    formData.append("procategory",f.value.productCategory);
    formData.append("proprice",f.value.productPrice);
    formData.append("proqty",f.value.productQty);
    formData.append("prodesc",f.value.productDesc);
    

    /*var object = {};
    formData.forEach(function(value,key){
      object[key]=value;
    });*/

    this.proService.addProduct(formData)
      .subscribe(
        res => {
          console.log(res);
        },
        err => {
          console.log(err["message"]);
        }
      );
  }

}

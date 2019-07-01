import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CompleterService } from 'ng2-completer';


@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  addProductURL="api/add-product";
  readURL="api/read-products-by-category";
  readAllProductsNameURL = "api/read-products-name";
  readProductByNameURL = "api/read-product-by-name";

  constructor(private http:HttpClient, private completerService: CompleterService) { }

  addProduct(formData) {
    return this.http.post(this.addProductURL,formData);
  }

  readProductByCategory(categoryid){
    const data = new FormData();
    data.append("categoryid",categoryid);
    return this.http.post(this.readURL,data);
  }

  readProductByName(productName){
    return this.http.post(this.readProductByNameURL,productName);
  }

  readAllProductsName() {
    return this.http.get(this.readAllProductsNameURL);
  }
}

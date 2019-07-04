import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CompleterService } from 'ng2-completer';


@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  baseURL="https://sneakiest-sky.000webhostapp.com/api/";

  constructor(private http:HttpClient, private completerService: CompleterService) { }

  addProduct(formData) {
    return this.http.post(this.baseURL+"add-product",formData);
  }

  readProductByCategory(categoryid){
    const data = new FormData();
    data.append("categoryid",categoryid);
    return this.http.post(this.baseURL+"read-products-by-category",data);
  }

  readProductByName(productName){
    const data = new FormData();
    data.append("name",productName);
    return this.http.post(this.baseURL+"read-product-by-name",data);
  }

  readAllProductsName() {
    return this.http.get(this.baseURL+"read-products-name");
  }
}

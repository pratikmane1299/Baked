import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlaceOrderService {

  url = "api/place-order"
  orderDetailsURL = "api/get-one-order"
  constructor(private http: HttpClient) { }

  placeOrder(json){
    return this.http.post(this.url,json);
  }

  getOrderDetails(orderId){
    return this.http.post(this.orderDetailsURL,orderId);
  }
}

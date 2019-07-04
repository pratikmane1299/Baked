import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlaceOrderService {

  baseURL="https://sneakiest-sky.000webhostapp.com/api/";
  
  constructor(private http: HttpClient) { }

  placeOrder(json){
    /* const data = new FormData();
    data.append("firstname",json.firstname);
    data.append("lastname",json.lastname);
    data.append("mobile",json.mobile);
    data.append("address",json.address);
    data.append("pincode",json.pincode);
    data.append("email",json.email);
    data.append("city",json.city);
    data.append("paymentmode",json.paymentmode);
    //data.append("cartitems",json.cartitems);
    data.append("carttotal",json.carttotal);
    data.append("custid",json.custid); */

    return this.http.post(this.baseURL+"place-order",JSON.stringify(json));
  }

  getOrders(cust) {
    const data = new FormData();
    data.append("customer_id",cust.customer_id);
    return this.http.post(this.baseURL+"get-orders-one-customer",data);
  }

  getOrderDetails(orderId){
    const data = new FormData();
    data.append("customerId",orderId.customerId);
    data.append("orderId",orderId.orderId);
    return this.http.post(this.baseURL+"get-one-order",data);
  }
}

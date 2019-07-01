import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders: any[]=[];

  totalProducts: boolean;

  constructor(private http: HttpClient, private router: Router) { 
  }

  ngOnInit() {
    let cust = {
      "customer_id":JSON.parse(localStorage.getItem('loggedInUser')).id as number
    }

    this.http.post("api/get-orders-one-customer",cust)
      .subscribe(
        data => {
          this.orders = data['orders'];  
        }
      );

      if (this.orders.length > 0) {
        this.totalProducts = true;
      } else {
        this.totalProducts = false
      }
  }

  goToOrderDetails(orderId) {
    this.router.navigate(['/my-account/order-details'],{queryParams : {'orderId':orderId}});
  }

}

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { PlaceOrderService } from 'src/app/services/order-service/place-order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders: any[]=[];

  totalProducts: boolean;

  constructor(private orderService: PlaceOrderService, private router: Router) { 
  }

  ngOnInit() {
    let cust = {
      "customer_id":JSON.parse(localStorage.getItem('loggedInUser')).id as number
    }

    this.orderService.getOrders(cust)
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

import { Component, OnInit } from '@angular/core';
import { PlaceOrderService } from 'src/app/services/order-service/place-order.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  public order;
  public totalProducts: number;

  constructor(private route:ActivatedRoute, private orderService: PlaceOrderService) { }

  ngOnInit() {
    let orderId;
    this.route.queryParams
      .subscribe(
        params => {
          orderId = {
            customerId: JSON.parse(localStorage.getItem('loggedInUser')).id,
            orderId:params.orderId
          };
        }
      );
    this.orderService.getOrderDetails(orderId)
      .subscribe(
        data => {
          this.order = data;
          this.totalProducts = data['products'].length; 
        }
      );
    
    
  }
}

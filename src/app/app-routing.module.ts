import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { ManageProductsComponent } from './admin/manage-products/manage-products.component';
import { AuthGuard } from './guards/auth guard/auth-guard.service';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { OrderSuccessComponent } from './components/order-success/order-success.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { OrdersComponent } from './components/orders/orders.component';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';

const routes: Routes = [
  { 
    path: '', 
    component: HomeComponent 
  },
  { 
    path: 'products/:category-id/:category-name', 
    component: ProductsComponent, 
    runGuardsAndResolvers: 'paramsChange'
  },
  { 
    path: 'product-details/:product-id/:name/:brand/:category/:price/:quantity/:desc/:imageURL', 
    component: ProductDetailsComponent,
    runGuardsAndResolvers: 'always'
  },
  { 
    path: 'login', 
    component: LoginComponent 
  },
  { 
    path: 'register', 
    component: RegisterComponent 
  },
  {
    path: 'search-result',
    component: SearchResultComponent
  },
  { 
    path: 'forgot-password', 
    component: ForgotPasswordComponent 
  },
  { 
    path: 'change-password', 
    component: ChangePasswordComponent,
    canActivate: [AuthGuard] 
  },
  { 
    path: 'my-cart', 
    component:ShoppingCartComponent, 
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'checkout',
    component: CheckoutComponent,
    canActivate: [AuthGuard],
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'order-success',
    component: OrderSuccessComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'my-account/orders', 
    component: OrdersComponent,
    canActivate: [AuthGuard] 
  },
  {
    path: 'my-account/order-details',
    component: OrderDetailsComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'add-new-products', 
    component: ManageProductsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

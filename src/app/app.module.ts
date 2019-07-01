import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { AuthService } from './services/auth service/auth-service.service';
import { BootstrapAlertModule } from 'ngx-bootstrap-alert-service';
import { ManageProductsComponent } from './admin/manage-products/manage-products.component';
import { ProductServiceService } from './services/product-service/product-service.service';
import { CategoryService } from './services/category service/category.service';
import { SelectValidatorDirective } from './shared/select-validator.directive';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { ShoppingCartService } from './services/shopping-cart-service/shopping-cart.service';
import { AuthGuard } from './guards/auth guard/auth-guard.service';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { PlaceOrderService } from './services/order-service/place-order.service';
import { OrderSuccessComponent } from './components/order-success/order-success.component';
import { PasswordService } from './services/password service/password.service';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { MustMatchDirective } from './shared/compare-validator.directive';
import { OrdersComponent } from './components/orders/orders.component';
import { Ng2CompleterModule } from 'ng2-completer';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MobileHeaderComponent } from './components/mobile-header/mobile-header.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    NavbarComponent,
    ForgotPasswordComponent,
    ProductsComponent,
    ProductDetailsComponent,
    ManageProductsComponent,
    ShoppingCartComponent,
    CheckoutComponent,
    OrderSuccessComponent,
    ChangePasswordComponent,
    
    SelectValidatorDirective,
    MustMatchDirective,
    OrdersComponent,
    SearchResultComponent,
    OrderDetailsComponent,
    SidebarComponent,
    MobileHeaderComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BootstrapAlertModule,
    Ng2CompleterModule
  ],
  providers: [
    AuthService,
    ProductServiceService,
    CategoryService,
    ShoppingCartService,
    PlaceOrderService,
    PasswordService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

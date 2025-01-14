import { Routes } from '@angular/router';
import { ShopingComponent } from './Components/Shop/shoping/shoping.component';
import { ErrorComponent } from './Components/error/error.component';
import { ProductComponent } from './Components/Shop/product/product.component';
import { LoginComponent } from './Components/AuthComponents/login/login.component';
import { LoginCodeComponent } from './Components/AuthComponents/login-code/login-code.component';
import { CartComponent } from './Components/cart/cart.component';
import { OrderCheckOutComponent } from './Components/Order/order-check-out/order-check-out.component';
import { AddProductComponent } from './Components/add-product/add-product.component';
import { ProductDetailsComponent } from './Components/product-details/product-details.component';

export const routes: Routes = [
  { path: '', component: ShopingComponent, pathMatch: 'full' },
  { path: 'addProduct', component: AddProductComponent } , 
  {path:'checkout', component:OrderCheckOutComponent}, // Default Home route
  { path: 'shop', component: ShopingComponent }, // Shop route
  { path: 'product/:id', component: ProductComponent }, // Product details route with ID parameter
  { path: 'login', component: LoginComponent }, 
  { path: 'confirm-code', component: LoginCodeComponent },
  { path: 'product-details/:id', component: ProductDetailsComponent },
  { path: 'cart', component: CartComponent } , 
  { path: '**', component: ErrorComponent } // Wildcard route to handle 404
];

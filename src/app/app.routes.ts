import { Routes } from '@angular/router';
import { ShopingComponent } from './Components/Shop/shoping/shoping.component';
import { ErrorComponent } from './Components/error/error.component';
import { ProductComponent } from './Components/Shop/product/product.component';

export const routes: Routes = [
  { path: '', component: ShopingComponent, pathMatch: 'full' }, // Default Home route
  { path: 'shop', component: ShopingComponent }, // Shop route
  { path: 'product/:id', component: ProductComponent }, // Product details route with ID parameter
  { path: '**', component: ErrorComponent } // Wildcard route to handle 404
];

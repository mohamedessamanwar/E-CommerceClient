import { Component, OnInit } from '@angular/core';
import { CartDetailsComponent } from "../cart-details/cart-details.component";
import { IProductShoppingCartView } from '../../Modules/Cart';

import Swal from 'sweetalert2';
import { CartService } from '../../Services/CartService/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CartDetailsComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {


  productsCart:IProductShoppingCartView[]=[];
  constructor(private cartService: CartService , private router: Router) { }
  ngOnInit(): void {
    this.cartService.getCarts().subscribe({
      next: (res) => {
        if(res.data == null){
          this.productsCart = [];
        }
        else{
          this.productsCart = res.data.productShoppingCartViews ; 
        }
       
    }  , 
    error: (err) => {
      if( err.status == 401 || err.status == 403){
         this.router.navigate(['/login']);
      }
    }
  
  }
    );
  }

  Increase($event: string) {
    this.cartService.Increase($event).subscribe({
      next: (res) => {
        this.cartService.getCarts().subscribe({
          next: (res) => {
            this.productsCart = res.data?.productShoppingCartViews ?? [];
        }}
        );
      } , 
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `${err.error.message}`,
        });

      }
    });
  }
    Decrease($event: any) {
      this.cartService.Decrease($event).subscribe({
        next: (res) => {
          this.cartService.getCarts().subscribe({
            next: (res) => {
              this.productsCart = res.data?.productShoppingCartViews ?? [];
          }}
          );
        } , 
        error: (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${err.error.message}`,
          });
  
        }
      });
    }

    Remove($event: string) {
      this.cartService.Remove($event).subscribe({
        next: (res) => {
          this.cartService.getCarts().subscribe({
            next: (res) => {
              this.productsCart = res.data?.productShoppingCartViews ?? [];
               
          }}
          );
        } , 
        error: (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${err.error.message}`,
          });
  
        }
      });
      }
}

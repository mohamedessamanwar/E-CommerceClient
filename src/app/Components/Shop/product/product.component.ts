import { Component, Input } from '@angular/core';
import { IProduct } from '../../../Modules/product';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IAddToCart } from '../../../Modules/AddToCary';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CartService } from '../../../Services/CartService/cart.service';
import { Response } from '../../../Modules/response';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  count: number = 0;

  @Input() product: IProduct={} as IProduct;
  
  constructor(private cartService: CartService , private router: Router) { }


AddToCart(id: number) {
  let AddTOCartr: IAddToCart = { productId: id, count: this.count };
  this.cartService.AddToCart(AddTOCartr).subscribe({
    next: (res:Response<IAddToCart>) => {
    
      let count = localStorage.getItem('cartCount');
      if (count!=null) {
        let cartCountLocal = Number.parseInt(count);
        let newCount = res.data?.count ?? 0;
        let cartCount =  newCount  + cartCountLocal; 
        localStorage.setItem('cartCount', JSON.stringify(cartCount));   
        this.cartService.countobs.next(cartCount);
        
      } else {
        localStorage.setItem('cartCount', JSON.stringify(res.data?.count));     
        this.cartService.countobs.next(res.data?.count ?? 0 );
      }
      

      Swal.fire({
        icon: 'success',
        title: '',
        text: `product added to cart successfully with count ${res.data?.count}`, //
      });



    } , 
    error: (err) => {
      if(err.status == 400){
        Swal.fire({
          icon: 'success',
          title: 'Oops...',
          text: `${err.error.message}`,
        });
 
      }
      if(err.status == 401||err.status==403){
        this.router.navigate(['/login']);
      }
     

    }

  });
  }}
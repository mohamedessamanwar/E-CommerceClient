import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../Services/AuthService/auth.service';
import { ProductService } from '../../Services/product.service';
import { CartService } from '../../Services/CartService/cart.service';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  isAuthenticated = false;
  count = 0 ; 
  constructor(private authService : AuthService , private cartservice : CartService) {
   
   }
  ngOnInit( ): void {

    this.authService.isLogin.subscribe({
      next: (isAuthenticated:boolean) => {
        this.isAuthenticated = isAuthenticated;
      }
    });
    this.isAuthenticated = this.authService.IsAuthenticated();

     this.cartservice.countobs.subscribe({
      next: (count) => {
        this.count = count;
      }
    });
    this.count = Number(localStorage.getItem('cartCount')) ?? 0;


  }

  
  logout() {
      this.authService.logout();
    }

}

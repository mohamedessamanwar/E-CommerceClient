import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../Services/product.service';
import { IProductDetails } from '../../Modules/product';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReviewService } from '../../Services/review.service';
import Swal from 'sweetalert2';
import { ReviewData } from '../../Modules/Review';
import { Subscription } from 'rxjs';
import { SignalrService } from '../../Services/signalr.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule , FormsModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit , OnDestroy{


  selectedRating: number = 1;
  comment: string = null!  ;
  staractive : string  =  'lightblue' ;
  product!: IProductDetails
  productId: number = 1 ;
  review:ReviewData = {} as ReviewData
  sub!:Subscription
  constructor(private signalrService: SignalrService,  private router: Router  ,private productService: ProductService, private route: ActivatedRoute , private reviewService: ReviewService) {

  }
  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }

  }
  ngOnInit(): void {
    // Subscribe to the reviewReceived observable
    this.signalrService.reviewReceived.subscribe((review: any) => {
      if(review.productId == this.productId){
        this.review.reviewsUsers.push({
          id: review.id,
          userId: review.userId,
          userName: review.userName,
          comment: review.comment,
          rate: review.rate
        }); 
      }
   // Add the received review to the list
    });
    
    this.route.paramMap.subscribe((param) => {
      let  id = param.get('id'); // id is of type string | null
      if (id) {
       this.productId = +id; // Convert string to number using the '+' operator
      } else {
        console.error('Product ID is missing in the route.');
        // Handle the case where 'id' is null (e.g., redirect or show an error message)
      }
    });
    this.productService.getProductDetails(this.productId).subscribe({
      next: (res: any) => {
        this.product = res.data;

      },
      error: (err) => {
        console.log(err);
      }

    }


    );
   this.sub = this.reviewService.viewReview(this.productId).subscribe({
      next: (res: any) => {
        this.review = res.data;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
  rate(rating: number): void {
    this.selectedRating = rating;
  }

  addReview() {
console.log(this.selectedRating,this.comment);
      this.reviewService.addReview({ productId: this.productId, Rate: this.selectedRating, comment: this.comment }).subscribe({

        next: (res: any) => {
          Swal.fire('added!', 'comment is added','success' );
        },
        error: (err: any) => {
          console.log(err);
          if(err.status === 403 || err.status === 401){
            console.log(err.status);
              this.router.navigate(['/login']);
          }
          if(err.error.StatusCode == 500){
            Swal.fire('error!', 'Please enter try again', 'error');
          }
        
      
        }
      })
    }
  c: number = 1
}

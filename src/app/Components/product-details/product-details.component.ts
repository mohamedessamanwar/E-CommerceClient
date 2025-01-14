import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../Services/product.service';
import { IProductDetails } from '../../Modules/product';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {
  product!: IProductDetails
   productId: number = 1 ;
  constructor(private productService: ProductService, private route: ActivatedRoute) {

  }
  ngOnInit(): void {
    
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
        console.log(this.product);
      },
      error: (err) => {
        console.log(err);
      }

    }


    );

  }
  c: number = 0





}

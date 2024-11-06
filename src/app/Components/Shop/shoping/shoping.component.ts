import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from '../product/product.component';
import { ICategory } from '../../../Modules/category';
import { IFees, IOderBy } from '../../../Modules/fees';
import { IProduct } from '../../../Modules/product';
import { OnInit } from '@angular/core';
import { ProductService } from '../../../Services/product.service';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-shoping',
  standalone: true,
  imports: [CommonModule, ProductComponent , FormsModule , NgxPaginationModule],
  templateUrl: './shoping.component.html',
  styleUrl: './shoping.component.css'
})
export class ShopingComponent  implements OnInit {

   col:IProduct[] = [] ;
  Categories: ICategory[] = [];
  Fees : IFees[] = [];
  OrderByList: IOderBy[] = [] ;
  Page: number = 1;
  PageSize: number = 10;
  Search: string = '';
  OrderBy: number = 0;
  CategoryId: number = 0;
  FeesId: number = 0; 
  //response data from server . 
  TotalCount: number = 0;
  products: IProduct[] = [];
  Error: boolean = false;

  


  constructor(private productService: ProductService) {
    this.Categories = [
      { id: 0, name: 'All Brands' },
      { id: 1, name: 'Apple' },
      { id: 2, name: 'Dell' },
      { id: 3, name: 'HP' },
      { id: 4, name: 'Lenovo' },
      { id: 5, name: 'ASUS' },
      { id: 6, name: 'Acer' },
      { id: 7, name: 'Microsoft' },
      { id: 8, name: 'MSI' },
      { id: 9, name: 'Razer' },
      { id: 10, name: 'Samsung' }
    ] ; 

    this.Fees = [{ fees: 0, name: 'NO Fees' },{ fees: 1, name: 'Below 10,000' },
      { fees: 2, name: '10,000 - 19,999' },
      { fees: 3, name: '20,000 - 29,999' },
      { fees: 4, name: '30,000 - 49,999' },
      { fees: 5, name: '50,000 and above' } ] ;  
  
  this.OrderByList = [{ orderBy: 0, name: 'NoSort' }, {orderBy: 1, name: 'CurrentPrice' },
     ] ;
} 
  ngOnInit(): void {
    this.getProducts(this.Page, this.OrderBy, this.FeesId, this.CategoryId, this.Search) ; 
  }


  getProducts(pageNum: number, orderBy: number, fees: number, categoryId: number, search: string) {
    this.productService.getProducts(pageNum, orderBy,fees ,  categoryId,search).subscribe({
      next: (res) => {
        this.Error=false;
        this.products = res.data?.products ?? [];
        this.TotalCount = res.data?.count ?? 0;   
        console.log(res);  // res data .
        console.log(this.products);

      },
      error: (err) => {
        // Log the full error message if available
      const errorMessage = err?.error?.Message || 'An unknown error occurred';
      console.error('Error fetching products:', errorMessage)
      console.error(err.error); // res Data . 
      this.Error = true;
      },
      complete: () => {
        console.log('Product fetching completed');
      }
    });
    

  }



GetProductsByOrderBy(arg0: number) {
    this.OrderBy = arg0;
    console.log(this.OrderBy);
    this.getProducts(this.Page, this.OrderBy, this.FeesId, this.CategoryId, this.Search) ;

      
  }
  GetProductsByFees(arg0: number) {
     this.FeesId = arg0;
     this.getProducts(this.Page, this.OrderBy, this.FeesId, this.CategoryId, this.Search) ;
  }
  GetProductsByCategory(arg0: number) {
    this.CategoryId = arg0;
    this.getProducts(this.Page, this.OrderBy, this.FeesId, this.CategoryId, this.Search) ;
  }

  GetProductsBySearch(arg0: any) {
      let val = arg0.target as HTMLInputElement;
      this.Search = val.value;
      this.getProducts(this.Page, this.OrderBy, this.FeesId, this.CategoryId, this.Search) ;
    }

    Reset() {
      this.Search = '';
      this.getProducts(this.Page, this.OrderBy, this.FeesId, this.CategoryId, this.Search) ;

      }

      PageFunction($event:number){
        console.log($event);
        this.getProducts($event, this.OrderBy, this.FeesId, this.CategoryId, this.Search) ;
      }
















}


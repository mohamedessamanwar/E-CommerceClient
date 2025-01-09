import { Component } from '@angular/core';
import { IAddProduct } from '../../Modules/product';
import { ProductService } from '../../Services/product.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Route, Router } from '@angular/router';
import { routes } from '../../app.routes';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [ReactiveFormsModule , CommonModule ],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {
   categories! : any[] 
   addProductForm: FormGroup;
   constructor(private productService:ProductService ,private router: Router){
    this.addProductForm = new FormGroup({
      Name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      Model: new FormControl('', [Validators.required, Validators.minLength(2)]),
      Description: new FormControl('', [Validators.required, Validators.minLength(10)]),
      Price: new FormControl('', [Validators.required, Validators.min(0)]),
      Discount: new FormControl('', [Validators.required, Validators.min(0), Validators.max(100)]),
      CategoryId: new FormControl('1', [Validators.required]),
      Cover: new FormControl(null) // File input (no validation for now)
    });
   // Define the category data
  this.categories = [
    { Id: 1, Name: 'Apple' },
    { Id: 2, Name: 'Dell' },
    { Id: 3, Name: 'HP' },
    { Id: 4, Name: 'Lenovo' },
    { Id: 5, Name: 'ASUS' },
    { Id: 6, Name: 'Acer' },
    { Id: 7, Name: 'Microsoft' },
    { Id: 8, Name: 'MSI' },
    { Id: 9, Name: 'Razer' },
    { Id: 10, Name: 'Samsung' }
  ];
   }
   onFileChange(event: any) {
    const file = event.target.files[0]; // Get the selected file
    if (file) {
      this.addProductForm.patchValue({ Cover: file, }); // Update the form control with the file
    }
  }

   submit(){
      const addProduct: IAddProduct = {
        name: this.addProductForm.get('Name')?.value,
        model: this.addProductForm.get('Model')?.value,
        Description: this.addProductForm.get('Description')?.value,
        price: this.addProductForm.get('Price')?.value,
        Discount:  this.addProductForm.get('Discount')?.value,
        categoryId: this.addProductForm.get('CategoryId')?.value,
        Cover:this.addProductForm.get("Cover")?.value
      };
      console.log(addProduct)
      this.productService.AddProduct(addProduct).subscribe({
         next:(res)=> {
            console.log(res)
         } ,
         error: (error) => {
          if (error.status === 401 || error.status === 403) {
            // Redirect to login page or show an error message
            this.router.navigate(['/login']); // Redirect to login page
          } else {
            // Handle other errors
            console.error('An error occurred:', error.message);
          }
         
           
    } })
   }
}

import { Component, Input } from '@angular/core';
import { IProduct } from '../../../Modules/product';
import { PipeTransform } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  @Input() product: IProduct={} as IProduct;

  constructor() { }

}

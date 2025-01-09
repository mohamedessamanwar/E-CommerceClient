import { Component, Input, input } from '@angular/core';
import { IShoppingCartView } from '../../../../Modules/Cart';

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.css'
})
export class OrderDetailsComponent {
  @Input() CartProduct: IShoppingCartView | null = null ; 


}

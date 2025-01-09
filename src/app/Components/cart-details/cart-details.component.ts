import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IProductShoppingCartView } from '../../Modules/Cart';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart-details',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent {

  @Input() productsCart: IProductShoppingCartView[] | [] = [];
  @Output() eventInc = new EventEmitter<string>();
  @Output() eventDec = new EventEmitter<string>();
  @Output() eventRem = new EventEmitter<string>();

  Decrease(shoppingCartId: string) {
    console.log('Decreasing item with ID:', shoppingCartId);
    this.eventDec.emit(shoppingCartId);
  }

  Increase(shoppingCartId: string) {
    console.log('Increasing item with ID:', shoppingCartId);
    this.eventInc.emit(shoppingCartId);
  }
  Remove(arg0: string) {
    this.eventRem.emit(arg0);
    }
}
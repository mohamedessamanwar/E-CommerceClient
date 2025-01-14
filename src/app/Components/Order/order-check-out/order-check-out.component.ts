import { Component, OnInit } from '@angular/core';
import { loadStripe, Stripe, StripeCardElement, StripeElements } from '@stripe/stripe-js';
import { ReactiveFormsModule } from '@angular/forms';
import { OrderService } from '../../../Services/ordersService/order.service';
import { Router } from '@angular/router';
import { AddressService } from '../../../Services/AddressService/address.service';
import { IAddress } from '../../../Modules/Address';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { OrderDetailsComponent } from "./order-details/order-details.component";
import { CartService } from '../../../Services/CartService/cart.service';
import { IShoppingCartView } from '../../../Modules/Cart';

@Component({
  selector: 'app-order-check-out',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink, OrderDetailsComponent],
  templateUrl: './order-check-out.component.html',
  styleUrl: './order-check-out.component.css'
})
export class OrderCheckOutComponent implements OnInit {
  isCreditCard: boolean = false;
  stripe: Stripe | null = null; // Stripe instance, null initially before being loaded.
  elements: StripeElements | null = null; // Stripe elements instance, null initially.
  card: StripeCardElement | null = null; // The Stripe card element for card details input, null initially.
  errorMessage: string = ''; // To hold error message for payment.
  successMessage: string = ''; // To hold success message for payment.
  addressId!: number; // Default address ID for the order.
  Token: string = '';
  Address: IAddress[] = [];
  AddressErrorMessage: boolean = true;
  CartsProducts: IShoppingCartView | null = null;
  constructor(private orderService: OrderService, private router: Router, private addressService: AddressService, private cartService: CartService) {
  }
  ngOnInit() {
    this.addressService.getAddress().subscribe({
      next: (res) => {
        this.Address = res?.data ?? [];
        this.addressId = this.Address[this.Address.length - 1].id

      },
      error: (err) => {
        this.AddressErrorMessage = false;
      }
    });



    this.cartService.getCarts().subscribe({
      next: (res) => {
        this.CartsProducts = res?.data ?? null;

      },
      error: (err) => {
        this.CartsProducts = null;
      }
    })


  }

  ViewForm() { // Method to toggle the visibility of the credit card form.
    this.isCreditCard = !this.isCreditCard; // Toggle the boolean to switch between forms.
  }
  ChangeAddress(arg0: number) {
    console.log(arg0);
    this.addressId = arg0
  }

  async ShowPayment() { // Method to initialize and display Stripe payment elements when the user is ready to pay.
    this.stripe = await loadStripe('pk_test_51OzGU0J8wl246iKdTD9EtqgSQGPVJdGPJglszPscg6UoZdASomAFU1kHk0JJWgjzFbzzPVzJsENDcLUlSDP8z5BK00dmZBpPWP'); // Load Stripe using the public key.
    if (this.stripe) { // Check if Stripe was loaded successfully.
      this.elements = this.stripe.elements(); // Initialize Stripe Elements (used for securely collecting card details).
      this.card = this.elements.create('card', { hidePostalCode: true }); // Create a Stripe card element, hiding postal code.
      this.card.mount('#card-element'); // Mount the card element onto the DOM using the provided ID.
    }
  }

  async SubmitPayment() { // Method to submit the payment after gathering card details.
    if (!this.stripe || !this.card) { // Check if Stripe or the card element is not initialized.
      this.errorMessage = 'Stripe has not been initialized.'; // Set error message if Stripe is not initialized.
      return; // Exit the function if not initialized.
    }
    const { token, error } = await this.stripe.createToken(this.card); // Create a token with Stripe's createToken method using card details.
    if (error) { // If there's an error while creating the token.
      this.errorMessage = error.message || 'Payment failed. Please try again.'; // Show the error message.
      this.successMessage = ''; // Clear any success messages.
    } else if (token) { // If a token was successfully created.
      this.successMessage = 'Payment successful! Token created.'; // Set success message.
      this.errorMessage = ''; // Clear any error messages.
      this.Token = token.id; // Save the token ID to be used for the order.
    }
  }

  AddOrder() { // Method to add the order using the token generated from Stripe.
    this.orderService.CreateOrder({ addressId: this.addressId, token: this.Token }).subscribe({ // Call the order creation API with the address ID and payment token.
      next: (data) => { // If the API call is successful.
        console.log(data); // Log the response data.
      },
      error: (error) => { // If there's an error with the API call.
        console.log(error.error.Message); // Log the error message.
      }
    });
  }

}

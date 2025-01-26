import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SignalrService {
   hubConnection!: signalR.HubConnection;
  public reviewReceived = new Subject<any>(); // Observable to emit received reviews

  constructor() {
    this.buildConnection();
    this.startConnection();
  }

  // Build the SignalR connection
  private buildConnection() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:7138/productDetails') // Replace with your SignalR hub URL
      .build();
  }

  // Start the SignalR connection
  private startConnection() {
    this.hubConnection
      .start()
      .then(() => {
        console.log('SignalR connection started.');
        this.registerSignalREvents();
      })
      .catch((err) => {
        console.error('Error while starting SignalR connection: ', err);
      });
  }

  // Register events (e.g., "ReceiveReview")
  private registerSignalREvents() {
    this.hubConnection.on('ReceiveReview', (review: any) => {
      this.reviewReceived.next(review); // Emit the received review
    });
  }

  
}
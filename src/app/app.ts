import { Component } from '@angular/core';
import { InvoiceDetails } from './components/invoice-details/invoice-details';

@Component({
  selector: 'app-root',
  imports: [InvoiceDetails],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}

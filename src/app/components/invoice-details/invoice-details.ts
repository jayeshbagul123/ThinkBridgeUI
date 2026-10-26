
import { Component, inject } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Invoice } from '../../services/invoice';

@Component({
  selector: 'app-invoice-details',
  imports: [DecimalPipe],
  templateUrl: './invoice-details.html',
  styleUrl: './invoice-details.css',
})
export class InvoiceDetails {
  private invoiceService = inject(Invoice);
  private getInvoiceRef = this.invoiceService.getInvoice(1);

  isLoading = this.getInvoiceRef.isLoading;
  isError = this.getInvoiceRef.error;
  value = this.getInvoiceRef.value;

  protected get total(): number {
    return this.value()?.listItems.reduce((sum, item) => sum + item.price, 0) ?? 0;
  }
}

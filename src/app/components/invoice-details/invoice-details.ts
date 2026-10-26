
import { Component, inject, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Invoice } from '../../services/invoice';

@Component({
  selector: 'app-invoice-details',
  imports: [DecimalPipe, FormsModule],
  templateUrl: './invoice-details.html',
  styleUrl: './invoice-details.css',
})
export class InvoiceDetails {
  private invoiceService = inject(Invoice);
  protected invoiceIdInput: number | null = null;
  protected requestedInvoiceId = signal<number | undefined>(undefined);
  private getInvoiceRef = this.invoiceService.getInvoice(this.requestedInvoiceId);

  isLoading = this.getInvoiceRef.isLoading;
  isError = this.getInvoiceRef.error;
  value = this.getInvoiceRef.value;

  protected loadInvoice(): void {
    if (
      this.invoiceIdInput !== null &&
      Number.isInteger(this.invoiceIdInput) &&
      this.invoiceIdInput > 0
    ) {
      this.requestedInvoiceId.set(this.invoiceIdInput);
    }
  }

  protected get total(): number {
    return this.value()?.listItems.reduce((sum, item) => sum + item.price, 0) ?? 0;
  }
}

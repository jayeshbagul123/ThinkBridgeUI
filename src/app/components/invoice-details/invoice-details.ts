
import { Component, OnInit, inject, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Invoice, InvoiceRecord } from '../../services/invoice';

@Component({
  selector: 'app-invoice-details',
  imports: [CurrencyPipe],
  templateUrl: './invoice-details.html',
  styleUrl: './invoice-details.css',
})
export class InvoiceDetails implements OnInit {
  private readonly invoiceService = inject(Invoice);

  protected readonly invoice = signal<InvoiceRecord | null>(null);
  protected readonly loading = signal(true);
  protected readonly errorMessage = signal<string | null>(null);

  ngOnInit(): void {
    this.invoiceService.getInvoice(1).subscribe({
      next: (invoice) => {
        this.invoice.set(invoice);
        this.loading.set(false);
      },
      error: (error: HttpErrorResponse) => {
        console.error('Failed to load invoice details.', {
          status: error.status,
          statusText: error.statusText,
          url: error.url,
          message: error.message,
          error: error.error,
        });
        this.errorMessage.set(
          error.status === 0
            ? 'Cannot connect to the invoice API. Make sure it is running at https://localhost:7196 and that its HTTPS certificate and CORS settings allow this UI.'
            : `The invoice API returned an error (${error.status} ${error.statusText}).`,
        );
        this.loading.set(false);
      },
    });
  }

  protected get total(): number {
    return this.invoice()?.listItems.reduce((sum, item) => sum + item.price, 0) ?? 0;
  }
}

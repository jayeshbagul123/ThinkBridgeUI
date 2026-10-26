import { httpResource } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface InvoiceItem {
  itemID: number;
  invoiceID: number;
  name: string;
  price: number;
}

export interface InvoiceRecord {
  invoiceID: number;
  customerName: string;
  listItems: InvoiceItem[];
}

@Injectable({
  providedIn: 'root',
})
export class Invoice {
  private readonly apiUrl = 'https://localhost:7196/api/Invoice';

  getInvoice(invoiceId: number) {
    return httpResource<InvoiceRecord | null>(() => `${this.apiUrl}/${invoiceId}`);
  }
}

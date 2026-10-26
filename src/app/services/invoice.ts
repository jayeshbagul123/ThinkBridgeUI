import { httpResource } from '@angular/common/http';
import { Injectable, Signal } from '@angular/core';

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

  getInvoice(invoiceId: Signal<number | undefined>) {
    return httpResource<InvoiceRecord | null>(() => {
      const id = invoiceId();
      return id === undefined ? undefined : `${this.apiUrl}/${id}`;
    });
  }
}

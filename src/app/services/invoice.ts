import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

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
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'https://localhost:7196/api/Invoice';

  getInvoice(invoiceId: number): Observable<InvoiceRecord> {
    return this.http.get<InvoiceRecord>(`${this.apiUrl}/${invoiceId}`);
  }
}

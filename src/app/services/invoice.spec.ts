import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { Invoice } from './invoice';

describe('Invoice', () => {
  let service: Invoice;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(Invoice);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should request the invoice by id', () => {
    service.getInvoice(1).subscribe((invoice) => {
      expect(invoice.invoiceID).toBe(1);
    });

    const request = httpTestingController.expectOne('https://localhost:7196/api/Invoice/1');
    expect(request.request.method).toBe('GET');
    request.flush({ invoiceID: 1, customerName: 'John Doe', listItems: [] });
  });
});

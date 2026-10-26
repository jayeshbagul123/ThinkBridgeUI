import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { InvoiceDetails } from './invoice-details';

describe('InvoiceDetails', () => {
  let fixture: ComponentFixture<InvoiceDetails>;
  let http: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvoiceDetails],
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(InvoiceDetails);
    http = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => http.verify());

  it('shows the invoice details and total', () => {
    http.expectOne('https://localhost:7196/api/Invoice/1').flush({
      invoiceID: 1,
      customerName: 'John Doe',
      listItems: [{ itemID: 1, invoiceID: 1, name: 'Widget A', price: 19.99 }],
    });
    fixture.detectChanges();

    const text = fixture.nativeElement.textContent;
    expect(text).toContain('John Doe');
    expect(text).toContain('Widget A');
    expect(text).toContain('$19.99');
  });
});

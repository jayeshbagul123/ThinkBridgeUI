import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { InvoiceDetails } from './invoice-details';

describe('InvoiceDetails', () => {
  let fixture: ComponentFixture<InvoiceDetails>;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvoiceDetails],
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvoiceDetails);
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => httpTestingController.verify());

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
    httpTestingController.expectOne('https://localhost:7196/api/Invoice/1').flush({
      invoiceID: 1,
      customerName: 'John Doe',
      listItems: [{ itemID: 1, invoiceID: 1, name: 'Widget A', price: 19.99 }],
    });
  });

  it('should display invoice details and the total', () => {
    httpTestingController.expectOne('https://localhost:7196/api/Invoice/1').flush({
      invoiceID: 1,
      customerName: 'John Doe',
      listItems: [{ itemID: 1, invoiceID: 1, name: 'Widget A', price: 19.99 }],
    });
    fixture.detectChanges();

    const page = fixture.nativeElement.textContent;
    expect(page).toContain('John Doe');
    expect(page).toContain('Widget A');
    expect(page).toContain('$19.99');
  });

  it('should show an error when the invoice request fails', () => {
    httpTestingController.expectOne('https://localhost:7196/api/Invoice/1').flush(
      { message: 'Unavailable' },
      { status: 500, statusText: 'Server Error' },
    );
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('The invoice API returned an error (500 Server Error)');
  });

  it('should explain how to diagnose a connection failure', () => {
    httpTestingController.expectOne('https://localhost:7196/api/Invoice/1').error(
      new ProgressEvent('error'),
    );
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Cannot connect to the invoice API');
    expect(fixture.nativeElement.textContent).toContain('https://localhost:7196');
  });
});

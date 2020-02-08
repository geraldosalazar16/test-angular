import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { NgxSpinnerService } from 'ngx-spinner';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
    activeRequests = 0;
    constructor(
        private spinner: NgxSpinnerService
    ) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.activeRequests === 0) {
            console.log('Spinning');
            this.spinner.show();
          }

        this.activeRequests++;

        return next.handle(request).pipe(
            finalize(() => {
              this.activeRequests--;
              if (this.activeRequests === 0) {
                console.log('Spinning no more');
                this.spinner.hide();
              }
            })
          );
    }
}

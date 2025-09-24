import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const fakeToken = localStorage.getItem('fake_token');
    if (fakeToken) {
      const cloned = req.clone({
        setHeaders: { Authorization: `Bearer ${fakeToken}` }
      });
      return next.handle(cloned);
    }
    return next.handle(req);
  }
}

import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

export class AuthenticationInterceptor implements HttpInterceptor {

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = localStorage.getItem('token');

        if (token) {
            const clonedRequest = request.clone({
                headers: request.headers.set('Authorization', token),
            });

            return next.handle(clonedRequest);
        }

        return next.handle(request);
    }

}

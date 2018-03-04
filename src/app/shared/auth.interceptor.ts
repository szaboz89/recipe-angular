import {Observable} from 'rxjs/Observable';
import {HttpInterceptor, HttpHandler, HttpRequest, HttpEvent} from '@angular/common/http';

export class AuthInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('Intercepted!', req);
        const copiedReq = req.clone({
            params: req.params.set('auth', 'token')
        });
        return next.handle(req);
    }
}

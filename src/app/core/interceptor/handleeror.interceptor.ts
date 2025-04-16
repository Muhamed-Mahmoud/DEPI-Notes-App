import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, map, Observable, tap, throwError } from 'rxjs';

@Injectable()
export class  HandleErrorInterceptor implements HttpInterceptor {

  constructor(private toastr: ToastrService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    //them request vao header 
    return next.handle(request).pipe(catchError((error)=>{
      console.log('Error',error);
      if(error.status === 401 || error.status === 403|| error.status === 400){
        this.toastr.error('Error', error);
      }
      //throw error;
      //condtion to handle error navigate to the error page status code 401,403
      //navigate to login page and remove token from local storage
      return throwError(error);
    }),
    tap((event)=>{
      console.log('side effect',event);
    }),
    map((event)=>{
      console.log('logical ',event);// this is the response from the server 
      return event;
    })
  );
  }
}

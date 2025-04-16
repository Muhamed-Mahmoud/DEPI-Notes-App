import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { HandleErrorInterceptor } from "./handleerror.interceptor";
import { JwtInterceptor } from "./jwt.interceptor";



export const HttpInterceptorProvider = [
    {
        provide: HTTP_INTERCEPTORS,
        useClass: JwtInterceptor,
        multi: true
    },
    {
        provide: HTTP_INTERCEPTORS,
        HandleErrorInterceptor,
        multi: true
    }
]
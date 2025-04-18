import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpInterceptorProvider } from './interceptor';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  providers: [HttpInterceptorProvider]
})
export class CoreModule { }

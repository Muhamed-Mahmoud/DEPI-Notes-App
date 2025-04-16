import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotesRoutingModule } from './notes-routing.module';
import { NotesComponent } from './notes.component';
import { CreateComponent } from './create/create.component';

import { ViewComponent } from './view/view.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    NotesComponent,
    CreateComponent,
    
    ViewComponent
  ],
  imports: [
    CommonModule,
    NotesRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ]
})
export class NotesModule { }

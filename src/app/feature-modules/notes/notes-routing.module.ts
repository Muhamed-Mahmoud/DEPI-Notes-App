import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotesComponent } from './notes.component';
import { CreateComponent } from './create/create.component';
import { ViewComponent } from './view/view.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';

const routes: Routes = [
  { path: '', component: NotesComponent },
   { path: 'create', component: CreateComponent , canActivate: [AuthGuard] },

  { path: 'view/:id', component: ViewComponent , canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotesRoutingModule { }

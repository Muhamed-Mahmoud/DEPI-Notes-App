import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthGuardsure } from './core/guards/auths.guard';
import { GuestGuard } from './core/guards/core.guard';

const routes: Routes = [
  { 
    path: 'notes', 
    loadChildren: () => import('./feature-modules/notes/notes.module').then(m => m.NotesModule),
    canActivate: [AuthGuardsure]
  },
  { 
    path: 'home', 
    loadChildren: () => import('./feature-modules/home/home.module').then(m => m.HomeModule),
    canActivate: [AuthGuardsure]
  },
  { 
    path: 'auth', 
    loadChildren: () => import('./feature-modules/auth/auth.module').then(m => m.AuthModule)
    ,canActivate: [GuestGuard] 
  },
  { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home/home.component';
import { NotFoundComponent } from './home/not-found/not-found.component';
import { loginGuard } from './dashboard/data-access/guards/login.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'auth',
    loadChildren: () =>
      import("./auth/auth.module").then(
        (m) => m.AuthModule
      )
  },
  {
    path: 'dashboard',
    // canActivate: [loginGuard],
    loadChildren: () =>
      import("./dashboard/dashboard.module").then(
        (m) => m.DashboardModule
      )
  },
  { path: '**', component: NotFoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

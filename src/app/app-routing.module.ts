import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ProductComponent } from './product/product/product.component';
import { SingleProductComponent } from './single-product/single-product.component';
import { FormsComponent } from './forms/forms.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth.guard';
import { LogoutGuard } from './logout.guard';

const routes: Routes = [
  {path:'', component:ProductComponent},
  {path:'product/:id', component:SingleProductComponent, canActivate: [AuthGuard]},
  {path:'login', component:AuthComponent, canActivate: [LogoutGuard]},
  { path: 'image', loadChildren: () => import('./image/image.module').then(m => m.ImageModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

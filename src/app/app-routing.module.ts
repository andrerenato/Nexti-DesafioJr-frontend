import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientDetailsComponent } from './components/client/client-details/client-details.component';
import { ClientComponent } from './components/client/client.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { OrderDetailsComponent } from './components/order/order-details/order-details.component';
import { OrderComponent } from './components/order/order.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ProductDetailsComponent } from './components/product/product-details/product-details.component';
import { ProductComponent } from './components/product/product.component';

const routes: Routes = [
  {path: 'clients', component: ClientComponent},
  {path: 'clients/:id', component: ClientDetailsComponent},
  {path: 'products', component: ProductComponent},
  {path: 'products/:id', component: ProductDetailsComponent},
  {path: 'orders', component: OrderComponent},
  {path: 'orders/:id', component: OrderDetailsComponent},
  {path: '', component: DashboardComponent},
  {path: '**', component: PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

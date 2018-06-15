import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientComponent } from "./client/client.component"
import { CompanyComponent } from "./company/company.component"
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: ClientComponent },
  { path: 'client', component: ClientComponent },
  { path: 'company', component: CompanyComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }

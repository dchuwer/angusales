import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import {MatTableModule} from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material';
import { MatInputModule } from '@angular/material';
import {MatToolbarModule} from '@angular/material/toolbar';
import { HttpClientModule } from '@angular/common/http';
import {MatDialogModule} from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {MatPaginatorModule} from '@angular/material/paginator';

import { AppComponent } from './app.component';
import { ClientComponent } from './client/client.component';
import { ClientService } from './client.service';
import { PopupclientComponent } from './popupclient/popupclient.component';
import { HeadComponent } from './head/head.component';
import { CompanyService } from './company.service';
import { CommentComponent } from './comment/comment.component';

@NgModule({
  declarations: [ 
    AppComponent,
    ClientComponent,
    PopupclientComponent,
    HeadComponent,
    CommentComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    HttpClientModule,
    MatDialogModule,
    FormsModule,
    MatSelectModule,
    MatIconModule,
    MatPaginatorModule
   
  
  ],
  entryComponents: [PopupclientComponent, CommentComponent],
  providers: [ClientService,CompanyService],
  bootstrap: [AppComponent]
})
export class AppModule { }

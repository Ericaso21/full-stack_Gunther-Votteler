import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TemplateRoutingModule } from './template-layout.routing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ClipboardModule } from 'ngx-clipboard';
import { CategoriesComponent } from 'src/app/pages/categories/categories.component';
import { FilmsComponent } from 'src/app/pages/films/films.component';
import { FilmsClientComponent } from 'src/app/pages/films-client/films-client.component';
import { DataTablesModule } from 'angular-datatables';
import { FilmsCategoryComponent } from 'src/app/pages/films-category/films-category.component';

@NgModule({
  declarations: [
    CategoriesComponent,
    FilmsComponent,
    FilmsClientComponent,
    FilmsCategoryComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(TemplateRoutingModule),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule,
    DataTablesModule
  ]
})
export class TemplateModule { }

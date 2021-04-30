import { Routes } from '@angular/router';
import { RoleGuard } from 'src/app/guard/role.guard';
import { CategoriesComponent } from 'src/app/pages/categories/categories.component';
import { FilmsCategoryComponent } from 'src/app/pages/films-category/films-category.component';
import { FilmsClientComponent } from 'src/app/pages/films-client/films-client.component';
import { FilmsComponent } from 'src/app/pages/films/films.component';


export const TemplateRoutingModule: Routes = [
    { path: 'categorias', component: CategoriesComponent, canActivate: [RoleGuard] },
    { path: 'peliculas', component: FilmsComponent, canActivate: [RoleGuard] },
    { path: 'pelicula', component: FilmsClientComponent },
    { path: 'peliculas/:id', component: FilmsCategoryComponent }
]

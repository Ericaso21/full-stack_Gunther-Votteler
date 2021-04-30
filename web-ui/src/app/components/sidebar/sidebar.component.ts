import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

declare interface RouteInfo {
  path: string,
  title: string,
  icon: string,
  class: string
}

export const ROUTES: RouteInfo[] = [
  { path: '/categorias', title: 'Categorias', icon: 'ni ni-single-copy-04 text-primary', class: '' },
  { path: '/peliculas', title: 'Peliculas.', icon: 'ni ni-album-2 text-primary', class: '' },
  { path: '/pelicula', title: 'Peliculas', icon: 'ni ni-album-2 text-primary', class: '' }
]

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  public menuItems: any[] = [];
  public isCollapsed = true;

  constructor(private router: Router, public authService: AuthenticationService) { }

  ngOnInit(): void {
    console.log(this.authService.roleLogIn)
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
    })
  }

  logout() {
    this.authService.logout();
  }

}

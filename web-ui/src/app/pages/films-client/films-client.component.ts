import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { FilmsService } from 'src/app/services/films.service';

@Component({
  selector: 'app-films-client',
  templateUrl: './films-client.component.html',
  styles: [
  ]
})
export class FilmsClientComponent implements OnInit {

  //data save
  films: any;
  categories: any;
  list_categories: any;
  selectedSkill: any

  constructor(private filmsService: FilmsService, private recaptchaV3Service: ReCaptchaV3Service, private router: Router) { }

  ngOnInit(): void {
    this.getFilms();
    this.getCategories();
  }

  getSelectedSkill() {
    this.router.navigate([`/peliculas/${this.selectedSkill}`]);
  }

  getFilms() {
    this.recaptchaV3Service.execute('action').subscribe(
      (token) => {
        this.filmsService.getFilms(token).subscribe(
          (res: any) => {
            this.films = res['films'];
            this.categories = res['category']
          },
          (err: any) => {
            console.log(err);
          }
        )
      }
    )
  }

  getCategories() {
    this.recaptchaV3Service.execute('action').subscribe(
      (token: any) => {
        this.filmsService.getCategories(token).subscribe(
          (res: any) => {
            this.list_categories = res;
          },
          (err: any) => {
            console.log(err);
          }
        )
      }
    )
  }
}

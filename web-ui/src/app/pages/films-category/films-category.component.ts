import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { FilmsService } from 'src/app/services/films.service';

@Component({
  selector: 'app-films-category',
  templateUrl: './films-category.component.html',
  styles: [
  ]
})
export class FilmsCategoryComponent implements OnInit {

  //data save
  films: any;
  categories: any;
  list_categories: any;
  selectedSkill: any

  constructor(private filmsService: FilmsService, private recaptchaV3Service: ReCaptchaV3Service, private router: Router, private activeRouter: ActivatedRoute) { }

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
        let id = this.activeRouter.snapshot.params;
        this.filmsService.getCategory(token, id.id).subscribe(
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

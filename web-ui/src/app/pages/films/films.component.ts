import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { Subject } from 'rxjs';
import { Films } from 'src/app/interfaces/films';
import { FilmsService } from 'src/app/services/films.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styles: [
  ]
})
export class FilmsComponent implements AfterViewInit, OnDestroy, OnInit {
  //dataTable configuraciones
  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  // variable que guarda los datos
  films: any;
  categories: any;
  list_categoria: any;

  //ngModel: boolean

  films_save: Films | any = {
    token: '',
    movie_id: 0,
    movie_image: '',
    movie_title: '',
    movie_description: '',
    movie_duration: new Date(),
    movie_trailer: '',
    movie_premiere_date: new Date(),
    pk_fk_category_id: []
  }

  //open modal
  submitted: boolean = false;

  constructor(private filmsService: FilmsService, private recaptchaV3Service: ReCaptchaV3Service, config: NgbModalConfig, private modalService: NgbModal) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  open(content: any) {
    this.modalService.open(content);
  }

  close() {
    document.getElementById('closeModal')?.click();
    this.films_save = {
      token: '',
      movie_id: 0,
      movie_image: '',
      movie_title: '',
      movie_description: '',
      movie_duration: new Date(),
      movie_trailer: '',
      movie_premiere_date: new Date(),
      pk_fk_category_id: []
    }
  }

  ngOnInit(): void {
    this.getCategories();
    this.dtOptions = {
      responsive: true,
      processing: true,
      pagingType: 'full_numbers',
      pageLength: 10,
      language: {
        url: "//cdn.datatables.net/plug-ins/1.10.22/i18n/Spanish.json"
      },
      destroy: true,
      autoWidth: true,
      order: [1, 'asc']
    };
  }

  ngAfterViewInit(): void {
    this.recaptchaV3Service.execute('action').subscribe(
      (token) => {
        this.getFilms(token)
      },
      (error: any) => {
        console.log(error)
      }
    )
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      this.recaptchaV3Service.execute('action').subscribe(
        (token) => {
          this.getFilms(token);
        },
        (err) => {
          console.log(err);
        }
      )
      dtInstance.destroy();
    })
  }

  getCategories() {
    this.recaptchaV3Service.execute('action').subscribe(
      (token) => {
        this.filmsService.getCategories(token).subscribe(
          (res: any) => {
            this.list_categoria = res
          },
          (err) => {
            console.log(err);
          }
        )
      }
    )
  }

  getFilms(token: any) {
    this.filmsService.getFilms(token).subscribe(
      (res: any) => {
        this.films = res['films'];
        this.categories = res['category'];
        console.log(this.categories)
        this.dtTrigger.next();
      },
      (error: any) => {
        console.log(error)
      }
    )
  }

  saveMovie() {
    this.recaptchaV3Service.execute('action').subscribe(
      (token) => {
        this.films_save.token = token;
        this.filmsService.saveFilms(this.films_save).subscribe(
          (res: any) => {
            if (res['status']) {
              Swal.fire('¡Pelicula!', res['message'], 'success');
              this.rerender();
              this.close();
            }
          },
          (error: any) => {
            if (error['status'] == 404) {
              Swal.fire('¡Error!', error['error']['message'], 'error');
            }
          }
        )
      }
    )
  }

}

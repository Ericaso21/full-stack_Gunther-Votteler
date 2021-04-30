import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { Subject } from 'rxjs';
import { Categories } from 'src/app/interfaces/categories';
import { CategoriesService } from 'src/app/services/categories.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styles: [
  ]
})
export class CategoriesComponent implements AfterViewInit, OnDestroy, OnInit {
  //dataTable configuraciones
  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  // variable que guarda los datos
  categories: any;

  //ngModel
  category: Categories | any = {
    token: '',
    category_id: 0,
    category_name: ''
  };

  //modal actualizar
  edit: boolean = false;
  //open modal
  submitted: boolean = false;

  constructor(private categoriesService: CategoriesService, private recaptchaV3Service: ReCaptchaV3Service, config: NgbModalConfig, private modalService: NgbModal) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  open(content: any) {
    this.modalService.open(content);
  }

  close() {
    document.getElementById('closeModal')?.click();
    this.category = {
      token: '',
      category_id: 0,
      category_name: ''
    }
  }

  ngOnInit(): void {
    this.dtOptions = {
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
        this.getCategories(token)
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
          this.getCategories(token);
        },
        (err) => {
          console.log(err);
        }
      )
      dtInstance.destroy();
    })
  }

  getCategories(token: any) {
    this.categoriesService.getCategories(token).subscribe(
      (res: any) => {
        this.categories = res;
        this.dtTrigger.next();
      },
      (err: any) => {
        console.log(err);
      }
    )
  }

  getCategory(id: string) {
    this.recaptchaV3Service.execute('action').subscribe(
      (token) => {
        this.categoriesService.getCategory(token, id).subscribe(
          (res: any) => {
            this.category = res;
            this.edit = true;
          },
          (error: any) => {
            console.log(error);
          }
        )
      }
    )
  }

  saveCategory() {
    this.recaptchaV3Service.execute('action').subscribe(
      (token) => {
        this.category.token = token;
        this.categoriesService.saveCategory(this.category).subscribe(
          (res: any) => {
            if (res['status']) {
              Swal.fire('¡Categoria!', res['message'], 'success');
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

  updateCategory() {
    this.recaptchaV3Service.execute('action').subscribe(
      (token) => {
        this.category.token = token;
        this.categoriesService.updateCategory(this.category, this.category.category_id).subscribe(
          (res: any) => {
            if (res['status']) {
              Swal.fire('¡Categoria!', res['message'], 'success');
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

  deleteCategory(id: string) {
    Swal.fire({
      title: 'Estas Seguro',
      text: '¡No podras revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar'
    }).then(result => {
      if (result.value) {
        this.recaptchaV3Service.execute('action').subscribe(
          (token) => {
            this.categoriesService.deleteCategory(token, id).subscribe(
              (res: any) => {
                if (res['status']) {
                  Swal.fire('Eliminado', res['message'], 'success');
                  this.rerender();
                  this.edit = false;
                }
              },
              (error: any) => {
                if (error['status'] == 404) {
                  Swal.fire('¡Error!', error['error']['message'], 'error');
                }
              }
            )
          },
          (error: any) => {
            console.log(error)
          }
        )
      }
    })
  }

}

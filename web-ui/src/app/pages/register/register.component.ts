import { Component, OnInit } from '@angular/core';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { User } from 'src/app/interfaces/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {

  //ngModel
  user: User | any = {
    token: '',
    fk_role_id: 0,
    first_name: '',
    second_name: '',
    surname: '',
    second_surname: '',
    email: '',
    password_user: ''
  }

  constructor(private authenticationService: AuthenticationService, private recaptchaV3Service: ReCaptchaV3Service) { }

  ngOnInit(): void {
  }

  saveUser() {
    this.recaptchaV3Service.execute('action').subscribe(
      (token) => {
        this.user.token = token;
        if (this.user.first_name.split(' ')[1] == undefined) {
          delete this.user.second_name
        } else {
          this.user.second_name = this.user.first_name.split(' ')[1];
        }

        if (this.user.surname.split(' ')[1] == undefined) {
          delete this.user.second_surname
        } else {
          this.user.second_surname = this.user.surname.split(' ')[1];
        }
        this.user.surname = this.user.surname.split(' ')[0];
        this.user.first_name = this.user.first_name.split(' ')[0];
        this.user.fk_role_id = 2;
        this.user.password_user = btoa(this.user.password_user);
        this.authenticationService.createUser(this.user).subscribe(
          (res: any) => {
            if (res['status']) {
              Swal.fire('¡Usuario!', res['message'], 'success');
              this.user = {
                token: '',
                fk_role_id: 0,
                first_name: '',
                second_name: '',
                surname: '',
                second_surname: '',
                email: '',
                password_user: ''
              }
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

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { UserAuth } from 'src/app/interfaces/user-auth';
import { AuthenticationService } from 'src/app/services/authentication.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  user: UserAuth | any = {
    token: '',
    email: '',
    password_user: ''
  }

  constructor(private authenticationService: AuthenticationService, private recaptchaV3Service: ReCaptchaV3Service, private router: Router) { }

  ngOnInit(): void {
  }

  authentication() {
    this.recaptchaV3Service.execute('action').subscribe(
      (token) => {
        this.user.token = token;
        this.user.password_user = btoa(this.user.password_user);
        this.authenticationService.authentication(this.user).subscribe(
          (res: any) => {
            let times = { value: res['token'], timestamp: new Date().getTime() }
            let user = { userName: btoa(res['singend_user']['first_name']), surname: btoa(res['singend_user']['surname']) }
            let role = { role: btoa(res['singend_user']['fk_role_id']) }
            localStorage.setItem('token', JSON.stringify(times));
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('role', JSON.stringify(role));
            this.router.navigate(['/pelicula'])
          },
          (error: any) => {
            if (error['status'] == 404) {
              Swal.fire('!Error!', error['error']['message'], 'error');
              this.user.password_user = '';
            }
          }
        )
      }
    )
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SecurityService } from 'src/app/services/security.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SessionStorageService } from 'ngx-webstorage';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ISession, IUser } from 'src/app/interfaces/entities';
import { ICredentialRequest } from 'src/app/interfaces/request';
import { constants } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  title: string = 'Template';
  loginForm: FormGroup;
  showPassword: boolean = false;
  type: string = 'password';

  constructor(
    private router: Router,
    private securityService: SecurityService,
    private formBuilder: FormBuilder,
    private sessionStorage: SessionStorageService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      user: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    const credential: ICredentialRequest = {
      username: this.loginForm.get('user').value,
      password: this.loginForm.get('password').value,
    }

    this.securityService.login(credential).subscribe({
      next: response => {
        if (response.code === 200) {
          const session: ISession = {
            user: response.data.user,
            token: response.data.token,
          }
          this.sessionStorage.store(constants.SESSION, session);
          this.router.navigate(['dashboard']);

        } else {
          this.snackBar.open(response.message, 'Aceptar', {
            duration: 2000,
          });
        }
      },
      error: error => {
        console.log(error);

      }
    });
  }

  public toggleShowPassword() {
    this.showPassword = !this.showPassword;
    this.type = this.showPassword ? 'text' : 'password';
  }
}

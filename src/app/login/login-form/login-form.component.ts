import { Component, OnInit } from '@angular/core';

import { AuthService } from './../auth.service';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { Router } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {

  constructor(
    public auth: AuthService,
    private erroHandler: ErrorHandlerService,
    private router: Router) { }

  login(usuario: string, senha: string) {
    this.auth.login(usuario, senha)
    .then(() => {
      this.router.navigate(['/solicitacao']);
    })
      .catch(erro => {
        this.erroHandler.handle(erro);
    });
  }

}

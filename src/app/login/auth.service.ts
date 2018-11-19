import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';

import { JwtHelper } from 'angular2-jwt';
import 'rxjs/add/operator/toPromise';

import { environment } from './../../environments/environment';

@Injectable()
export class AuthService {

  oauthTokenUrl: string;

  constructor(
    private http: Http
  ) {
    this.oauthTokenUrl = `${environment.apiUrl}/oauth/token`;
    this.carregarToken();
  }

  login(usuario: string, senha: string): Promise<void> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Authorization', 'Basic Y29kZXJlZjokMmEkMTAkcDlQazBmUU5BUVNlc0k0dnV2S0EwT1phbkREMg==');

    const body = `username=${usuario}&password=${senha}&grant_type=password`;

    return this.http.post(this.oauthTokenUrl, body,
        { headers, withCredentials: true })
      .toPromise()
      .then(response => {
        debugger
        this.armazenarToken(response.json().access_token);
        this.isAccessTokenInvalido();
      })
      .catch(response => {
        if (response.status === 400) {
          const responseJson = response.json();

          if (responseJson.error === 'invalid_grant') {
            return Promise.reject('Usuário ou senha inválida!');
          }
        }

        return Promise.reject(response);
      });
  }

  obterNovoAccessToken(): Promise<void> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Basic Y29kZXJlZjokMmEkMTAkcDlQazBmUU5BUVNlc0k0dnV2S0EwT1phbkREMg==');

    const body = 'grant_type=refresh_token';

    return this.http.post(this.oauthTokenUrl, body,
        { headers, withCredentials: true })
      .toPromise()
      .then(response => {
        this.armazenarToken(response.json().access_token);

        console.log('Novo access token criado!');

        return Promise.resolve(null);
      })
      .catch(response => {
        console.error('Erro ao renovar token.', response);
        return Promise.resolve(null);
      });
  }

  limparAccessToken() {
    localStorage.removeItem('token');
  }

  isAccessTokenInvalido() {
    const token = localStorage.getItem('token');

    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded')
    headers.append('Authorization', 'Basic Y29kZXJlZjokMmEkMTAkcDlQazBmUU5BUVNlc0k0dnV2S0EwT1phbkREMg==');
    const body = `access_token=${token}`;

    this.http.post(`${environment.apiUrl}/user`, body,
        { headers, withCredentials: true })
      .toPromise()
      .then(response => {
        this.armazenarUsuario(JSON.stringify(response.json().principal));
        this.armazenarRole(response.json().principal.authorities);

        return false;
      })
      .catch(response => {
        if (response.error === 'invalid_token') {
          return true;
        }
      });
  }

  temPermissao(permissao: string) {
    const usuario = localStorage.getItem('usuario');
    const objeto = JSON.parse(usuario);
    return objeto != null && objeto.authorities.includes(permissao);
  }

  temQualquerPermissao(roles) {
    for (const role of roles) {
      if (this.temPermissao(role)) {
        return true;
      }
    }

    return false;
  }

  private armazenarToken(token: string) {
    localStorage.setItem('token', token);
  }

  private armazenarUsuario(usuario: string) {
    localStorage.setItem('usuario', usuario);
  }

  private armazenarRole(role: string) {
    localStorage.setItem('role', role);
  }

  private carregarToken() {
    const token = localStorage.getItem('token');

    if (token) {
      this.armazenarToken(token);
    }
  }

}

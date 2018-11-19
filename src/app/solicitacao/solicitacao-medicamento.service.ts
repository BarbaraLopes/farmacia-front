import { Http, Headers, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import { Medicamento, Solicitacao } from '../core/model';
import { environment } from '../../environments/environment';

@Injectable()
export class SolicitacaoMedicamentoService {

  solicitacaosUrl: string;
  token: string;

  constructor(private http: Http) {
    this.solicitacaosUrl = `${environment.apiUrl}/solicitacao`;
    this.token = localStorage.getItem('token');
  }

  salvar(solicitacao: Solicitacao): Promise<Solicitacao> {
    const headers = new Headers();
    headers.append('Authorization', `bearer ${this.token}`);
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.solicitacaosUrl,
      JSON.stringify(solicitacao), { headers })
    .toPromise()
    .then(response => response.json());

  }

  confirmarSolicitacao(solicitacao, lote): Promise<Solicitacao> {
    const headers = new Headers();
    headers.append('Authorization', `bearer ${this.token}`);
    headers.append('Content-Type', 'application/json');
    return this.http.put(`${this.solicitacaosUrl}/confirmar-solicitacao/${lote}`, JSON.stringify(solicitacao), { headers })
      .toPromise()
      .then(response => response.json() as Solicitacao);
  }

  excluirSolicitacao(solicitacao, lote): Promise<Solicitacao> {
    const headers = new Headers();
    headers.append('Authorization', `bearer ${this.token}`);
    headers.append('Content-Type', 'application/json');
    return this.http.put(`${this.solicitacaosUrl}/excluir-solicitacao/${lote}`, JSON.stringify(solicitacao), { headers })
      .toPromise()
      .then(response => response.json() as Solicitacao);
  }
}

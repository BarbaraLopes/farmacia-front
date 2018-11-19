import { Http, Headers, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import { Estoque } from '../core/model';
import { environment } from '../../environments/environment';

export class MedicamentoFiltro {
  descricao: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable()
export class EstoqueService {

  estoqueUrl: string;
  token: string;

  constructor(private http: Http) {
    this.estoqueUrl = `${environment.apiUrl}/estoque`;
    this.token = localStorage.getItem('token');
   }

  atualizarEstoque(estoque, lote): Promise<Estoque> {
    const headers = new Headers();
    headers.append('Authorization', `bearer ${this.token}`);
    headers.append('Content-Type', 'application/json');
    return this.http.put(`${this.estoqueUrl}/acrescentar-ao-estoque/${lote}`, JSON.stringify(estoque), { headers })
      .toPromise()
      .then(response => response.json() as Estoque);
  }

}

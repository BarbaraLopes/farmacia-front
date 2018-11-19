import { Http, Headers, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import { Medicamento } from '../core/model';
import { environment } from '../../environments/environment';

export class MedicamentoFiltro {
  descricao: string;
  status: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable()
export class MedicamentoService {

  medicamentosUrl: string;
  token: string;

  constructor(private http: Http) {
    this.medicamentosUrl = `${environment.apiUrl}/medicamentos`;
    this.token = localStorage.getItem('token');
  }

  pesquisar(filtro: MedicamentoFiltro): Promise<any> {
    const params = new URLSearchParams();
    const headers = new Headers();

    headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    params.set('page', filtro.pagina.toString());
    params.set('size', filtro.itensPorPagina.toString());
    if (filtro.descricao) {
      params.set('descricao', filtro.descricao);
    }
    if (filtro.status) {
      params.set('status', filtro.status);
    }
    return this.http.get(`${this.medicamentosUrl}`,
        { headers, search: params })
      .toPromise()
      .then(response => {
        const responseJson = response.json();
        const medicamentos = responseJson.content;

        const resultado = {
          medicamentos,
          total: responseJson.totalElements
        };

        return resultado;
      });
  }

  filtrarNomes(nome: string): Promise<any> {
    return this.http.get(`${this.medicamentosUrl}/filtrar-nomes/${nome}`)
    .toPromise()
    .then(response => {
      return response.json();
    });
  }

  buscarPeloCodigo(lote: string): Promise<any> {
    return this.http.get(`${this.medicamentosUrl}/${lote}`)
    .toPromise()
    .then(response => {
      return response.json();
    });
  }

  salvar(medicamento: Medicamento): Promise<Medicamento> {
    const headers = new Headers();
    headers.append('Authorization', `bearer ${this.token}`);
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.medicamentosUrl,
      JSON.stringify(medicamento), { headers })
    .toPromise()
    .then(response => response.json());

  }

  atualizar(medicamento: Medicamento): Promise<Medicamento> {
    const headers = new Headers();
    headers.append('Authorization', `bearer ${this.token}`);
    headers.append('Content-Type', 'application/json');
    return this.http.put(`${this.medicamentosUrl}/${medicamento.lote}`,
        JSON.stringify(medicamento), { headers })
      .toPromise()
      .then(response => response.json() as Medicamento);
  }

  atualizarStatus(medicamento: Medicamento): Promise<Medicamento> {
    const headers = new Headers();
    headers.append('Authorization', `bearer ${this.token}`);
    headers.append('Content-Type', 'application/json');
    return this.http.put(`${this.medicamentosUrl}/atualizar-status/${medicamento.lote}`,
        JSON.stringify(medicamento), { headers })
      .toPromise()
      .then(response => response.json() as Medicamento);
  }

  atualizarEstoque(estoque, lote): Promise<Medicamento> {
    const headers = new Headers();
    headers.append('Authorization', `bearer ${this.token}`);
    headers.append('Content-Type', 'application/json');
    return this.http.put(`${this.medicamentosUrl}/acrescentar-ao-estoque/${lote}`, JSON.stringify(estoque), { headers })
      .toPromise()
      .then(response => response.json() as Medicamento);
  }

}

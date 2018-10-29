import { Http, Headers, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import { Estoque } from '../core/model';

export class MedicamentoFiltro {
  descricao: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable()
export class EstoqueService {

  estoqueUrl = 'http://localhost:8080/estoque';

  constructor(private http: Http) { }

  atualizarEstoque(estoque, lote): Promise<Estoque> {
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
    headers.append('Content-Type', 'application/json');
    return this.http.put(`${this.estoqueUrl}/acrescentar-ao-estoque/${lote}`, JSON.stringify(estoque), { headers })
      .toPromise()
      .then(response => response.json() as Estoque);
  }

}

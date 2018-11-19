import { Http, Headers, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import { environment } from '../../environments/environment';

export class MedicamentoFiltro {
  descricao: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable()
export class TipoService {

  tiposUrl;

  constructor(private http: Http) {
    this.tiposUrl = `${environment.apiUrl}/tipos`;
  }

  listarTodos(): Promise<any> {
    return this.http.get(this.tiposUrl)
      .toPromise()
      .then(response => response.json());
  }

}

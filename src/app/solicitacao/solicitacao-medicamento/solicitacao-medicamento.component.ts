import { Status, Medicamento, Solicitacao } from '../../core/model';
import { Component, OnInit } from '@angular/core';

import { LazyLoadEvent } from 'primeng/components/common/api';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ToastyService } from 'ng2-toasty';
import { MedicamentoService, MedicamentoFiltro } from '../../medicamentos/medicamento.service';
import { SolicitacaoMedicamentoService } from '../solicitacao-medicamento.service';
import * as moment from 'moment';
import { ErrorHandlerService } from '../../core/error-handler.service';

@Component({
  selector: 'app-solicitacao-medicamento',
  templateUrl: './solicitacao-medicamento.component.html',
  styleUrls: ['./solicitacao-medicamento.component.css']
})
export class SolicitacaoMedicamentoComponent implements OnInit {

  totalRegistros = 0;
  filtro = new MedicamentoFiltro();
  medicamentos = [];
  medicamento: Medicamento = new Medicamento();
  display: Boolean = false;
  displaySucesso: Boolean = false;
  formulario: FormGroup;
  mensagem = null;

  constructor(private medicamentoService: MedicamentoService,
    private solicitacaoMedicamentoService: SolicitacaoMedicamentoService,
    private formBuilder: FormBuilder,
    private toasty: ToastyService,
    private errorHandler: ErrorHandlerService) { }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      quantidade: [null, Validators.required],
    });
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;
    this.filtro.status = 'Disponível';
    this.medicamentoService.pesquisar(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total;
        this.medicamentos = resultado.medicamentos;
      });
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  abrirModal(medicamento: any) {
    this.medicamento = medicamento;
    this.display = true;
  }

  solicitar() {
    const solicitacao = new Solicitacao();
    solicitacao.medicamento = this.medicamento;
    solicitacao.quantidade = this.medicamento.tipo.descricao !== 'Gotas' ? this.formulario.get('quantidade').value : 1;
    solicitacao.idPessoa = 1;
    this.solicitacaoMedicamentoService.salvar(solicitacao)
      .then(solicitacaoAdicionada => {
        this.mensagem = 'José, o medicamento está disponível para retirada na farmácia universitária até o dia '
          + moment(solicitacaoAdicionada.dataFinal).format('DD/MM/YYYY') + '.\n Não esqueça de levar a receita.';
          this.display = false;
          this.displaySucesso = true;
      }).catch(erro => { this.display = false; this.errorHandler.handle(erro); });
  }

  fecharModal() {
    this.displaySucesso = false;
    this.mensagem = null;
    this.pesquisar();
  }
}

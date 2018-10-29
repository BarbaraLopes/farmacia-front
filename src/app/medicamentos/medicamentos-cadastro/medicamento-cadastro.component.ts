import { MedicamentoService } from '../medicamento.service';
import { Title } from '@angular/platform-browser';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ToastyService } from 'ng2-toasty';
import { TipoService } from '../../tipo/tipo.service';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { EstoqueService } from '../../estoque/estoque.service';
import { Estoque } from '../../core/model';

@Component({
  selector: 'app-medicamento-cadastro',
  templateUrl: './medicamento-cadastro.component.html',
  styleUrls: ['./medicamento-cadastro.component.css']
})
export class MedicamentoCadastroComponent implements OnInit {

  public nomesFiltrados: any[];
  tipos = [];
  formulario: FormGroup;
  desabilitarCampoQtd = true;
  display = false;

  constructor(
    private medicamentoService: MedicamentoService,
    private tipoService: TipoService,
    private formBuilder: FormBuilder,
    private toasty: ToastyService,
    private router: Router,
    private errorHandler: ErrorHandlerService,
  ) { }

  ngOnInit() {
    this.configurarFormulario();
    this.carregarTipos();
  }

  carregarTipos() {
    return this.tipoService.listarTodos()
      .then(tipos => {
        this.tipos = tipos
          .map(c => ({ label: c.descricao, value: c.id }));
      });
  }

  filteredMedicamentoSingle(event) {
    const query = event.query;
    this.medicamentoService.filtrarNomes(query)
      .then(resultado => {
        this.nomesFiltrados = resultado;
      });
  }

  salvar() {
    this.formulario.get('status').value.id = 1;
    this.formulario.get('status').value.descricao = 'Disponível';
    this.formulario.get('estoque').value.quantidade = this.desabilitarCampoQtd ? 1 : this.formulario.get('estoque').value.quantidade;
    this.medicamentoService.salvar(this.formulario.value)
      .then(medicamentoAdicionado => {
        this.toasty.success('Medicamento adicionado com sucesso!');
        this.router.navigate(['/medicamentos']);
      }).catch(erro => this.display = true);
  }

  atualizar() {
    this.medicamentoService.atualizar(this.formulario.value)
      .then(medicamentoAdicionado => {
        this.toasty.success('Medicamento atualizado com sucesso!');
        this.router.navigate(['/medicamentos']);
      }).catch(erro => this.errorHandler.handle(erro));
  }

  atualizarEstoque() {
    const estoque = new Estoque();
    estoque.quantidade = this.formulario.get('estoque').value.quantidade;
    this.medicamentoService.atualizarEstoque(estoque, this.formulario.get('lote').value)
      .then(medicamentoAdicionado => {
        this.toasty.success('Medicamento atualizado com sucesso!');
        this.router.navigate(['/medicamentos']);
      }).catch(erro => this.errorHandler.handle(erro));
  }

  configurarFormulario() {
    this.formulario = this.formBuilder.group({
      principioAtivo: [null, this.validarObrigatoriedade],
      lote: [null, [this.validarObrigatoriedade, this.validarTamanhoMinimo(5)]],
      dosagem: [null, this.validarObrigatoriedade],
      tipo: this.formBuilder.group({
        id: [null, Validators.required],
        descricao: []
      }),
      estoque: this.formBuilder.group({
        id: [],
        quantidade: []
      }),
      dataVencimento: [null, Validators.required],
      outrasEspecificacoes: [],
      nomeComercial: [],
      laboratorio: [],
      status: this.formBuilder.group({
        id: [],
        descricao: []
      }),
    });
  }

  validarObrigatoriedade(input: FormControl) {
    return (input.value ? null : { obrigatoriedade: true });
  }

  validarTamanhoMinimo(valor: number) {
    return (input: FormControl) => {
      return (!input.value || input.value.length >= valor) ? null : { tamanhoMinimo: { tamanho: valor } };
    };
  }

  desabilitarQtd() {
    this.desabilitarCampoQtd = this.formulario.get('tipo').value.id === 1;
  //  this.desabilitarCampoQtd ? this.formulario.controls['estoque'].disable() : this.formulario.controls['estoque'].enable();
  }
}

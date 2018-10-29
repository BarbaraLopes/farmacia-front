import { SolicitacaoMedicamentoService } from './solicitacao-medicamento.service';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CurrencyMaskModule } from 'ng2-currency-mask';
import { DropdownModule } from 'primeng/dropdown';
import { SelectButtonModule } from 'primeng/selectbutton';
import { CalendarModule } from 'primeng/calendar';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TooltipModule } from 'primeng/tooltip';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FileUploadModule } from 'primeng/fileupload';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import {AutoCompleteModule} from 'primeng/autocomplete';
import { DataTableModule } from 'primeng/components/datatable/datatable';
import {DialogModule} from 'primeng/dialog';

import { SharedModule } from '../shared/shared.module';
import { SolicitacaoMedicamentoRoutingModule } from './solicitacao-medicamento-routing.module';
import { SolicitacaoMedicamentoComponent } from './solicitacao-medicamento/solicitacao-medicamento.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    InputTextModule,
    DataTableModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    InputTextareaModule,
    CalendarModule,
    SelectButtonModule,
    DropdownModule,
    CurrencyMaskModule,
    FileUploadModule,
    ProgressSpinnerModule,
    AutoCompleteModule,
    DialogModule,

    SharedModule,
    SolicitacaoMedicamentoRoutingModule
  ],
  providers: [],
  declarations: [
    SolicitacaoMedicamentoComponent
  ],
  exports: []
})
export class SolicitacaoMedicamentoModule { }

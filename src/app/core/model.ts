export class Medicamento {

  public lote: string;

  public principioAtivo: string;

  public dosagem: string;

  public dataVencimento: Date;

  public nomeComercial: string;

  public outrasEspecificacoes: string;

  public tipo: TipoMedicamento = new TipoMedicamento();

  public laboratorio: string;

  public status: Status;

  public obsExclusao: string;

  public usoVeterinario: string;

  public estoque: Estoque;

  public solicitacaoAtual: Solicitacao = new Solicitacao();
}

export class Status {
  id: number;
  descricao: string;
}

export class TipoMedicamento {
  id: number;
  descricao: string;
}

export class Estoque {
  id: number;
  quantidade: number;
}

export class Solicitacao {
  id: number;
  quantidade: number;
  medicamento: Medicamento;
  idPessoa: number;
  dataFinal: Date;
  confirmada: boolean;
  excluida: boolean;
}

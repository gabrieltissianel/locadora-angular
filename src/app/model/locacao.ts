import { Cliente } from "./cliente";

export interface Locacao {
  id?: number,
  dtLocacao?: string,
  dtDevolucaoPrevista?: string,
  dtDevolucaoEfetiva?: string,
  valorCobrado?: number,
  multaCobrada?: number,
  cliente?: Cliente
}

import { Cliente } from "./cliente";
import { Item } from "./item";

export interface Locacao {
  id?: number,
  dtLocacao?: string,
  dtDevolucaoPrevista?: string,
  dtDevolucaoEfetiva?: string,
  valorCobrado?: number,
  multaCobrada?: number,
  item?:Item,
  cliente?: Cliente
}

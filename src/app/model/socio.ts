import { Cliente } from "./cliente";
import { Dependente } from "./dependente";

export interface Socio extends Cliente{
  cpf : string,
  endereco : string,
  tel : string,
}

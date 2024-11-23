import { Ator } from "./ator";
import { Classe } from "./classe";
import { Diretor } from "./diretor";

export interface Titulo {
  id?: number,
  nome: string,
  ano: number,
  sinopse: string,
  categoria: string,
  diretor: Diretor,
  ator: Ator[],
  classe: Classe
}

import { TituloService } from './../../services/titulo.service';
import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { Titulo } from '../../model/titulo';
import { Ator } from '../../model/ator';

@Component({
  selector: 'app-consulta',
  standalone: true,
  imports: [
    MatTableModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule
  ],
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent implements OnInit {

  titulos: Titulo[] = [];
  pesquisa: string = "";
  opcao: number = 0;
  constructor(private tituloService : TituloService) { }

  ngOnInit() {

  }

  gerarNomesAtores(atores: Ator[]){
    return atores.map(p => p.name).join(", ")
  }

  list(){
    this.tituloService.listAll().subscribe({
      next: (res) => {
        this.titulos = res;
      }
    })
  }

  definirParametrosPesquisa() {
    switch (this.opcao) {
      case 0:
        return { nome: this.pesquisa }; // Pesquisa por nome
      case 1:
        return { classe: this.pesquisa }; // Pesquisa por classe
      case 2:
        return { ator: this.pesquisa }; // Pesquisa por ator
      default:
        return {};
    }
  }

  realizarPesquisa() {
    const parametros = this.definirParametrosPesquisa();

    this.tituloService.pesquisar(parametros).subscribe({
      next: (data) => {
        this.titulos = data; // Armazena os resultados retornados
      },
      error: (err) => {
        console.error('Erro ao pesquisar:', err);
      }
    });
  }



}

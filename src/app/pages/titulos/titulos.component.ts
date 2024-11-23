import { DiretorService } from './../../services/diretor.service';
import { Titulo } from './../../model/titulo';
import { Item } from '../../model/item';
import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { TituloService } from '../../services/titulo.service';
import { CommonModule } from '@angular/common';
import { Diretor } from '../../model/diretor';
import { Ator } from '../../model/ator';
import { Classe } from '../../model/classe';
import { ClasseService } from '../../services/classe.service';
import { AtorService } from '../../services/ator.service';

@Component({
  selector: 'app-itens',
  templateUrl: './titulos.component.html',
  standalone: true,
  imports: [
    MatTableModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatSelectModule,
    CommonModule
  ],
  styleUrls: ['./titulos.component.css']
})
export class TitulosComponent implements OnInit {

  nome: string = "";
  ano: number = 0;
  sinopse: string = "";
  categoria: string = "";
  selectedDiretor!: Diretor;
  selectedAtores: Ator[] = [];
  selectedAtor!: Ator;
  selectedClasse!: Classe;

  id_editar:number | null = null;

  diretores!: Diretor[];
  classes!: Classe[];
  atores!: Ator[];

  titulos!: Titulo[];

  constructor(private tituloService: TituloService,
              private diretorService: DiretorService,
              private classeService: ClasseService,
              private atorService: AtorService)
              {}

  ngOnInit(): void{
    this.list();
    this.tituloService.listAll().subscribe({
      next: (res) => {
        this.titulos = res;
      }
    });
    this.diretorService.listAll().subscribe({
      next: (res) => {
        this.diretores = res;
      }
    });
    this.classeService.listAll().subscribe({
      next: (res) => {
        this.classes = res;
      }
    });
    this.atorService.listAll().subscribe({
      next: (res) => {
        this.atores = res;
      }
    });
  }

  list(){
    this.tituloService.listAll().subscribe({
      next: (res) => {
        this.titulos = res;
      }
    })
  }

  addAtor(ator: Ator){
      this.selectedAtores.push(ator);
  }

  removeAtor(atorRemover:Ator){
    const index = this.selectedAtores.findIndex(ator => ator.id === atorRemover.id);

    if (index !== -1) {
      this.selectedAtores.splice(index, 1);
    }
  }

  add(){

    if(this.id_editar == null){

      //const item:Item = {"numSerie": this.numSerie, "titulo": this.titulo!, "tipoItem": this.tipoItem, "dtAquisicao": this.dtAquisicao}

      const titulo: Titulo = {
        "nome": this.nome,
        "ano": this.ano,
        "sinopse": this.sinopse,
        "categoria": this.categoria,
        "diretor": this.selectedDiretor,
        "ator": this.selectedAtores,
        "classe": this.selectedClasse
      };

      this.tituloService.create(titulo).subscribe({
        next:()=>{
          alert("Titulo inserido com sucesso.")
          this.list();
        },
        error:(error)=>{
          alert(error.error)
        }
      })
    }else{
      const titulo_editado : Titulo = {
        "id" : this.id_editar,
        "nome": this.nome,
        "ano": this.ano,
        "sinopse": this.sinopse,
        "categoria": this.categoria,
        "diretor": this.selectedDiretor,
        "ator": this.selectedAtores,
        "classe": this.selectedClasse
      };

      this.tituloService.update(titulo_editado).subscribe({
        next:()=>{
          alert("Titulo editado com sucesso.")
          this.list();
        },
        error:(error)=>{
          alert(error.error)
        }
      })
    }
  }

  remove(id:number){
    this.tituloService.delete(id).subscribe({
      next:(res)=>{
        alert(res)
        this.list();
      },
      error:(error)=>{
        alert(error.error);
      }
    })
  }

  setAdd(){
    this.id_editar = null;
    this.nome = "";
    this.ano = 0;
    this.sinopse = "";
    this.categoria = "";
    this.selectedDiretor;
    this.selectedAtores = [];
    this.selectedClasse;
  }

  setEdit(titulo_editar:Titulo){
    this.id_editar = titulo_editar.id!;
    this.nome = titulo_editar.nome;
    this.ano = titulo_editar.ano;
    this.sinopse = titulo_editar.sinopse;
    this.categoria = titulo_editar.categoria;
    this.selectedDiretor = titulo_editar.diretor;
    this.selectedAtores = titulo_editar.ator;
    this.selectedClasse = titulo_editar.classe;
  }
}

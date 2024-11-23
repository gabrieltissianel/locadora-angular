import { Item } from '../../model/item';
import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ItemService } from '../../services/item.service';
import { MatIconModule } from '@angular/material/icon';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { Titulo } from '../../model/titulo';
import {MatSelectModule} from '@angular/material/select';
import { TituloService } from '../../services/titulo.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-itens',
  templateUrl: './itens.component.html',
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
  styleUrls: ['./itens.component.css']
})
export class ItensComponent implements OnInit {

  numSerie: number = 0;
  selectedTitulo!: Titulo;
  tipoItem: string = "";
  dtAquisicao: string = "";
  id_editar:number | null = null;

  titulos!: Titulo[];

  itens!: Item[];

  constructor(private itemService: ItemService, private tituloService: TituloService) {}

  ngOnInit(): void{
    this.list();
    this.tituloService.listAll().subscribe({
      next: (res) => {
        this.titulos = res;
      }
    });
  }

  list(){
    this.itemService.listAll().subscribe({
      next: (res) => {
        this.itens = res;
      }
    })
  }

  add(){

    if(this.id_editar == null){

      //const item:Item = {"numSerie": this.numSerie, "titulo": this.titulo!, "tipoItem": this.tipoItem, "dtAquisicao": this.dtAquisicao}

      const item: Item = {
        numSerie: this.numSerie,
        titulo: this.selectedTitulo,
        tipoItem: this.tipoItem,
        dtAquisicao: this.dtAquisicao
      };

      this.itemService.create(item).subscribe({
        next:()=>{
          alert("Item inserido com sucesso.")
          this.list();
        },
        error:(error)=>{
          alert(error.error)
        }
      })
    }else{
      const item_editado : Item = {"id" : this.id_editar, "numSerie": this.numSerie, "titulo": this.selectedTitulo!, "tipoItem": this.tipoItem, "dtAquisicao": this.dtAquisicao};
      this.itemService.update(item_editado).subscribe({
        next:()=>{
          alert("Item editado com sucesso.");
          this.list();
        },
        error:(error)=>{
          alert(error.error)
        }
      })
    }
  }

  remove(id:number){
    this.itemService.delete(id).subscribe({
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
    this.tituloService.listAll().subscribe({
      next: (res) => {
        this.titulos = res;
      }
    })
    this.numSerie = 0;
    this.tipoItem = "";
    this.dtAquisicao = "";
    this.id_editar = null;
  }

  setEdit(item_editar:Item){
    this.tituloService.listAll().subscribe({
      next: (res) => {
        this.titulos = res;
      }
    })
    this.selectedTitulo = item_editar.titulo;
    this.tipoItem = "";
    this.dtAquisicao = "";
    this.numSerie = item_editar.numSerie;
    this.id_editar = item_editar.id!;
  }
}

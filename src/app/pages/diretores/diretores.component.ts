import { Diretor } from '../../model/diretor';
import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DiretorService } from '../../services/diretor.service';
import { MatIconModule } from '@angular/material/icon';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

@Component({
  selector: 'app-diretores',
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
  templateUrl: './diretores.component.html',
  styleUrl: './diretores.component.scss'
})
export class DiretoresComponent implements OnInit{
  nome_diretor:string = "";

  id_editar:number | null = null;

  diretores!: Diretor[];

  constructor(private diretorService: DiretorService) {}

  ngOnInit(): void{
    this.list();
  }

  list(){
    this.diretorService.listAll().subscribe({
      next: (res) => {
        this.diretores = res;
      }
    })
  }

  add(){

    if(this.id_editar == null){
      const diretor:Diretor = {name: this.nome_diretor}

      this.diretorService.create(diretor).subscribe({
        next:()=>{
          alert("Diretor inserido com sucesso.")
          this.list();
        },
        error:()=>{
          alert("Erro ao inserir diretor.")
        }
      })
    }else{
      const diretor_editado : Diretor = {"id" : this.id_editar, "name" : this.nome_diretor};
      this.diretorService.update(diretor_editado).subscribe({
        next:()=>{
          alert("Diretor editado com sucesso.");
          this.list();
        },
        error:()=>{
          alert("Erro ao editar diretor.");
        }
      })
    }
  }

  remove(id:number){
    this.diretorService.delete(id).subscribe({
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
    this.nome_diretor = "";
    this.id_editar = null;
  }

  setEdit(diretor_editar:Diretor){
    this.nome_diretor = diretor_editar.name;
    this.id_editar = diretor_editar.id!;
  }
}

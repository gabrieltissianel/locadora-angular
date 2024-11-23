import { Ator } from '../../model/ator';
import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AtorService } from '../../services/ator.service';
import { MatIconModule } from '@angular/material/icon';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

@Component({
  selector: 'app-atores',
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
  templateUrl: './atores.component.html',
  styleUrl: './atores.component.scss'
})
export class AtoresComponent implements OnInit{

  nome_ator:string = "";

  id_editar:number | null = null;

  atores!: Ator[];

  constructor(private atorService: AtorService) {}

  ngOnInit(): void{
    this.list();
  }

  list(){
    this.atorService.listAll().subscribe({
      next: (res) => {
        this.atores = res;
      }
    })
  }

  add(){

    if(this.id_editar == null){
      const ator:Ator = {name: this.nome_ator}

      this.atorService.create(ator).subscribe({
        next:()=>{
          alert("Ator inserido com sucesso.")
          this.list();
        },
        error:(error)=>{
          alert(error.error)
        }
      })
    }else{
      const ator_editado : Ator = {"id" : this.id_editar, "name" : this.nome_ator};
      this.atorService.update(ator_editado).subscribe({
        next:()=>{
          alert("Ator editado com sucesso.");
          this.list();
        },
        error:(error)=>{
          alert(error.error);
        }
      })
    }
  }

  remove(id:number){
    this.atorService.delete(id).subscribe({
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
    this.nome_ator = "";
    this.id_editar = null;
  }

  setEdit(ator_editar:Ator){
    this.nome_ator = ator_editar.name;
    this.id_editar = ator_editar.id!;
  }
}

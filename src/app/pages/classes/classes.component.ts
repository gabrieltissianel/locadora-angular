import { Classe } from '../../model/classe';
import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ClasseService } from '../../services/classe.service';
import { MatIconModule } from '@angular/material/icon';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

@Component({
  selector: 'app-classes',
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
  templateUrl: './classes.component.html',
  styleUrl: './classes.component.scss'
})
export class ClassesComponent implements OnInit{

  nome_classe:string = "";
  value_classe:number = 0;
  prazo_classe:string = "";

  id_editar:number | null = null;

  classes!: Classe[];

  constructor(private classeService: ClasseService) {}

  ngOnInit(): void{
    this.list();
  }

  list(){
    this.classeService.listAll().subscribe({
      next: (res) => {
        this.classes = res;
      }
    })
  }

  add(){

    if(this.id_editar == null){
      console.log("novo")
      const classe:Classe = {name: this.nome_classe,
                             value: this.value_classe,
                             prazoDevolucao: this.prazo_classe};
        console.log(classe);
      this.classeService.create(classe).subscribe({
        next:()=>{
          alert("Classe inserido com sucesso.")
          this.list();
        },
        error:()=>{
          alert("Erro ao inserir classe.")
        }
      })
    }else{
      console.log("editar")

      const classe_editado : Classe = {"id" : this.id_editar, "name" : this.nome_classe, "value" : this.value_classe, "prazoDevolucao" : this.prazo_classe};

      console.log(classe_editado);

      this.classeService.update(classe_editado).subscribe({
        next:()=>{
          alert("Classe editado com sucesso.");
          this.list();
        },
        error:()=>{
          alert("Erro ao editar classe.");
        }
      })
    }
  }

  remove(id:number){
    this.classeService.delete(id).subscribe({
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
    this.nome_classe = "";
    this.value_classe = 0;
    this.prazo_classe = "";
    this.id_editar = null;
  }

  setEdit(classe_editar:Classe){
    this.id_editar = classe_editar.id!;
    console.log(this.id_editar);
    this.nome_classe = classe_editar.name;
    this.value_classe = classe_editar.value;
    this.prazo_classe = classe_editar.prazoDevolucao;
  }
}

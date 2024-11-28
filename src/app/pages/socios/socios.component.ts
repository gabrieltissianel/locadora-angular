import { Dependente } from './../../model/dependente';
import { Socio } from './../../model/socio';
import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SocioService } from '../../services/socio.service';
import { MatIconModule } from '@angular/material/icon';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { DependenteService } from '../../services/dependente.service';


@Component({
  selector: 'app-socios',
  standalone: true,
  imports: [
    MatTableModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
  ],
  templateUrl: './socios.component.html',
  styleUrl: './socios.component.scss'
})
export class SociosComponent implements OnInit{

  nome:string = "";
  dtNascimento:string = "";
  sexo:string = "";
  estahAtivo:boolean = true;
  cpf:string = "";
  endereco:string = "";
  tel:string = "";

  dependentes:Dependente[] = [];

  id_editar:number | null = null;

  socios!: Socio[];

  constructor(private socioService: SocioService, private dependenteService: DependenteService) {}

  ngOnInit(): void{
    this.list();
  }

  list(){
    this.socioService.listAll().subscribe({
      next: (res) => {
        this.socios = res;
        console.log(res);
      }
    })
  }

  add(){

    if(this.id_editar == null)
    {
      const ator:Socio = {
        nome : this.nome,
        dtNascimento : this.dtNascimento,
        sexo : this.sexo,
        estahAtivo : this.estahAtivo,
        cpf : this.cpf,
        endereco : this.endereco,
        tel : this.tel,
      }


      this.socioService.create(ator).subscribe({
        next:()=>{
          alert("Socio inserido com sucesso.")
          this.list();
        },
        error:(error)=>{
          alert(error.error)
        }
      })
    }
    else
    {
      const ator_editado : Socio = {
        id : this.id_editar,
        nome : this.nome,
        dtNascimento : this.dtNascimento,
        sexo : this.sexo,
        estahAtivo : this.estahAtivo,
        cpf : this.cpf,
        endereco : this.endereco,
        tel : this.tel,
      }
      this.socioService.update(ator_editado).subscribe({
        next:()=>{
          alert("Socio editado com sucesso.");
          this.list();
        },
        error:(error)=>{
          console.log(error);
          alert(error.error);
        }
      })
    }
  }

  remove(id:number){
    this.socioService.delete(id).subscribe({
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
    this.cpf = "";
    this.dtNascimento = "";
    this.endereco = "";
    this.nome = "";
    this.sexo = "";
    this.tel = "";
    this.dependentes = [];
  }

  setEdit(socio_editar:Socio){
    this.id_editar = socio_editar.id!;
    this.cpf = socio_editar.cpf;
    this.dtNascimento = socio_editar.dtNascimento;
    this.endereco = socio_editar.endereco;
    this.nome = socio_editar.nome;
    this.sexo = socio_editar.sexo;
    this.tel = socio_editar.tel;
  }

  nome_dependente:string = "";
  dtNascimento_dependente:string = "";
  sexo_dependente:string = "";
  socio_dependente?:Socio;

  criarDependente(){
    const dependente: Dependente = {
      "nome" : this.nome_dependente,
      "dtNascimento" : this.dtNascimento_dependente,
      "sexo" : this.sexo_dependente,
      "estahAtivo" : true,
      "socio": this.socio_dependente
    }

    console.log(dependente);

    this.dependenteService.create(dependente).subscribe({
      next: (res)=>{
        dependente.id = res.id;
        alert("Dependente adicionado com sucesso.");
        this.dependentes.push(dependente);
      },
      error:(error)=>{
        console.log(error);
        alert(error.error)
      }
    })
  }

  addDependente(socio :Socio){
    this.socio_dependente = socio;
    this.setEdit(socio);
    this.dependenteService.listDependentes(socio.id!).subscribe({
      next: (res) => {
        this.dependentes = res;
        console.log(res);
      }
    })
  }

  removeDependente(dependenteRemover: Dependente){
    this.dependenteService.delete(dependenteRemover.id!).subscribe({
      next: ()=>{
        alert("Dependente removido com sucesso.");
        const index = this.dependentes.findIndex(dependente => dependente.id === dependenteRemover.id);

        if (index !== -1) {
          this.dependentes.splice(index, 1);
        }
      },
      error:(error)=>{
        console.log(error);
        alert(error.error)
      }
    })
  }


}

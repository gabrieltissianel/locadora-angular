import { Locacao } from '../../model/locacao';
import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LocacaoService } from '../../services/locacao.service';
import { MatIconModule } from '@angular/material/icon';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { ClienteService } from '../../services/cliente.service';
import { ItemService } from '../../services/item.service';
import { Cliente } from '../../model/cliente';
import { Item } from '../../model/item';
import { CommonModule } from '@angular/common';
import { error } from 'console';

@Component({
  selector: 'app-locacao',
  standalone: true,
  imports: [
    MatTableModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    CommonModule,
  ],
  templateUrl: './locacao.component.html',
  styleUrl: './locacao.component.scss'
})
export class LocacaoComponent implements OnInit{

  selectedCliente!: Cliente | null;
  selectedItem!: Item | null;

  selectedLocacao!: Locacao;

  valor: number = 0;
  dtDevolucao: string = "";
  dtDevolucaoEfetiva: string = "";
  dtLocacao: string = "";

  id_editar:number | null = null;

  numSerie: number = 0;

  locacoes!: Locacao[];

  clientes: Cliente[] = [];
  itens: Item[] = [];

  constructor(private locacaoService: LocacaoService, private clienteService: ClienteService, private itemService: ItemService) {}

  ngOnInit(): void{
    this.list();

    this.clienteService.listAll().subscribe({
      next: (res) => {
        this.clientes = res;
      }
    })

    this.itemService.listAll().subscribe({
      next: (res) => {
        this.itens = res;
      }
    })

  }

  list(){
    this.locacaoService.listAll().subscribe({
      next: (res) => {
        this.locacoes = res;
        console.log(res);
      }
    })
  }

  add(){

    if(this.id_editar == null){
      const locacao:Locacao = {
        "cliente": this.selectedCliente!,
        "item": this.selectedItem!,
        "valorCobrado": this.valor,
        "dtDevolucaoPrevista": this.dtDevolucao,
      }

      this.locacaoService.create(locacao).subscribe({
        next:()=>{
          alert("Locacao inserido com sucesso.")
          this.list();
        },
        error:(error)=>{
          alert(error.error)
        }
      })
    }else{
      const locacao_editado : Locacao = {
        "id": this.id_editar,
        "cliente": this.selectedCliente!,
        "item": this.selectedItem!,
        "valorCobrado": this.valor,
        "dtLocacao": this.dtLocacao,
        "dtDevolucaoPrevista": this.dtDevolucao,
        "dtDevolucaoEfetiva": this.dtDevolucaoEfetiva,
        "multaCobrada": this.multa
      };
      this.locacaoService.update(locacao_editado).subscribe({
        next:()=>{
          alert("Locacao editado com sucesso.");
          this.list();
        },
        error:(error)=>{
          alert(error.error);
        }
      })
    }
  }

  remove(id:number){
    this.locacaoService.delete(id).subscribe({
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
    this.selectedCliente = null;
    this.selectedItem = null;
    this.dtDevolucao = "";
    this.valor = 0;
  }

  setEdit(locacao_editar:Locacao){
    this.id_editar = locacao_editar.id!;
    this.selectedCliente = locacao_editar.cliente!;
    this.selectedItem = locacao_editar.item!;
    this.dtDevolucao = locacao_editar.dtDevolucaoPrevista!;
    this.valor = locacao_editar.valorCobrado!;
    this.dtLocacao = locacao_editar.dtLocacao!;
    this.dtDevolucaoEfetiva = locacao_editar.dtDevolucaoEfetiva!;
    this.multa = locacao_editar.multaCobrada!;
  }

  multa: number = 0;

  devolverItem() {
    this.locacaoService.buscarItem(this.numSerie).subscribe({
      next: (res) => {
        res.multaCobrada = this.multa;
        this.locacaoService.devolverItem(res).subscribe({
          next: (res) => {
            alert("Item " + res.item?.numSerie + " devolvido.");
            this.list();
          },
          error: (error) => {
            alert(error.error)
          }
        })
      },
      error: (error) => {
        alert(error.error)
      }
    })
  }
}

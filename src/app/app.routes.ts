import { Routes } from '@angular/router';
import { AtoresComponent } from './pages/atores/atores.component';
import { ClassesComponent } from './pages/classes/classes.component';
import { DiretoresComponent } from './pages/diretores/diretores.component';
import { LocacaoComponent } from './pages/locacao/locacao.component';
import { ItensComponent } from './pages/itens/itens.component';
import { TitulosComponent } from './pages/titulos/titulos.component';
import { SociosComponent } from './pages/socios/socios.component';


export const routes: Routes = [
  {
    path: '',
    component: LocacaoComponent
  },
  {
    path: 'atores',
    component: AtoresComponent
  },
  {
    path: 'classes',
    component: ClassesComponent
  },
  {
    path: 'diretores',
    component: DiretoresComponent
  },
  {
    path: 'itens',
    component: ItensComponent
  },
  {
    path: 'titulos',
    component: TitulosComponent
  },
  {
    path: 'socios',
    component: SociosComponent
  }
];

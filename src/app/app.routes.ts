/*import { Routes } from '@angular/router';
import { ListarComponent } from './components/listar/listar.component';
import { CrearComponent } from './components/crear/crear.component';
import { EditarComponent } from './components/editar/editar.component';

export const routes: Routes = [
  { path: '', component: ListarComponent },
  { path: 'crear', component: CrearComponent },
  { path: 'editar/:id', component: EditarComponent }
];*/
import { Routes } from '@angular/router';
import { ListarComponent } from './components/listar/listar.component';
import { CrearComponent } from './components/crear/crear.component';
import { EditarComponent } from './components/editar/editar.component';
import { InicioComponent } from './components/inicio/inicio.component'; // Importa el componente

export const routes: Routes = [
  { path: '', component: InicioComponent }, // Página de inicio
  { path: 'listar', component: ListarComponent },
  { path: 'crear', component: CrearComponent },
  { path: 'editar/:id', component: EditarComponent },
  { path: '**', redirectTo: '' }, // Redirige rutas desconocidas a la página de inicio
];


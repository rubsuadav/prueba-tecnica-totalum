import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'pedidos',
    pathMatch: 'full',
  },
  {
    path: 'pedidos',
    loadComponent: () =>
      import('./pages/pedidos/pedidos.component').then(
        (m) => m.PedidosComponent
      ),
  },
  {
    path: 'clientes',
    loadComponent: () =>
      import('./pages/clientes/clientes.component').then(
        (m) => m.ClientesComponent
      ),
  },
  {
    path: 'productos',
    loadComponent: () =>
      import('./pages/productos/productos.component').then(
        (m) => m.ProductosComponent
      ),
  },
];

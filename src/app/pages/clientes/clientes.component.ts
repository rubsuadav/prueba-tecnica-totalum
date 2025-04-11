import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// local imports
import { TotalumApiService } from '../../services/totalum-api.service';

@Component({
  selector: 'app-clientes',
  imports: [CommonModule, FormsModule],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css',
})
export class ClientesComponent implements OnInit {
  protected clientes: any[] = [];
  protected error: string | null = null;

  protected paginaActual: number = 0;
  protected totalPaginas: number = 0;

  protected terminoBusqueda: string = '';

  constructor(private totalumApiService: TotalumApiService) {}

  ngOnInit(): void {
    this.cambiarPagina(0);
  }

  protected async cambiarPagina(pagina: number): Promise<void> {
    try {
      const response = await this.totalumApiService.obtenerClientes(pagina, 5);
      this.clientes = response.data;
      this.error = null;

      this.totalPaginas = Math.ceil(response.metadata.count / 5);
      this.paginaActual = pagina;
    } catch (error: any) {
      this.error = error.toString();
    }
  }

  protected async buscarCliente(): Promise<void> {
    if (!this.terminoBusqueda.trim()) {
      this.cambiarPagina(0);
      return;
    }

    try {
      const response = await this.totalumApiService.buscarCliente(
        this.terminoBusqueda
      );
      this.clientes = response.data;
      this.error = null;
    } catch (error: any) {
      this.error = error.toString();
    }
  }
}

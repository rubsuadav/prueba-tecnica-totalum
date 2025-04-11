import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// local imports
import { TotalumApiService } from '../../services/totalum-api.service';

@Component({
  selector: 'app-productos',
  imports: [CommonModule, FormsModule],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css',
})
export class ProductosComponent {
  protected productos: any[] = [];
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
      const response = await this.totalumApiService.obtenerProductos(pagina, 5);
      this.productos = response.data;
      this.error = null;

      this.totalPaginas = Math.ceil(response.metadata.count / 5);
      this.paginaActual = pagina;
    } catch (error: any) {
      this.error = error.toString();
    }
  }

  protected async buscarProducto(): Promise<void> {
    if (!this.terminoBusqueda.trim()) {
      this.cambiarPagina(0);
      return;
    }

    try {
      const response = await this.totalumApiService.buscarProducto(
        this.terminoBusqueda
      );
      this.productos = response.data;
      this.error = null;
    } catch (error: any) {
      this.error = error.toString();
    }
  }
}

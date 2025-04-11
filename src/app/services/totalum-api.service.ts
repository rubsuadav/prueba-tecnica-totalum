import { Injectable } from '@angular/core';
import { AuthOptions, TotalumApiSdk } from 'totalum-api-sdk';

let totalumSdk: TotalumApiSdk;

@Injectable({
  providedIn: 'root',
})
export class TotalumApiService {
  constructor() {
    const options: AuthOptions = {
      apiKey: {
        'api-key': import.meta.env.NG_APP_TOTALUM_API_KEY,
      },
    };
    totalumSdk = new TotalumApiSdk(options);
  }

  private async obtenerDatosTotalum(
    tabla: string,
    pagina: number,
    limite: number
  ): Promise<any> {
    try {
      const response = await totalumSdk.crud.getItems(tabla, {
        sort: {
          createdAt: 1,
        },
        pagination: {
          page: pagina,
          limit: limite,
        },
        returnCount: true,
      });
      return response.data;
    } catch (error: any) {
      return error;
    }
  }

  // PEDIDOS
  public async obtenerPedidos(pagina: number, limite: number): Promise<any> {
    return this.obtenerDatosTotalum('pedido', pagina, limite);
  }

  public async buscarPedido(numeroPedido: string): Promise<any> {
    try {
      const response = await totalumSdk.crud.getItems('pedido', {
        filter: [
          {
            numero_pedido: {
              regex: numeroPedido,
              options: 'i',
            },
          },
        ],
        sort: {
          createdAt: 1,
        },
      });
      return response.data;
    } catch (error) {
      return error;
    }
  }

  // CLIENTES
  public async obtenerClientes(pagina: number, limite: number): Promise<any> {
    return this.obtenerDatosTotalum('cliente', pagina, limite);
  }

  public async buscarCliente(terminoBusqueda: string): Promise<any> {
    try {
      const response = await totalumSdk.crud.getItems('cliente', {
        filter: [
          {
            or: [
              {
                nombre: {
                  regex: terminoBusqueda,
                  options: 'i',
                },
              },
              {
                email: {
                  regex: terminoBusqueda,
                  options: 'i',
                },
              },
              {
                telefono: {
                  regex: terminoBusqueda,
                  options: 'i',
                },
              },
            ],
          },
        ],
        sort: {
          createdAt: 1,
        },
      });
      return response.data;
    } catch (error) {
      return error;
    }
  }

  // PRODUCTOS
  public async obtenerProductos(pagina: number, limite: number): Promise<any> {
    return this.obtenerDatosTotalum('producto', pagina, limite);
  }

  public async buscarProducto(terminoBusqueda: string): Promise<any> {
    try {
      const response = await totalumSdk.crud.getItems('producto', {
        filter: [
          {
            or: [
              {
                nombre: {
                  regex: terminoBusqueda,
                  options: 'i',
                },
              },
              {
                categoria: {
                  regex: terminoBusqueda,
                  options: 'i',
                },
              },
            ],
          },
        ],
        sort: {
          createdAt: 1,
        },
      });
      return response.data;
    } catch (error) {
      return error;
    }
  }
}

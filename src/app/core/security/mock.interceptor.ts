import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

@Injectable()
export class MockInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    // Si no estamos en modo mock o la petición no es a nuestro backend, dejamos pasar la petición real.
    if (!environment.useMockBackend || (!req.url.includes(environment.URL_BACKEND) && !req.url.includes('/api/'))) {
      return next.handle(req);
    }

    const url = req.url;
    console.log(`[Mock Interceptor] Interceptando llamada a: ${req.method} ${url}`);

    // ==========================================
    // 1. MOCK: LOGIN (/auth/login)
    // ==========================================
    if (url.includes('/auth/login') && req.method === 'POST') {
      return of(new HttpResponse({
        status: 200,
        body: {
          token: 'mock-jwt-token-12345',
          usuarioSistema: req.body?.username || 'admin',
          cargo: 'Administrador'
        }
      })).pipe(delay(1000));
    }

    // ==========================================
    // 2. MOCK: DASHBOARD 
    // ==========================================
    if (url.includes('/dashboard/resumen')) {
      return of(new HttpResponse({ status: 200, body: { 
        ingresosTotales: 15420.50, comprasTotales: 5200.00, gananciaTotal: 10220.50, cantidadVentas: 145 
      }}));
    }
    if (url.includes('/dashboard/ventas-mes')) {
      return of(new HttpResponse({ status: 200, body: [
        { mes: 'Ene', cantidad: 20 }, { mes: 'Feb', cantidad: 45 }, { mes: 'Mar', cantidad: 60 }
      ]}));
    }
    if (url.includes('/dashboard/ganancias-mes')) {
      return of(new HttpResponse({ status: 200, body: [
        { mes: 'Ene', ingresos: 5000, ganancia: 3000 }, { mes: 'Feb', ingresos: 6000, ganancia: 4000 }
      ]}));
    }
    if (url.includes('/dashboard/top-productos')) {
      return of(new HttpResponse({ status: 200, body: [
        { nombreProducto: 'Leche Gloria', cantidadVendida: 120 }, { nombreProducto: 'Arroz Costeño', cantidadVendida: 80 }
      ]}));
    }
    if (url.includes('/dashboard/no-comprar')) {
      return of(new HttpResponse({ status: 200, body: [
        { nombreProducto: 'Cereal Raro', stockActual: 10 }
      ]}));
    }
    if (url.includes('/dashboard/tendencias')) {
      return of(new HttpResponse({ status: 200, body: [
        { nombreProducto: 'Leche Gloria', tendencia: 'Alza' }, { nombreProducto: 'Fideos', tendencia: 'Baja' }
      ]}));
    }
    if (url.includes('/dashboard/stock-bajo')) {
      return of(new HttpResponse({ status: 200, body: [
        { nombreProducto: 'Azúcar Blanca', stockActual: 2, stockMinimo: 10 }
      ]}));
    }

    // ==========================================
    // 3. MOCK: LISTAS AUXILIARES
    // ==========================================
    if (url.includes('/categoriaproductos')) {
      return of(new HttpResponse({ status: 200, body: [
        { idCategoria: 1, nombre: 'Abarrotes' }, { idCategoria: 2, nombre: 'Lácteos' }
      ]}));
    }
    if (url.includes('/estadoproductos')) {
      return of(new HttpResponse({ status: 200, body: [
        { idEstadoProducto: 1, nombre: 'Disponible' }, { idEstadoProducto: 2, nombre: 'Agotado' }
      ]}));
    }
    if (url.includes('/unidadmedidas')) {
      return of(new HttpResponse({ status: 200, body: [
        { idUnidadMedida: 1, nombre: 'Kilogramo' }, { idUnidadMedida: 2, nombre: 'Unidad' }, { idUnidadMedida: 3, nombre: 'Litro' }
      ]}));
    }
    
    // ==========================================
    // 4. MOCK: CLIENTES Y PROVEEDORES
    // ==========================================
    if (url.includes('/clientes')) {
      return of(new HttpResponse({ status: 200, body: [
        { idcliente: 1, nombre: 'Juan', apellido: 'Pérez', codigoCliente: '12345678', estado: 'Activo' },
        { idcliente: 2, nombre: 'María', apellido: 'Gómez', codigoCliente: '87654321', estado: 'Activo' },
        { idcliente: 3, nombre: 'Carlos', apellido: 'López', codigoCliente: '11223344', estado: 'Inactivo' }
      ]}));
    }

    if (url.includes('/proveedores')) {
      return of(new HttpResponse({ status: 200, body: [
        { idProveedor: 1, descripcion: 'Distribuidora del Norte', calificacion: 'Buena' },
        { idProveedor: 2, descripcion: 'Alicorp', calificacion: 'Buena' },
        { idProveedor: 3, descripcion: 'Lácteos Sur', calificacion: 'Mala' }
      ]}));
    }

    // ==========================================
    // 5. MOCK: PRODUCTOS
    // ==========================================
    // MOCK para creación/edición: siempre retornar éxito
    if (url.includes('/productos') && (req.method === 'POST' || req.method === 'PUT')) {
      return of(new HttpResponse({ status: 200, body: req.body })).pipe(delay(800));
    }
    // MOCK para listar productos
    if (url.includes('/productos') && req.method === 'GET') {
      return of(new HttpResponse({ status: 200, body: [
        { 
          idproducto: 1, 
          nombre: 'Leche Evaporada Gloria', 
          categoria: 'Lácteos', 
          unidadMedida: 'Unidad', 
          precioVenta: 4.50, 
          precioCompra: 3.50,
          stockActual: 45, 
          stockMinimo: 10,
          estado: 'Disponible',
          proveedor: 'Alicorp',
          imagen: null
        },
        { 
          idproducto: 2, 
          nombre: 'Arroz Costeño 1kg', 
          categoria: 'Abarrotes', 
          unidadMedida: 'Kilogramo', 
          precioVenta: 5.00, 
          precioCompra: 3.80,
          stockActual: 100, 
          stockMinimo: 20,
          estado: 'Disponible',
          proveedor: 'Distribuidora del Norte',
          imagen: null
        },
        { 
          idproducto: 3, 
          nombre: 'Detergente Ariel', 
          categoria: 'Limpieza', 
          unidadMedida: 'Unidad', 
          precioVenta: 12.00, 
          precioCompra: 9.00,
          stockActual: 0, 
          stockMinimo: 5,
          estado: 'Agotado',
          proveedor: 'Distribuidora del Norte',
          imagen: null
        }
      ]}));
    }

    // ==========================================
    // 6. MOCK: ALMACÉN (DETALLE ENTRADAS)
    // ==========================================
    if (url.includes('/detalle-entradas')) {
      return of(new HttpResponse({ status: 200, body: [
        { idProducto: 1, fechaVencimiento: new Date('2026-12-01') },
        { idProducto: 2, fechaVencimiento: new Date('2027-05-15') }
      ]}));
    }

    // ==========================================
    // 7. MOCK: EGRESOS E INGRESOS (CREAR DOCS)
    // ==========================================
    if ((url.includes('/docsalida') || url.includes('/docentrada')) && req.method === 'POST') {
      return of(new HttpResponse({ status: 200, body: { mensaje: 'Registrado correctamente' }})).pipe(delay(800));
    }

    // Si llega aquí y no hay un mock, devolvemos un 200 genérico vacío para que no falle.
    console.warn(`[Mock Interceptor] No hay datos falsos configurados para: ${req.method} ${url}. Devolviendo 200 OK genérico.`);
    return of(new HttpResponse({ status: 200, body: [] }));
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, map } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { DetalleDevolucion } from '../class/models/detalledevolucion';

@Injectable({
    providedIn: 'root'
})
export class DetalleDevolucionService {

    private baseUrl = environment.URL_BACKEND + '/detalledevoluciones';

    constructor(
        private http: HttpClient
    ) { }

    listar(): Observable<DetalleDevolucion[]> {

        return this.http.get<unknown[]>(this.baseUrl).pipe(

            map(data =>
                data.map(item =>
                    DetalleDevolucion.fromJson(item)
                )
            )

        );

    }

    buscar(id: number): Observable<DetalleDevolucion> {

        return this.http.get<unknown>(
            `${this.baseUrl}/${id}`
        ).pipe(

            map(data =>
                DetalleDevolucion.fromJson(data)
            )

        );

    }

    crear(
        detalleDevolucion: DetalleDevolucion
    ): Observable<DetalleDevolucion> {

        return this.http.post<unknown>(
            this.baseUrl,
            DetalleDevolucion.toJson(detalleDevolucion)
        ).pipe(

            map(data =>
                DetalleDevolucion.fromJson(data)
            )

        );

    }

    actualizar(
        id: number,
        detalleDevolucion: DetalleDevolucion
    ): Observable<DetalleDevolucion> {

        return this.http.put<unknown>(
            `${this.baseUrl}/${id}`,
            DetalleDevolucion.toJson(detalleDevolucion)
        ).pipe(

            map(data =>
                DetalleDevolucion.fromJson(data)
            )

        );

    }

    eliminar(id: number): Observable<void> {

        return this.http.delete<void>(
            `${this.baseUrl}/${id}`
        );

    }

}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, map } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { DetalleUsoInterno } from '../class/models/detalleusointerno';

@Injectable({
    providedIn: 'root'
})
export class DetalleUsoInternoService {

    private baseUrl = environment.URL_BACKEND + '/detalleusointernos';

    constructor(
        private http: HttpClient
    ) { }

    listar(): Observable<DetalleUsoInterno[]> {

        return this.http.get<unknown[]>(this.baseUrl).pipe(

            map(data =>
                data.map(item =>
                    DetalleUsoInterno.fromJson(item)
                )
            )

        );

    }

    buscar(id: number): Observable<DetalleUsoInterno> {

        return this.http.get<unknown>(
            `${this.baseUrl}/${id}`
        ).pipe(

            map(data =>
                DetalleUsoInterno.fromJson(data)
            )

        );

    }

    crear(
        detalleDevolucion: DetalleUsoInterno
    ): Observable<DetalleUsoInterno> {

        return this.http.post<unknown>(
            this.baseUrl,
            DetalleUsoInterno.toJson(detalleDevolucion)
        ).pipe(

            map(data =>
                DetalleUsoInterno.fromJson(data)
            )

        );

    }

    actualizar(
        id: number,
        detalleDevolucion: DetalleUsoInterno
    ): Observable<DetalleUsoInterno> {

        return this.http.put<unknown>(
            `${this.baseUrl}/${id}`,
            DetalleUsoInterno.toJson(detalleDevolucion)
        ).pipe(

            map(data =>
                DetalleUsoInterno.fromJson(data)
            )

        );

    }

    eliminar(id: number): Observable<void> {

        return this.http.delete<void>(
            `${this.baseUrl}/${id}`
        );

    }

}
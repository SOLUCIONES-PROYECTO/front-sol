import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, map } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { DetalleNea } from '../class/models/detallenea';

@Injectable({
    providedIn: 'root'
})
export class DetalleNeaService {

    private baseUrl = environment.URL_BACKEND + '/detalleneas';

    constructor(
        private http: HttpClient
    ) { }

    listar(): Observable<DetalleNea[]> {

        return this.http.get<unknown[]>(this.baseUrl).pipe(

            map(data =>
                data.map(item =>
                    DetalleNea.fromJson(item)
                )
            )

        );

    }

    buscar(id: number): Observable<DetalleNea> {

        return this.http.get<unknown>(
            `${this.baseUrl}/${id}`
        ).pipe(

            map(data =>
                DetalleNea.fromJson(data)
            )

        );

    }

    crear(
        detalleNea: DetalleNea
    ): Observable<DetalleNea> {

        return this.http.post<unknown>(
            this.baseUrl,
            DetalleNea.toJson(detalleNea)
        ).pipe(

            map(data =>
                DetalleNea.fromJson(data)
            )

        );

    }

    actualizar(
        id: number,
        detalleNea: DetalleNea
    ): Observable<DetalleNea> {

        return this.http.put<unknown>(
            `${this.baseUrl}/${id}`,
            DetalleNea.toJson(detalleNea)
        ).pipe(

            map(data =>
                DetalleNea.fromJson(data)
            )

        );

    }

    eliminar(id: number): Observable<void> {

        return this.http.delete<void>(
            `${this.baseUrl}/${id}`
        );

    }

}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, map } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { DetalleMerma } from '../class/models/detallemerma';

@Injectable({providedIn: 'root'})

export class DetalleMermaService {

    private baseUrl = environment.URL_BACKEND + '/detallemermas';

    constructor(
        private http: HttpClient
    ) { }
    listar(): Observable<DetalleMerma[]> {
        return this.http.get<unknown[]>(this.baseUrl).pipe(
            map(data =>
                data.map(item =>
                    DetalleMerma.fromJson(item)
                )
            )
        );
    }

    buscar(id: number): Observable<DetalleMerma> {
        return this.http.get<unknown>(
            `${this.baseUrl}/${id}`
        ).pipe(
            map(data =>
                DetalleMerma.fromJson(data)
            )
        );

    }

    crear(detalleMerma: DetalleMerma): Observable<DetalleMerma> {
        return this.http.post<unknown>(
            this.baseUrl,
            DetalleMerma.toJson(detalleMerma)
        ).pipe(
            map(data =>
                DetalleMerma.fromJson(data)
            )
        );

    }

    actualizar(id: number,detalleMerma: DetalleMerma): Observable<DetalleMerma> {
        return this.http.put<unknown>(
            `${this.baseUrl}/${id}`,
            DetalleMerma.toJson(detalleMerma)
        ).pipe(
            map(data =>
                DetalleMerma.fromJson(data)
            )
        );
    }

    eliminar(id: number): Observable<void> {
        return this.http.delete<void>(
            `${this.baseUrl}/${id}`
        );
    }

}
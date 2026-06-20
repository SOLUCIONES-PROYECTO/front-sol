import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarCounterService {

  ingresosCount = new BehaviorSubject<number>(0);
  egresosCount = new BehaviorSubject<number>(0);
  productosCount = new BehaviorSubject<number>(0);
  proveedoresCount = new BehaviorSubject<number>(0);
  almacenCount = new BehaviorSubject<number>(0);
  ordenesCount = new BehaviorSubject<number>(0);

}
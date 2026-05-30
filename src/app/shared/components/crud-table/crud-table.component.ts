import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-crud-table',
  standalone: false,
  templateUrl: './crud-table.component.html',
  styleUrls: ['./crud-table.component.css'],
})
export class CrudTableComponent {

  @Input() title: string = '';

  @Input() addButtonText: string = 'Agregar';

  @Input() showExportButton: boolean = false;

  @Input() columns: {
    key: string;
    label: string;
    type?: string;
  }[] = [];

  @Input() data: any[] = [];

  @Output() onAdd = new EventEmitter<void>();
}
import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-crud-table',
  standalone: false,
  templateUrl: './crud-table.component.html',
  styleUrls: ['./crud-table.component.css'],
})
export class CrudTableComponent {

  // — Configuración general —
  @Input() title = '';
  @Input() addButtonText = 'Agregar';
  @Input() keyField = 'id';

  // — Datos de la tabla —
  @Input() columns: { key: string; label: string; type?: string }[] = [];
  @Input() data: any[] = [];

  // — Filtros —
  @Input() filters: {
    key: string;
    label: string;
    options: { value: string; label: string }[];
  }[] = [];

  // — Regla de eliminación (ya NO bloquea el checkbox; se valida al eliminar) —
  @Input() canDeleteItem: (item: any) => boolean = () => true;
  @Input() cannotDeleteMessage = 'Algunos de los registros seleccionados no se pueden eliminar.';

  // — Eventos hacia el componente padre —
  @Output() onAdd = new EventEmitter<void>();
  @Output() onEdit = new EventEmitter<any>();
  @Output() onDelete = new EventEmitter<any[]>();
  @Output() searchChange = new EventEmitter<string>();
  @Output() filterChange = new EventEmitter<{ key: string; value: string }>();
  @Output() onView = new EventEmitter<any>();

  // — Estado de selección de filas —
  selectedKeys = new Set<any>();

  get selectedItems(): any[] {
    return this.data.filter(item => this.selectedKeys.has(item[this.keyField]));
  }

  get allSelected(): boolean {
    return this.data.length > 0 &&
      this.data.every(item => this.selectedKeys.has(item[this.keyField]));
  }

  get canEdit(): boolean {
    return this.selectedKeys.size === 1;
  }

  toggleSelectAll(): void {
    if (this.allSelected) {
      this.selectedKeys.clear();
    } else {
      this.data.forEach(item => this.selectedKeys.add(item[this.keyField]));
    }
  }

  toggleSelect(item: any): void {
    const key = item[this.keyField];
    this.selectedKeys.has(key)
      ? this.selectedKeys.delete(key)
      : this.selectedKeys.add(key);
  }

  isSelected(item: any): boolean {
    return this.selectedKeys.has(item[this.keyField]);
  }

  requestEdit(): void {
    if (this.canEdit) {
      this.onEdit.emit(this.selectedItems[0]);
    }
  }

  // — Modal de confirmación / modal de bloqueo —
  showDeleteModal = false;
  showBlockedModal = false;

  get deleteMessage(): string {
    const cantidad = this.selectedKeys.size;
    const sustantivo = cantidad === 1 ? 'registro' : 'registros';
    return `Estás a punto de eliminar ${cantidad} ${sustantivo}. Esta acción no se puede deshacer.`;
  }

  openDeleteModal(): void {
    if (this.selectedKeys.size === 0) return;

    const haySeleccionNoEliminable = this.selectedItems.some(
      item => !this.canDeleteItem(item)
    );

    if (haySeleccionNoEliminable) {
      this.showBlockedModal = true;
    } else {
      this.showDeleteModal = true;
    }
  }

  cancelDelete(): void {
    this.showDeleteModal = false;
  }

  closeBlockedModal(): void {
    this.showBlockedModal = false;
  }

  confirmDelete(): void {
    this.onDelete.emit(this.selectedItems);
    this.selectedKeys.clear();
    this.showDeleteModal = false;
  }

  // Búsqueda
  onSearch(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.searchChange.emit(value);
  }

  //Visualización
  viewItem(item: any): void {
  this.onView.emit(item);
}
}
import { Component, Input, EventEmitter, Output, OnChanges, SimpleChanges } from '@angular/core';
@Component({
  selector: 'app-crud-table',
  standalone: false,
  templateUrl: './crud-table.component.html',
  styleUrls: ['./crud-table.component.css'],
})
export class CrudTableComponent implements OnChanges {

  // — Configuración general —
  @Input() title = '';
  @Input() addButtonText = 'Agregar';
  @Input() keyField = 'id';
  @Input() canAdd = true;

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
  @Input() readOnly = false;

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
    return this.paginatedData.length > 0 &&
      this.paginatedData.every(item => this.selectedKeys.has(item[this.keyField]));
  }

  get canEdit(): boolean {
    return this.selectedKeys.size === 1;
  }

  toggleSelectAll(): void {
    if (this.allSelected) {
      this.paginatedData.forEach(item => this.selectedKeys.delete(item[this.keyField]));
    } else {
      this.paginatedData.forEach(item => this.selectedKeys.add(item[this.keyField]));
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

  // — Paginación —
  pageSize = 15;
  currentPage = 1;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.currentPage = 1; // vuelve a la página 1 cada vez que cambian los datos (búsqueda/filtro)
    }
  }

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.data.length / this.pageSize));
  }

  get paginatedData(): any[] {
    const inicio = (this.currentPage - 1) * this.pageSize;
    return this.data.slice(inicio, inicio + this.pageSize);
  }

  get pageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  get rangoInicio(): number {
    if (this.data.length === 0) return 0;
    return (this.currentPage - 1) * this.pageSize + 1;
  }

  get rangoFin(): number {
    return Math.min(this.currentPage * this.pageSize, this.data.length);
  }

  irAPagina(pagina: number): void {
    if (pagina < 1 || pagina > this.totalPages) return;
    this.currentPage = pagina;
  }

  paginaAnterior(): void {
    this.irAPagina(this.currentPage - 1);
  }

  paginaSiguiente(): void {
    this.irAPagina(this.currentPage + 1);
  }
}
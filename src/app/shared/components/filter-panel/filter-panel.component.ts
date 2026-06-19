import { Component, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Component({
  selector: 'app-filter-panel',
  standalone: false,
  templateUrl: './filter-panel.component.html',
  styleUrl: './filter-panel.component.css'
})
export class FilterPanelComponent {

  @Input() filters: {
    key: string;
    label: string;
    options: { value: string; label: string }[];
  }[] = [];

  @Output() filterChange = new EventEmitter<{ key: string; value: string }>();

  showFilters = false;
  expandedFilter: string | null = null;
  selectedValues: Record<string, string> = {};

  constructor(private elementRef: ElementRef) {}

  get activeFilterCount(): number {
    return Object.values(this.selectedValues).filter(v => !!v).length;
  }

  toggleFilters(): void {
    this.showFilters = !this.showFilters;
  }

  toggleSection(key: string): void {
    this.expandedFilter = this.expandedFilter === key ? null : key;
  }

  onFilter(value: string, key: string): void {
    this.selectedValues[key] = value;
    this.filterChange.emit({ key, value });
  }

  clearFilters(): void {
    Object.keys(this.selectedValues).forEach(key => {
      this.filterChange.emit({ key, value: '' });
    });
    this.selectedValues = {};
  }

  // Cierra el panel si se hace clic fuera del componente
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.showFilters = false;
    }
  }
}
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-alert-modal',
  standalone: false,
  templateUrl: './alert-modal.component.html',
  styleUrl: './alert-modal.component.css'
})
export class AlertModalComponent {

  @Input() visible = false;
  @Input() title = 'Aviso';
  @Input() message = '';
  @Input() type: 'error' | 'success' = 'error';
  @Input() confirmText = 'Aceptar';

  @Output() close = new EventEmitter<void>();

  get icon(): string {
    return this.type === 'success' ? 'check-circle' : 'alert-circle';
  }

  get iconBgClass(): string {
    return this.type === 'success' ? 'bg-green-100' : 'bg-red-100';
  }

  get iconColorClass(): string {
    return this.type === 'success' ? 'text-green-600' : 'text-red-600';
  }

  onClose(): void {
    this.close.emit();
  }
}
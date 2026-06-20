import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal-form',
  standalone: false,
  templateUrl: './modal-form.component.html',
  styleUrl: './modal-form.component.css'
})
export class ModalFormComponent {
  @Input() visible = false;
  @Input() title = '';
  @Input() confirmText = 'Agregar';
  @Input() cancelText = 'Cancelar';
  @Input() confirmDisabled = false;

  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  onConfirm(): void {
    if (!this.confirmDisabled) this.confirm.emit();
  }

  onCancel(): void {
    this.cancel.emit();
  }
}
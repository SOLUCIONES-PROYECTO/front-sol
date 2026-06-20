import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirm-modal',
  standalone: false,
  templateUrl: './confirm-modal.component.html',
  styleUrl: './confirm-modal.component.css'
})
export class ConfirmModalComponent {

  @Input() visible = false;
  @Input() title = '¿Estás seguro?';
  @Input() message = 'Esta acción no se puede deshacer.';
  @Input() confirmText = 'Confirmar';
  @Input() cancelText = 'Cancelar';
  @Input() icon = 'trash';

  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  onConfirm(): void {
    this.confirm.emit();
  }

  onCancel(): void {
    this.cancel.emit();
  }
}
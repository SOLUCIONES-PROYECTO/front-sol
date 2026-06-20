import { Component } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-form-layout',
  standalone: false,
  templateUrl: './form-layout.component.html',
  styleUrl: './form-layout.component.css',
})
export class FormLayoutComponent {
  @Input() title: string = '';
  @Output() onBack = new EventEmitter<void>();
}


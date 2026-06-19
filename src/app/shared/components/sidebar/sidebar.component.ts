import { Component } from '@angular/core';
import { SidebarCounterService } from '../../services/sidebar-counter.service';

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  constructor(
    public sidebarCounter: SidebarCounterService
  ) {}
}

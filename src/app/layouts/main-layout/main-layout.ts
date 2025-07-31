import { Component, effect, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from '../../components/sidebar/sidebar';
import { UtilService } from '../../services/util';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, Sidebar, CommonModule],
  template: `
    <div class="flex h-screen bg-background">
      <!-- Sidebar -->
       @if (toggleSidebar) {
        <div class="w-64 bg-sidebar text-white flex-shrink-0">
          <app-sidebar></app-sidebar>
        </div>
       }
      
      <!-- Main content area -->
      <div class="flex-1 overflow-auto">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styles: []
})
export class MainLayoutComponent {
  utilService = inject(UtilService);
  toggleSidebar: boolean = false;
  deviceType: string = '';
  // Detect changes in device type
  effectiveDeviceType = effect(() => {
    this.deviceType = this.utilService.deviceTypeComputed();
  });

  // Detect changes in sidebar toggle state
  effectiveSidebarToggle = effect(() => {
    this.toggleSidebar = this.utilService.toggleSidebar();
  });
}

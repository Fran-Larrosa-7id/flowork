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
      <div class="sidebar-container" [ngClass]="{'sidebar-open': toggleSidebar, 'sidebar-closed': !toggleSidebar}">
        <app-sidebar></app-sidebar>
      </div>
      
      <!-- Main content area -->
      <div class="main-content">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styles: [`
    .sidebar-container {
      @apply bg-background text-white flex-shrink-0 border-r border-border/20;
      transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
      overflow: hidden;
      box-shadow: 2px 0 10px rgba(0, 0, 0, 0.3);
    }
    
    .sidebar-open {
      transform: translateX(0);
      width: 256px;
      opacity: 1;
    }
    
    .sidebar-closed {
      transform: translateX(-100%);
      width: 0px;
      opacity: 0;
    }
    
    .main-content {
      @apply flex-1 overflow-auto;
      transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
    }
  
    
    /* Backdrop blur effect when sidebar is closing */
    .sidebar-container::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(90deg, transparent 0%, rgba(255, 31, 67, 0.05) 100%);
      pointer-events: none;
      opacity: 0;
      transition: opacity 0.4s ease;
    }
    
    .sidebar-open::before {
      opacity: 1;
    }
  `]
})
export class MainLayoutComponent {
  utilService = inject(UtilService);
  toggleSidebar: boolean = false;
  deviceType: string = '';
  // Detect changes in device type
  effectiveDeviceType = effect(() => {
    this.deviceType = this.utilService.deviceTypeComputed();
    if (this.deviceType === 'mobile-s' || this.deviceType === 'mobile-m' || this.deviceType === 'mobile-l' || this.deviceType === 'mobile-xl') {
      this.utilService.setToggleSidebar(false);
    }
  });

  // Detect changes in sidebar toggle state
  effectiveSidebarToggle = effect(() => {
    this.toggleSidebar = this.utilService.toggleSidebar();
  });
}

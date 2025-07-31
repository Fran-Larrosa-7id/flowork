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
    <div class="flex h-screen bg-background relative">
      <!-- Backdrop overlay for mobile -->
      <div class="backdrop-overlay" 
           [ngClass]="{'backdrop-visible': toggleSidebar && isMobile, 'backdrop-hidden': !toggleSidebar || !isMobile}"
           (click)="closeSidebarOnMobile()">
      </div>
      
      <!-- Sidebar -->
      <div class="sidebar-container" 
           [ngClass]="{
             'sidebar-open': toggleSidebar, 
             'sidebar-closed': !toggleSidebar,
             'sidebar-mobile': isMobile,
             'sidebar-desktop': !isMobile
           }">
        <app-sidebar></app-sidebar>
      </div>
      
      <!-- Main content area -->
      <div class="main-content" [ngClass]="{'main-content-mobile': isMobile, 'main-content-desktop': !isMobile}">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styles: [`
    /* Backdrop overlay for mobile */
    .backdrop-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      z-index: 40;
      transition: opacity 0.3s ease;
      pointer-events: none;
    }
    
    .backdrop-visible {
      opacity: 1;
      pointer-events: all;
    }
    
    .backdrop-hidden {
      opacity: 0;
      pointer-events: none;
    }

    /* Sidebar base styles */
    .sidebar-container {
      @apply bg-background text-white flex-shrink-0 border-r border-border/20;
      transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
      overflow: hidden;
      box-shadow: 2px 0 10px rgba(0, 0, 0, 0.3);
      height: 100vh;
    }
    
    /* Desktop sidebar behavior */
    .sidebar-desktop {
      position: relative;
      z-index: 10;
    }
    
    .sidebar-desktop.sidebar-open {
      transform: translateX(0);
      width: 256px;
      opacity: 1;
    }
    
    .sidebar-desktop.sidebar-closed {
      transform: translateX(-100%);
      width: 0px;
      opacity: 0;
    }
    
    /* Mobile sidebar behavior (overlay) */
    .sidebar-mobile {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 50;
      width: 256px;
    }
    
    .sidebar-mobile.sidebar-open {
      transform: translateX(0);
      opacity: 1;
    }
    
    .sidebar-mobile.sidebar-closed {
      transform: translateX(-100%);
      opacity: 0;
    }
    
    /* Main content styles */
    .main-content {
      @apply overflow-auto;
      transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
      height: 100vh;
    }
    
    /* Desktop main content */
    .main-content-desktop {
      @apply flex-1;
    }
    
    /* Mobile main content (full width) */
    .main-content-mobile {
      width: 100%;
      margin-left: 0;
    }
    
    /* Backdrop blur effect when sidebar is open */
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
  isMobile: boolean = false;

  // Detect changes in device type
  effectiveDeviceType = effect(() => {
    this.deviceType = this.utilService.deviceTypeComputed();
    this.isMobile = this.deviceType === 'mobile-s' || this.deviceType === 'mobile-m' || this.deviceType === 'mobile-l' || this.deviceType === 'mobile-xl';

    if (this.isMobile) {
      this.utilService.setToggleSidebar(false);
    }
  });

  // Detect changes in sidebar toggle state
  effectiveSidebarToggle = effect(() => {
    this.toggleSidebar = this.utilService.toggleSidebar();
  });

  // Close sidebar when clicking on backdrop (mobile only)
  closeSidebarOnMobile() {
    if (this.isMobile) {
      this.utilService.setToggleSidebar(false);
    }
  }
}

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
       @if(this.utilService.deviceTypeComputed() === 'desktop') {
         <app-sidebar></app-sidebar>
       }
      
      <!-- Main content area -->
      <div class="flex-1 ml-64 overflow-auto" [ngClass]="{'ml-0': !utilService.toogleSidebar()}">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styles: [],
  providers: [
    UtilService
  ]
})
export class MainLayoutComponent { 
  utilService = inject(UtilService);
  
  // Detect changes in device type
  effectiveDeviceType = effect(() => {
    console.log('Device type changed:', this.utilService.deviceTypeComputed());
  });

  // Detect changes in sidebar toggle state
  effectiveSidebarToggle = effect(() => {
    console.log('Sidebar toggle state changed:', this.utilService.toogleSidebar());
  });
}

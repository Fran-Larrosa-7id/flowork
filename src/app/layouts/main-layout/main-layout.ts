import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from '../../components/sidebar/sidebar';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, Sidebar],
  template: `
    <div class="flex h-screen bg-background">
      <!-- Sidebar -->
      <app-sidebar></app-sidebar>
      
      <!-- Main content area -->
      <div class="flex-1 ml-64 overflow-auto">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styles: []
})
export class MainLayoutComponent { }

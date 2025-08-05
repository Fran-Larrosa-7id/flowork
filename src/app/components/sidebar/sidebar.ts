import { Component, effect, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MaterialDesignModule } from '../../shared/material-design.module';
import { RolService } from '../../services/rol';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive, MaterialDesignModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss'
})
export class Sidebar {
  role: string = '';
  private _router = inject(Router);
  private _roleService = inject(RolService);

  constructor(){
    this.role = this._roleService.roleUser$();
  }


  logout() {
    localStorage.removeItem('token');
    this._roleService.clearRole(); // Limpiar también el rol
    this._router.navigate(['/login']);
  }

  switchRole() {
    // Implementar lógica para cambiar el rol del usuario
  }
}

import { computed, Injectable, signal } from '@angular/core';

@Injectable(
    {
        providedIn: 'root'
    }
)
export class UtilService {

  deviceTypeSingal = signal<string>('');
  deviceTypeComputed = computed<string>(() => this.deviceTypeSingal());
  toggleSidebar = signal<boolean>(true); // Corregido el typo

  constructor() {
    this.getDeviceType();
    window.addEventListener('resize', this.getDeviceType.bind(this));
  }

  // Método para cambiar el estado del sidebar
  setToggleSidebar(state: boolean) {
    this.toggleSidebar.set(state);
  }

  // Método para alternar el sidebar
  toggleSidebarState() {
    this.toggleSidebar.set(!this.toggleSidebar());
  }

  getDeviceType() {
    const width = window.innerWidth;
    if (width <= 768) {
      if (width <= 320) {
        this.deviceTypeSingal.set('mobile-s');
      } else if (width <= 375) {
        this.deviceTypeSingal.set('mobile-m');
      } else if (width <= 425) {
        this.deviceTypeSingal.set('mobile-l');
      } else if (width <= 768) {
        this.deviceTypeSingal.set('mobile-xl');
      }
    } else if (width < 1024) {
      this.deviceTypeSingal.set('tablet');
    } else {
      this.deviceTypeSingal.set('desktop');
    }
  }
}
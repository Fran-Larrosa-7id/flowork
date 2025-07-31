import { computed, Injectable, signal } from '@angular/core';

@Injectable()
export class UtilService {

  deviceTypeSingal = signal<string>('');
  deviceTypeComputed = computed<string>(() => this.deviceTypeSingal());
  toogleSidebar = signal<boolean>(true);

  constructor() {
    this.getDeviceType();
    window.addEventListener('resize', this.getDeviceType.bind(this));
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
      }
    } else if (width < 1024) {
      this.deviceTypeSingal.set('tablet');
    } else {
      this.deviceTypeSingal.set('desktop');
    }
  }
}
import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, inject } from '@angular/core';
import {  Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SplashService {


  constructor(@Inject(DOCUMENT) private _document: any) {
    this.appInitializer();
  }

  /**
 * Show the splash screen
 */
  show(): void {
    let element = this._document.body.getElementsByClassName('splashScreen')[0];
    element.classList.add('splashShow');
    element.classList.remove('splashHide');
    document.body.classList.add('no-scrollbar');
  }

  /**
   * Hide the splash screen
   */
  hide(): void {
    let element = this._document.body.getElementsByClassName('splashScreen')[0];
    element.classList.add('splashHide');
    element.classList.remove('splashShow');
    document.body.classList.remove('no-scrollbar');
  }

  /**
   * Sirve para mostrar el Splash Screen
   */
  appInitializer() {
    this.show();
    setTimeout(() => {
      this.hide();
    }, 1500);
  }
}

import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const tokenGuard: CanActivateFn = (route, state) => {
  const _router = inject(Router);
  const mockToken = localStorage.getItem('token');
  if(mockToken) {
    // If the mock token exists, allow access
    return true;
  }else{
    // Redirect to login if no token is found
    _router.navigate(['/login']);
    // Return false to prevent access to the route
    return false;
  }
};

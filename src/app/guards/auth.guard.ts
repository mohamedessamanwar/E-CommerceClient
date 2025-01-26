
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../Services/AuthService/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  let service = inject(AuthService);
  let routes = inject(Router);
  let IsAuthenticated = service.IsAuthenticated();
  if (!IsAuthenticated) {
   routes.navigate(['login']);
    return false;
  }
  return true;
};

import { CanActivateFn } from '@angular/router';
import { AuthService } from '../Services/AuthService/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  let service = inject(AuthService);
  let IsAuthenticated = service.IsAuthenticated();
  if (!IsAuthenticated) {
    return false;
  }
  return true;
};

import { AuthenticationService } from './authentication-service';
import { inject } from '@angular/core';
import { CanActivateFn, CanMatchFn, Router } from '@angular/router';

export const anonymousGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthenticationService);
  const router = inject(Router);

  if (!authService.authenticated()) {
    return true;
  } else {
    router.navigate(['/']);
    return false;
  }
};
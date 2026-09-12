import { AuthenticationService } from './authentication-service';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthenticationService);
  const router = inject(Router);

  if (authService.authenticated()) {
    return true;
  } else {
    // Save attempted URL for redirection after login
    router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
};

import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AuthService} from './auth.service';

export const connecteGuard: CanActivateFn = (route, state) => {

  const auth = inject(AuthService)

  if (auth.connecte) {
    return true;
  }

  const router: Router = inject(Router);
  return router.parseUrl('/connexion')

};

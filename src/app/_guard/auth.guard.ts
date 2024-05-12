import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { UserService } from '../_services/user.service';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const toastr = inject(ToastrService);
  return userService.currentUser$.pipe(
    map((user) => {
          console.log(user);
      if (user) {
        return true;
      } else {
        toastr.error("Unauthorize Access")
        return false;
      }
    })
  );
};

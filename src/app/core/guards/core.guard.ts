
import { CanActivateFn } from '@angular/router';

export const coreGuard: CanActivateFn = (route, state) => {
  console.log('Core Guard');


  
  return false;
};

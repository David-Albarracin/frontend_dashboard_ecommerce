import { HttpInterceptorFn } from '@angular/common/http';

export const httpErrorInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};

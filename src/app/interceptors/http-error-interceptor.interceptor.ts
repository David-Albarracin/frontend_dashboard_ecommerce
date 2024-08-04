import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../dialogs/error-dialog/error-dialog.component';
import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../services/auth.service';



export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {

  const dialog = inject(MatDialog);
  const authService = inject(AuthService);

  // Clone the request and add the authorization header
  const authReq = req.clone({
    setHeaders: {
      //Authorization: `Bearer ${authService.authToken}`
      Authorization: 'Basic ' + btoa('pepe:1234')
    }
  });

  // Pass the cloned request with the updated header to the next handler
  return next(authReq).pipe(
    catchError((err: any) => {
      if (err instanceof HttpErrorResponse) {
        // Handle HTTP errors
        if (err.status === 401) {
          // Specific handling for unauthorized errors
          console.log('Unauthorized request:', err);
          // You might trigger a re-authentication flow or redirect the user here
        } else {
          // Handle other HTTP error codes
          console.log('HTTP error:', err);
        }
      } else {
        // Handle non-HTTP errors
        console.log('An error occurred:', err);
      }

      // Show error dialog
      const dialogRef = dialog.open(ErrorDialogComponent, {
        width: '250px',
        data: { message: 'An error occurred: ' + err.message }
      });

      dialogRef.afterClosed().subscribe(() => {
        // Handle after dialog is closed if needed
      });

      // Re-throw the error to propagate it further
      return throwError(() => err); 
    })
  );;
};

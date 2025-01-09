import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Retrieve the auth token from localStorage (or any other secure storage)
  const authToken = localStorage.getItem('token');
  console.log(1);
  let request = req;

  // If the token exists, clone the request and add the Authorization header
  if (authToken) {
    request = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}`  // Adding the Bearer token in headers
      }
    });
  }

  // Pass the (modified or unmodified) request to the next handler
  return next(request);
};

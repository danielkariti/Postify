import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UserService } from "../services/user.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{

  constructor(private userService: UserService){}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = this.userService.getToken();
    const authRequest = req.clone({
      headers: req.headers.set('Authorization',"Bearer " + token)
    });
    return next.handle(authRequest);
  }
}

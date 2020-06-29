import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { environment, SERVER_URL } from '../../environments/environment';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';




@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
      public authenticationService: AuthenticationService,
      private http: HttpClient
        ) {}

    canActivate(): boolean {
      return this.authenticationService.isAuthenticated();
    }

}
import { AuthHttp } from 'angular2-jwt';
import { Injectable } from '@angular/core';

import { environment } from './../../environments/environment';
import { AuthService } from './auth.service';

@Injectable()
export class LogoutService {

  tokensRenokeUrl: string;

}

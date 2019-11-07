import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private storage: Storage,
  ) { }
  isUserLoggedIn() {
    return this.storage.get('userData');
  }
}

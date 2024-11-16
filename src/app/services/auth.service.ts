//auth.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private username: string | null = null;

  setUsername(username: string) {
    this.username = username;
  }

  getUsername() {
    return this.username;
  }
}

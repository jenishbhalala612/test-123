import { Injectable, signal } from '@angular/core';

export interface User {
  name: string;
  mobile: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _user = signal<User | null>(null);
  readonly user = this._user.asReadonly();

  get isLoggedIn(): boolean {
    return this._user() !== null;
  }

  login(user: User): void {
    this._user.set(user);
  }

  logout(): void {
    this._user.set(null);
  }

  deleteAccount(): void {
    this._user.set(null);
  }
}

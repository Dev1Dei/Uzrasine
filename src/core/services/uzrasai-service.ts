import { Injectable } from '@angular/core';
import {Uzrasas} from '../interfaces/uzrasas';

@Injectable({
  providedIn: 'root'
})
export class UzrasaiService {
  private storageKey = 'uzrasai';

  gautiVisus(): Uzrasas[] {
    const saved = localStorage.getItem(this.storageKey);
    return saved ? JSON.parse(saved) : [];
  }

  issaugoti(uzrasai: Uzrasas[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(uzrasai));
  }
}

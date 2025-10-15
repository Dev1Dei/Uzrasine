import { Injectable } from '@angular/core';
import { Database, ref, set, push, remove, update, onValue } from '@angular/fire/database';
import { BehaviorSubject } from 'rxjs';
import { Uzrasas } from '../interfaces/uzrasas';

@Injectable({
  providedIn: 'root'
})
export class UzrasaiService {
  private notesRef;
  private _uzrasai$ = new BehaviorSubject<Uzrasas[]>([]);
  uzrasai$ = this._uzrasai$.asObservable();

  constructor(private db: Database) {
    this.notesRef = ref(this.db, 'uzrasai');

    onValue(this.notesRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const list: Uzrasas[] = Object.keys(data).map((id) => ({
          id,
          ...data[id]
        }));
        this._uzrasai$.next(list);
      } else {
        this._uzrasai$.next([]);
      }
    });
  }

  prideti(pavadinimas: string, tekstas: string) {
    const newRef = push(this.notesRef);
    const naujasUzrasas: Uzrasas = {
      pavadinimas: pavadinimas.trim() || 'Be pavadinimo',
      tekstas: tekstas.trim(),
      expanded: false
    };
    return set(newRef, naujasUzrasas);
  }

  istrinti(id: string) {
    return remove(ref(this.db, `uzrasai/${id}`));
  }

  atnaujinti(id: string, naujiDuomenys: Partial<Uzrasas>) {
    return update(ref(this.db, `uzrasai/${id}`), naujiDuomenys);
  }
}

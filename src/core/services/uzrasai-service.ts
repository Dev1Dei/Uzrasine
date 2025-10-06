import { Injectable } from '@angular/core';
import { Database, ref, set, push, remove, onValue } from '@angular/fire/database';
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

  prideti(uzrasas: Uzrasas) {
    const newRef = push(this.notesRef);
    return set(newRef, uzrasas);
  }

  istrinti(id: string) {
    return remove(ref(this.db, `uzrasai/${id}`));
  }
}

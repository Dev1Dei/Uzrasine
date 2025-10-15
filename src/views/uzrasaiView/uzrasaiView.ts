import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UzrasaiService } from '../../core/services/uzrasai-service';
import { Uzrasas } from '../../core/interfaces/uzrasas';

@Component({
  selector: 'app-uzrasaiView',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './uzrasaiView.html',
  styleUrls: ['./uzrasaiView.css']
})
export class UzrasaiView implements OnInit {
  uzrasai: Uzrasas[] = [];
  adding = false;
  nPavadinimas = '';
  nTekstas = '';
  redaguojamasUzrasas: Uzrasas | null = null;
  isplestiUzrasai= new Set<string>();

  constructor(private uzrasaiService: UzrasaiService) {}

  ngOnInit() {
    this.uzrasaiService.uzrasai$.subscribe(data => {
      this.uzrasai = data;
    });
  }

  prideti() {
    if (this.nPavadinimas.trim() || this.nTekstas.trim()) {
      this.uzrasaiService.prideti(this.nPavadinimas, this.nTekstas);
      this.resetForma();
    }
  }

  istrinti(id: string) {
    this.uzrasaiService.istrinti(id);
  }
  redaguoti(uzrasas: Uzrasas) {
    this.resetForma();
    this.redaguojamasUzrasas = { ...uzrasas };
    this.nPavadinimas = uzrasas.pavadinimas;
    this.nTekstas = uzrasas.tekstas;
    this.isplestiUzrasai.clear();
  }

  pradetiPridejima() {
    this.resetForma();
    this.adding = true;
  }

  issaugotiRedagavima() {
    if (!this.redaguojamasUzrasas?.id) return;
    this.uzrasaiService.atnaujinti(this.redaguojamasUzrasas.id, {
      pavadinimas: this.nPavadinimas,
      tekstas: this.nTekstas
    });
    this.resetForma();
  }
  atsaukti() {
    this.resetForma();
  }

  isExpanded(id: string): boolean {
    return this.isplestiUzrasai.has(id);
  }

  toggleExpanded(id: string): void {
    if (this.isplestiUzrasai.has(id)) {
      this.isplestiUzrasai.delete(id);
    } else {
      this.isplestiUzrasai.add(id);
    }
  }

  private resetForma() {
    this.adding = false;
    this.redaguojamasUzrasas = null;
    this.nPavadinimas = '';
    this.nTekstas = '';
  }
}

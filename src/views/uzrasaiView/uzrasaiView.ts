import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Uzrasas} from '../../core/interfaces/uzrasas';
import {UzrasaiService} from '../../core/services/uzrasai-service';

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

  constructor(private uzrasaiService: UzrasaiService) {}

  ngOnInit() {
    this.uzrasaiService.uzrasai$.subscribe(( data )=> {
      this.uzrasai = data;
    });
  }

  istrinti(id: string) {
    this.uzrasaiService.istrinti(id);
  }

  prideti() {
    if (this.nPavadinimas.trim() || this.nTekstas.trim()) {
      this.uzrasaiService.prideti({
        pavadinimas: this.nPavadinimas,
        tekstas: this.nTekstas,
        expanded: false
      });
    }
    this.atnaujinti();
  }

  atsaukti() {
    this.atnaujinti();
  }

  private atnaujinti() {
    this.adding = false;
    this.nPavadinimas = '';
    this.nTekstas = '';
  }
}

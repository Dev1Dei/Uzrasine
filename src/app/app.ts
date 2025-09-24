import { Component, signal } from '@angular/core';
import {Header} from '../components/header/header';
import {UzrasaiView} from '../views/uzrasaiView/uzrasaiView';

@Component({
  selector: 'app-root',
  imports: [Header, UzrasaiView],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('KeepsUzrasai');
}

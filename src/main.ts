import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { environment } from './environments/environment';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideDatabase, getDatabase } from '@angular/fire/database';

bootstrapApplication(App, {
  providers: [
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideDatabase(() => getDatabase())
  ]
});

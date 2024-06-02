import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { BrowserModule } from "@angular/platform-browser";
import {BrowserAnimationsModule, provideAnimations} from "@angular/platform-browser/animations";

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(), provideFirebaseApp(() => initializeApp({"projectId":"eese-53b10","appId":"1:652234887654:web:c4c5b673b351c326a5c627","storageBucket":"eese-53b10.appspot.com","apiKey":"AIzaSyBOaTAcUXBq7D77p_XkVEgQUVdbCA_inzU","authDomain":"eese-53b10.firebaseapp.com","messagingSenderId":"652234887654"})), provideAuth(() => getAuth()), provideFirestore(() => getFirestore())]
};

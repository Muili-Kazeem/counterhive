import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home/home.component';
import { NotFoundComponent } from './home/not-found/not-found.component';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideFirebaseApp(() => initializeApp({"projectId":"counterhive-b3c54","appId":"1:862663353926:web:5d99b978b194f7d4510c47","storageBucket":"counterhive-b3c54.appspot.com","apiKey":"AIzaSyAUotl5HBiWPiHAro2_o3ozIJ2dxGnsPyE","authDomain":"counterhive-b3c54.firebaseapp.com","messagingSenderId":"862663353926","measurementId":"G-P5EEV119ZP"})),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

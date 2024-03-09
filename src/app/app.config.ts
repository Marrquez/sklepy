import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store/reducers';
import { HttpClientModule } from '@angular/common/http';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { AuthService } from './services/auth.service';
import { EffectsModule, provideEffects } from '@ngrx/effects';
import { ProductEffects } from './store/effects/product.effects';
import { SellsEffects } from './store/effects/sells.effects';
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    AuthService,
    provideRouter(routes), 
    provideClientHydration(),
    importProvidersFrom(
      provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
      provideAuth(() => getAuth()),
      provideFirestore(() => getFirestore()),
      StoreModule.forRoot(reducers),
      EffectsModule.forRoot([ProductEffects, SellsEffects]),
      HttpClientModule,
      StoreDevtoolsModule.instrument(),
      StoreRouterConnectingModule.forRoot({stateKey: 'router'})
    ), provideAnimationsAsync()
  ]
};

import { ApplicationConfig, InjectionToken, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store/reducers';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { AuthService } from './services/auth.service';
import { EffectsModule } from '@ngrx/effects';
import { ProductEffects } from './store/effects/product.effects';
import { SellsEffects } from './store/effects/sells.effects';
import { environment } from '../environments/environment';
import { TransactionsEffects } from './store/effects/transactions.effects';
import { UserEffects } from './store/effects/user.effects';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export const SKLEP_STATUS_DOC = new InjectionToken<string>('SklepStatus');
export const ADMIN_USER = new InjectionToken<string>('AdminID');
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: SKLEP_STATUS_DOC, useValue: '' },
    { provide: ADMIN_USER, useValue: '' },
    AuthService,
    provideRouter(routes), 
    provideClientHydration(),
    importProvidersFrom(
      provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
      provideAuth(() => getAuth()),
      provideFirestore(() => getFirestore()),
      StoreModule.forRoot(reducers),
      EffectsModule.forRoot([ProductEffects, SellsEffects, TransactionsEffects, UserEffects]),
      HttpClientModule,
      TranslateModule.forRoot({
        defaultLanguage: 'en',
        loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
        }
    }),
      StoreDevtoolsModule.instrument(),
      StoreRouterConnectingModule.forRoot({stateKey: 'router'})
    ), provideAnimationsAsync()
  ]
};

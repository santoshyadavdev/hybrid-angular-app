import { NgModule, NgModuleFactoryLoader, SystemJsNgModuleLoader } from '@angular/core';
import { UpgradeModule } from '@angular/upgrade/static';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { UIRouterModule } from '@uirouter/angular';
import { sampleAppModuleAngularJS } from './app.angularjs.module';

import { PrefsModule } from './prefs/prefs.module';
import { UIRouter } from '@uirouter/angularjs';
import { ProductModule } from './product/product.module';
import { CONFIG_TOKEN, CONFIG_VALUE } from './config.token';
import { NavigationComponent } from './navigation/navigation.component';

// Create a "future state" (a placeholder) for the Contacts
// Angular module which will be lazy loaded by UI-Router
export const contactsFutureState = {
  name: 'contacts.**',
  url: '/contacts',
  loadChildren: './contacts/contacts.module#ContactsModule',
};

export function getDialogService($injector) {
  return $injector.get('DialogService');
}

export function getContactsService($injector) {
  return $injector.get('Contacts');
}

// The main NgModule for the Angular portion of the hybrid app
@NgModule({
  imports: [
    BrowserModule,
    // Provide angular upgrade capabilities
    UpgradeModule,
    HttpClientModule,
    // Provides the @uirouter/angular directives and registers
    // the future state for the lazy loaded contacts module
    UIRouterModule.forRoot({ states: [contactsFutureState] }),
    // The preferences feature module
    PrefsModule,
    ProductModule,
  ],
  providers: [
    // Register some AngularJS services as Angular providers
    {
      provide: "DialogService",
      deps: ["$injector"],
      useFactory: getDialogService,
    },
    {
      provide: "Contacts",
      deps: ["$injector"],
      useFactory: getContactsService,
    },
    { provide: CONFIG_TOKEN, 
    useValue: CONFIG_VALUE },
  ],
  declarations: [NavigationComponent],
})
export class AppModule {
  constructor(private upgrade: UpgradeModule) {}

  ngDoBootstrap() {
    this.upgrade.bootstrap(document.body, [sampleAppModuleAngularJS.name], {
      strictDi: true,
    });
  }
}

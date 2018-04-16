import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import fontawesome from '@fortawesome/fontawesome';
import { faSpinner, faUpload } from '@fortawesome/fontawesome-free-solid';

if (environment.production) {
  enableProdMode();
}

fontawesome.library.add(
  faUpload,
  faSpinner
);

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));

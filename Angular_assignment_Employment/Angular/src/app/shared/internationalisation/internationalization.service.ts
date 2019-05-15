import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class InternationalizationService {

  constructor(private translate: TranslateService) {

    translate.setDefaultLang('en');

  }

  switchLanguage(language: string) {

    this.translate.use(language);

  }
}

import { Component } from '@angular/core';
import { isMobile } from './core/utils/main.utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent {
  public mobileDevice = isMobile();
}

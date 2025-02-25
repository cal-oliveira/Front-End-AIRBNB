import { Component } from '@angular/core';

@Component({
  selector: 'app-logo',
  standalone: true,
  template: `<img [src]="logo" alt="Logo" class="w-32 h-auto" />`,
})
export class LogoComponent {
  logo = 'assets/images/logo.png';
}

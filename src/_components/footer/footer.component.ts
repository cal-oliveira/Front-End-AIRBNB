import { Component } from '@angular/core';
import { HorizontalBarComponent } from '../horizontal-bar/horizontal-bar.component';

@Component({
  selector: 'app-footer',
  imports: [HorizontalBarComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {}

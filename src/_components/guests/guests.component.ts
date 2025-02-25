import { Component } from '@angular/core';
import { HorizontalBarComponent } from '../horizontal-bar/horizontal-bar.component';
import { CircleMinus, CirclePlus, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-guests',
  imports: [HorizontalBarComponent, LucideAngularModule],
  templateUrl: './guests.component.html',
  styleUrl: './guests.component.css',
})
export class GuestsComponent {
  readonly CirclePlus = CirclePlus;
  readonly CircleMinus = CircleMinus;

  adultos = 1;
}

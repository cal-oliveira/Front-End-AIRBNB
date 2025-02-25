import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../_components/navbar/navbar.component';
import { AccomodationsComponent } from '../_components/accomodation-card/accomodation-card.component';
import { FooterComponent } from '../_components/footer/footer.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    NavbarComponent,
    AccomodationsComponent,
    FooterComponent,
    BsDatepickerModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'airb';
}

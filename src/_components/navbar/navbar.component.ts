import { Component } from '@angular/core';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { HorizontalBarComponent } from '../horizontal-bar/horizontal-bar.component';
import { LucideAngularModule, User } from 'lucide-angular';
import { CategoriesComponent } from '../categories/categories.component';

@Component({
  selector: 'app-navbar',
  imports: [
    SearchBarComponent,
    HorizontalBarComponent,
    LucideAngularModule,
    CategoriesComponent,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  readonly User = User;
  imagePath = '/assets/images/logo.png';
}

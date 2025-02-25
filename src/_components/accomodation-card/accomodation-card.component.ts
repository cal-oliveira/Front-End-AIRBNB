import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AccomodationService } from '../../app/services/accommodation.service';
import { CategoryService } from '../../app/services/category-service.service'; // Importe o CategoryService

@Component({
  selector: 'app-accomodations',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './accommodation-card.component.html',
  styleUrl: './accommodation-card.component.css',
})
export class AccomodationsComponent implements OnInit {
  accomodations: any[] = [];
  filteredAccomodations: any[] = [];

  constructor(
    private accomodationService: AccomodationService,
    private categoryService: CategoryService // Injete o CategoryService
  ) {}

  ngOnInit() {
    // Carrega todas as acomodações
    this.accomodations = this.accomodationService.getAccomodations();
    this.filteredAccomodations = [...this.accomodations]; // Inicialmente, mostra todas

    // Inscreva-se para receber atualizações da categoria selecionada
    this.categoryService.selectedCategory$.subscribe((category) => {
      this.filterAccomodations(category);
    });
  }

  filterAccomodations(category: string | null) {
    if (category) {
      // Filtra as acomodações pela categoria selecionada
      this.filteredAccomodations = this.accomodations.filter(
        (accomodation) => accomodation.Categoria === category
      );
    } else {
      // Se nenhuma categoria estiver selecionada, mostra todas as acomodações
      this.filteredAccomodations = [...this.accomodations];
    }
  }
}

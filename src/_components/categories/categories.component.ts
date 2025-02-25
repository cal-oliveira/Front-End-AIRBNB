import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CategoryService } from '../../app/services/category-service.service';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent {
  categories = [
    { name: 'Vistas incríveis', src: 'assets/images/places/amazingviews.png' },
    { name: 'Fazendas', src: 'assets/images/places/farm.png' },
    { name: 'Casas de terra', src: 'assets/images/places/earthhomes.png' },
    { name: 'Nas alturas', src: 'assets/images/places/topoftheworld.png' },
    { name: 'Design', src: 'assets/images/places/design.png' },
    { name: 'Pousadas', src: 'assets/images/places/breadandbreakfasts.png' },
    { name: 'Cidades icônicas', src: 'assets/images/places/iconiccities.png' },
    { name: 'Casa na árvore', src: 'assets/images/places/treehouses.png' },
  ];

  selectedCategory: string | null = null;

  constructor(private categoryService: CategoryService) {}

  selectCategory(category: string) {
    this.selectedCategory = category;
    this.categoryService.setSelectedCategory(category);
  }
}

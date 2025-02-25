import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AccomodationService } from '../../app/services/accommodation.service';
import { HorizontalBarComponent } from '../horizontal-bar/horizontal-bar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-filter-by-location',
  standalone: true,
  templateUrl: './filter-by-location.component.html',
  styleUrl: './filter-by-location.component.css',
  imports: [HorizontalBarComponent, CommonModule],
})
export class FilterByLocationComponent implements OnInit {
  cidadesUnicas: string[] = [];
  acomodacoes: any[] = [];
  cidadeSelecionada: string | null = null;
  isOpen: boolean = true; // Controla a visibilidade do componente

  // Evento para enviar a cidade selecionada para o componente pai
  @Output() cidadeSelecionadaEvent = new EventEmitter<string>();

  constructor(private accommodationService: AccomodationService) {}

  ngOnInit(): void {
    this.getCidadesUnicas();
  }

  getCidadesUnicas(): void {
    this.acomodacoes = this.accommodationService.getAccomodations();
    const cidades = this.acomodacoes.map((a) => a.Cidade);
    this.cidadesUnicas = Array.from(new Set(cidades));
  }

  selecionarCidade(cidade: string): void {
    this.cidadeSelecionada = cidade;
    this.cidadeSelecionadaEvent.emit(cidade); // Emite a cidade para o componente pai
    this.fecharView(); // Fecha a view após a seleção
  }

  fecharView(): void {
    this.isOpen = false; // Fecha o componente
  }
}

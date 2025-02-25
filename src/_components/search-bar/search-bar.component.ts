import {
  Component,
  EventEmitter,
  Output,
  ViewChild,
  TemplateRef,
  HostListener,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { VerticalBarComponent } from '../vertical-bar/vertical-bar.component';
import { LucideAngularModule, Search } from 'lucide-angular';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { ViewContainerRef } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { registerLocaleData } from '@angular/common';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { DateAdapter } from '@angular/material/core';
import ptBr from '@angular/common/locales/pt';
import { GuestsComponent } from '../guests/guests.component';
import { FilterByLocationComponent } from '../filter-by-location/filter-by-location.component'; // Importe o novo componente

registerLocaleData(ptBr);

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    VerticalBarComponent,
    LucideAngularModule,
    MatCardModule,
    OverlayModule,
    GuestsComponent,
    FilterByLocationComponent, // Adicione o novo componente aos imports
  ],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css',
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'pt-BR' }],
})
export class SearchBarComponent {
  readonly search = Search;
  destination: string = '';
  selectedCheckIn: Date | null = null;
  selectedCheckOut: Date | null = null;

  overlayRefCheckIn!: OverlayRef | null;
  overlayRefCheckOut!: OverlayRef | null;
  overlayRefGuests!: OverlayRef | null;

  cidadeSelecionada: string | null = null; // Variável para armazenar a cidade selecionada

  // Método para receber a cidade selecionada
  onCidadeSelecionada(cidade: string): void {
    console.log('Cidade selecionada:', cidade); // Para debug
    this.cidadeSelecionada = cidade;
    this.closeFilterByLocationOverlay();
  }
  overlayRefFilterByLocation!: OverlayRef | null; // Referência para o novo overlay

  @ViewChild('calendarOverlayCheckIn')
  calendarOverlayCheckIn!: TemplateRef<any>;
  @ViewChild('calendarOverlayCheckOut')
  calendarOverlayCheckOut!: TemplateRef<any>;
  @ViewChild('guestsOverlay') guestsOverlay!: TemplateRef<any>;
  @ViewChild('filterByLocationOverlay')
  filterByLocationOverlay!: TemplateRef<any>; // Referência para o template do novo overlay

  @Output() searchEvent = new EventEmitter<string>();

  constructor(
    private overlay: Overlay,
    private viewContainerRef: ViewContainerRef,
    private dateAdapter: DateAdapter<any>
  ) {
    this.dateAdapter.setLocale('pt-BR');
  }

  searchDestination() {
    this.searchEvent.emit(this.destination);
  }

  closeAllOverlays() {
    this.closeCalendarCheckIn();
    this.closeCalendarCheckOut();
    this.closeGuestsOverlay();
    this.closeFilterByLocationOverlay(); // Fechar o novo overlay
  }

  toggleCalendarCheckIn(event: MouseEvent) {
    event.stopPropagation();

    if (this.overlayRefCheckIn) {
      this.closeCalendarCheckIn();
      return;
    }

    this.closeAllOverlays();

    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(event.target as HTMLElement)
      .withFlexibleDimensions(false)
      .withDefaultOffsetX(-180);

    this.overlayRefCheckIn = this.overlay.create({ positionStrategy });
    const portal = new TemplatePortal(
      this.calendarOverlayCheckIn,
      this.viewContainerRef
    );
    this.overlayRefCheckIn.attach(portal);
  }

  closeCalendarCheckIn() {
    if (this.overlayRefCheckIn) {
      this.overlayRefCheckIn.dispose();
      this.overlayRefCheckIn = null;
    }
  }

  toggleCalendarCheckOut(event: MouseEvent) {
    event.stopPropagation();

    if (this.overlayRefCheckOut) {
      this.closeCalendarCheckOut();
      return;
    }

    this.closeAllOverlays();

    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(event.target as HTMLElement)
      .withFlexibleDimensions(false)
      .withDefaultOffsetX(-325);

    this.overlayRefCheckOut = this.overlay.create({ positionStrategy });
    const portal = new TemplatePortal(
      this.calendarOverlayCheckOut,
      this.viewContainerRef
    );
    this.overlayRefCheckOut.attach(portal);
  }

  closeCalendarCheckOut() {
    if (this.overlayRefCheckOut) {
      this.overlayRefCheckOut.dispose();
      this.overlayRefCheckOut = null;
    }
  }

  onDateSelected(type: 'check-in' | 'check-out', date: Date) {
    if (type === 'check-in') {
      this.selectedCheckIn = date;
      this.closeCalendarCheckIn();
    } else {
      this.selectedCheckOut = date;
      this.closeCalendarCheckOut();
    }
  }

  openGuestsOverlay(event: MouseEvent) {
    event.stopPropagation();

    if (this.overlayRefGuests) {
      this.closeGuestsOverlay();
      return;
    }

    this.closeAllOverlays();

    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(event.target as HTMLElement)
      .withFlexibleDimensions(false);

    this.overlayRefGuests = this.overlay.create({
      positionStrategy,
      hasBackdrop: false,
    });
    const portal = new TemplatePortal(
      this.guestsOverlay,
      this.viewContainerRef
    );
    this.overlayRefGuests.attach(portal);

    this.overlayRefGuests
      .backdropClick()
      .subscribe(() => this.closeGuestsOverlay());
  }

  closeGuestsOverlay() {
    if (this.overlayRefGuests) {
      this.overlayRefGuests.dispose();
      this.overlayRefGuests = null;
    }
  }

  openFilterByLocationOverlay(event: MouseEvent) {
    event.stopPropagation();

    if (this.overlayRefFilterByLocation) {
      this.closeFilterByLocationOverlay();
      return;
    }

    this.closeAllOverlays();

    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(event.target as HTMLElement)
      .withFlexibleDimensions(false);

    this.overlayRefFilterByLocation = this.overlay.create({
      positionStrategy,
      hasBackdrop: false,
    });
    const portal = new TemplatePortal(
      this.filterByLocationOverlay,
      this.viewContainerRef
    );
    this.overlayRefFilterByLocation.attach(portal);

    this.overlayRefFilterByLocation
      .backdropClick()
      .subscribe(() => this.closeFilterByLocationOverlay());
  }

  closeFilterByLocationOverlay() {
    if (this.overlayRefFilterByLocation) {
      this.overlayRefFilterByLocation.dispose();
      this.overlayRefFilterByLocation = null;
    }
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    if (
      this.overlayRefCheckIn &&
      !this.overlayRefCheckIn.hostElement.contains(event.target as Node)
    ) {
      this.closeCalendarCheckIn();
    }

    if (
      this.overlayRefCheckOut &&
      !this.overlayRefCheckOut.hostElement.contains(event.target as Node)
    ) {
      this.closeCalendarCheckOut();
    }

    if (
      this.overlayRefGuests &&
      !this.overlayRefGuests.hostElement.contains(event.target as Node)
    ) {
      this.closeGuestsOverlay();
    }

    if (
      this.overlayRefFilterByLocation &&
      !this.overlayRefFilterByLocation.hostElement.contains(
        event.target as Node
      )
    ) {
      this.closeFilterByLocationOverlay();
    }
  }
}

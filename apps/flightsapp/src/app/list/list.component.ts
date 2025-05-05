import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Flight } from './flights.interface';

@Component({
  selector: 'app-list',
  imports: [CommonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class ListComponent {

  @Input() workersFlights!: Observable<Flight[]>;
  @Output() activeFlight: EventEmitter<Flight> = new EventEmitter<Flight>();
  selected: Flight | null = null;

  getFlightMoreDetails(flight: Flight) {
    this.selected = flight;
    this.activeFlight.emit(flight);
  }
}

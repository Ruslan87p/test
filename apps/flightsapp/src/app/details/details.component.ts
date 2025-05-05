import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Flight } from '../list/flights.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-detailst',
  imports: [CommonModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailstComponent implements OnInit {
  @Input() activeFlight!: Observable<Flight[]>;
  @Input() activeFlightDetails!: Flight;


  ngOnInit(): void {
    this.activeFlight.subscribe((flights) => {
      this.activeFlightDetails = flights[0];
    });
  }
}

import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Worker } from './workers.interface';
import { catchError, finalize, Observable, throwError } from 'rxjs';
import { Flight } from './../list/flights.interface';
import { ListComponent } from '../list/list.component';
import { DetailstComponent } from '../details/details.component';

@Component({
  selector: 'app-users',
  imports: [CommonModule, ListComponent, DetailstComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class UsersComponent {


  @Input() workers!: Worker[];
  @Input() flights!: Flight[];
  @Input() workersFlights$!: Observable<Flight[]>
  @Output() workerSelection = new EventEmitter<number>();
  selectedWorkerId = 1;
  isLoading = true;
  error?: Error;
  activeFlightDetails!: any;

  selectWorker(workerId: number) {
    this.selectedWorkerId = workerId;
    this.activeFlightDetails = null
    this.workerSelection.emit(workerId);
  }

  activeFlight(activeFlight: Flight) {
    this.activeFlightDetails = activeFlight;
  }

  trackByWorkerId(index: number, worker: Worker): number {
    return worker.id;
  }

}

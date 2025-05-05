import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from '../users/users.component';
import { Flight } from '../list/flights.interface';
import { Worker } from '../users/workers.interface';
import { WorkersService } from '../users/workers.service';
import { BehaviorSubject, catchError, interval, startWith, Subject, switchMap, takeUntil, throwError } from 'rxjs';

@Component({
  selector: 'app-main-layer',
  imports: [CommonModule, UsersComponent],
  templateUrl: './main-layer.component.html',
  styleUrl: './main-layer.component.css',
})
export class MainLayerComponent implements OnInit, OnDestroy {

  constructor(private workersSvc: WorkersService) {}

  workersFlights$: BehaviorSubject<Flight[]> = new BehaviorSubject<Flight[]>([]);
  workers!: Worker[];
  flights: Flight[] = [];
  error?: Error;
  private destroy$ = new Subject<void>();
  private interval = 60000;
  selectedId!: number;
  ngOnInit(): void {
    this.getWorkers();
    // this.getFlights();
  }


  getWorkers(): void {
    this.workersSvc.getWorkers()
    .pipe(
      catchError(error => {
        this.error = error;
        return throwError(() => error);
      }),
      takeUntil(this.destroy$)
    )
    .subscribe(workers => {
      this.workers = workers;
      this.selectedId = workers[0].id;
      this.getFlights();
    });
  }

  getFlights() {
    interval(this.interval)
    .pipe(
      startWith(0),
      switchMap(() => this.workersSvc.getWorkerFly(this.selectedId)),
      catchError(error => {
        this.error = error;
        return throwError(() => error);
      }),
      takeUntil(this.destroy$)
    )
    .subscribe(flights => {
      this.flights = flights;
      //  TODO
      if(this.flights.length > 0) {
        this.flights = flights;
        this.filterFlightsByWorker(this.flights[0].workerId);
      }

    });
  }


  workerSelection(workerId: number) {
    // this.getFlights()
    this.filterFlightsByWorker(workerId);
  }


  filterFlightsByWorker(workerId: number) {
    let filtered: Flight[] = [];
    if(workerId) {
      filtered = this.flights.filter(f => +f.workerId === +workerId);
      this.workersFlights$.next(filtered);
    }
  }



  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}

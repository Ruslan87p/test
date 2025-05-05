import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { Worker } from './workers.interface';
import { Flight } from '../list/flights.interface';

@Injectable({
  providedIn: 'root'
})
export class WorkersService {

  // private apiWorkersUrl = 'http://localhost:8000/workers/';
  // private apiFlightsUrl = 'http://localhost:8000/flights/';

  private apiWorkersUrl = 'http://128.24.65.53:3000/workers/';
  private apiFlightsUrl = 'http://128.24.65.53:3000/flights/';

  constructor(private http: HttpClient) {}

  getWorkers(): Observable<Worker[]> {
    return this.http.get<Worker[]>(this.apiWorkersUrl).pipe(
      catchError((error: Error) => {
        console.error('something wrong happen', error);
        return of([]);
      })
    );
  }


  // getAllWorkersFly(): Observable<any[]> {
  //   return this.http.get<Flight[]>(`${this.apiFlightsUrl}`).pipe(
  //     catchError((error: Error) => {
  //       console.error('something wrong happen', error);
  //       return of([]);
  //     })
  //   );
  // }


  getWorkerFly(workerId: number): Observable<Flight[]> {
    return this.http.get<Flight[]>(`${this.apiFlightsUrl}${workerId}`).pipe(
      catchError((error: Error) => {
        console.error('something wrong happen', error);
        return of([]);
      })
    );
  }
}

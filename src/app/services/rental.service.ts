import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RentalService {
  private apiUrl = 'http://localhost:8000/api/rentals';

  constructor(private http: HttpClient) { }

  getRentals(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  addRental(rental: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, rental);
  }
}

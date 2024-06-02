import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { throwError, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-regist',
  templateUrl: './regist.component.html',
  styleUrls: ['./regist.component.scss']
})
export class RegistComponent {

  firstName: string = "";
  lastName: string = "";
  email: string = "";
  password: string = "";

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    const userData = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password
    };

    this.http.post<any>('http://localhost:8000/user/create', userData)
      .pipe(
        catchError(error => this.handleError(error))
      )
      .subscribe(
        (response) => {
          console.log(response);
          // Átirányítás a Login oldalra
          this.router.navigate(['/login']);
        },
        (error) => {
          console.error(error);
        }
      );
  }

  private handleError(error: any): Observable<any> {
    console.error(error);
    return of(); // Visszaadunk egy üres Observable-t
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}

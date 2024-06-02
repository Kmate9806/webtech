

import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = "";
  password: string = "";

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    const userData = {
      email: this.email,
      password: this.password
    };

    this.http.post<any>('http://localhost:8000/user/login', userData)
      .subscribe(
        (response) => {
          console.log(response);
          if (response.status) {
           
            this.router.navigate(['/vehicle-list']); 
          } else {
           
            console.error('Login failed:', response.message);
          }
        },
        (error) => {
          console.error('Error during login:', error);
        }
      );
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }
}

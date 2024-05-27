import { Component, OnInit } from '@angular/core';
import { RentalService } from './services/rental.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  rentals: any[] = [];

  constructor(private rentalService: RentalService) { }

  ngOnInit() {
    this.loadRentals();
  }

  loadRentals() {
    this.rentalService.getRentals().subscribe(
      data => {
        this.rentals = data;
      },
      error => {
        console.error('Error loading rentals', error);
      }
    );
  }

  addRental(rental: any) {
    this.rentalService.addRental(rental).subscribe(
      newRental => {
        this.rentals.push(newRental);
      },
      error => {
        console.error('Error adding rental', error);
      }
    );
  }
}
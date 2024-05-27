import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryDTO, VehicleDTO } from 'models';
import { ToastrService } from 'ngx-toastr';
import { VehicleService } from '../services/vehicle.service';


@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit {
  vehicles: VehicleDTO[] = [];
  query: string = '';

  constructor(
    private vehicleService: VehicleService,
    private toastrService: ToastrService,
    private router: Router) { }

  ngOnInit(): void {
    this.vehicleService.getAll().subscribe({
      next: (vehicles) => { this.vehicles = vehicles },
      error: (err) => {
        this.toastrService.error('A jármű lista betöltésekor hiba keletkezett.', 'Hiba');
      }
    });
  }

  navigateToVehicleForm(id: number) {
    this.router.navigate([ '/vehicle-form', id ]);
  }

  deleteVehicle(vehicle: VehicleDTO) {
    this.vehicleService.delete(vehicle.id).subscribe({
      next: () => {
        const index = this.vehicles.indexOf(vehicle);
        if (index > -1) {
          this.vehicles.splice(index, 1);
        }
      },
      error: (err) => {
        console.error(err);
        this.toastrService.error('Hiba a jármű törlésekor.', 'Hiba');
      }
    })
  }

  getCategoryList(categories: CategoryDTO[]): string {
    return categories.map((category) => category.title).join(", ");
  }

  async search() {
    this.vehicles = await this.vehicleService.filterVehicles(this.query);
  }
}



import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoryDTO, VehicleDTO, UserDTO } from 'models';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from '../services/category.service';

import { UserService } from '../services/user.service';
import { VehicleService } from '../services/vehicle.service';

@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.css']
})
export class VehicleFormComponent implements OnInit {

  isNewVehicle = true;

  users: UserDTO[] = [];

  categories: CategoryDTO[] = [];

  

  vehicleForm = this.formBuilder.group({
    id: this.formBuilder.control(0),
    brand: this.formBuilder.control(''),
    model: this.formBuilder.control(''),
    chassisNumber: this.formBuilder.control(''),
    odometer: this.formBuilder.control(0),
    basePrice: this.formBuilder.control(0),
    kmCost: this.formBuilder.control(0),
    imgUrl: this.formBuilder.control(''),
    status: this.formBuilder.control(''),
    //expiration: this.formBuilder.control(new Date().toISOString().split('T')[0]),
    uploader: this.formBuilder.control<null | UserDTO>(null),
    categories: this.formBuilder.control<CategoryDTO[]>([])
  });

  constructor(
    private formBuilder: FormBuilder,
    private vehicleService: VehicleService,
    private userService: UserService,
    private categoryService: CategoryService,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];

    if (id) {
      this.isNewVehicle = false;

      this.vehicleService.getOne(id).subscribe({
        next: (vehicle) => this.vehicleForm.setValue(vehicle),
        error: (err) => {
          console.error(err);
          this.toastrService.error('A járműadatok betöltése sikertelen.', 'Hiba');
        }
      });
    }

    this.userService.getAll().subscribe({
      next: (users) => this.users = users,
      error: (err) => {
        console.error(err);
        this.toastrService.error('A felhasználók betöltése sikertelen.', 'Hiba');
      }
    });

    this.categoryService.getAll().subscribe({
      next: (categories) => this.categories = categories,
      error: (err) => {
        console.error(err);
        this.toastrService.error('A kategóriák betöltése sikertelen.', 'Hiba');
      }
    });
  }

  saveVehicle() {
    const vehicle = this.vehicleForm.value as VehicleDTO;

    if (this.isNewVehicle) {
      this.vehicleService.create(vehicle).subscribe({
        next: (vehicle) => {
          this.toastrService.success('Termék sikeresen hozzáadva, id:' + vehicle.id, 'Siker');
        },
        error: (err) => {
          this.toastrService.error('A jármű hozzáadása nem sikerült.', 'Hiba');
        }
      });
    }
    else {
      this.vehicleService.update(vehicle).subscribe({
        next: (vehicle) => {
          this.toastrService.success('Termék sikeresen szerkesztve', 'Siker');
        },
        error: (err) => {
          this.toastrService.error('A jármű szerkesztése nem sikerült.', 'Hiba');
        }
      });
    }
    
  }

  compareObjects(obj1: any, obj2: any) {
    return obj1 && obj2 && obj1.id == obj2.id;
  }
}

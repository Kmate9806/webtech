import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.scss']
})
export class VehicleListComponent {
  VehicleArray: any[] = [];
  currentVehicleID = '';
  brand: string = '';
  model: string = '';
  plate: string = '';
  odometer: string = '';
  basePrice: string = '';
  kmCost: string = '';
  imgUrl: string = '';
  status: string = '';
  showForm: boolean = false; 

  constructor(private http: HttpClient, private router: Router) {
    this.getAllVehicle();
  }

  getAllVehicle() {
    this.http.get("http://localhost:8000/vehicle/getAll")
      .subscribe((resultData: any) => {
        console.log(resultData);
        this.VehicleArray = resultData.data;
      });
  }

  toggleForm() {
    this.showForm = !this.showForm; 
    if (!this.showForm) { 
      this.resetForm();
    }
  }

  navigateToVehicleForm(id: number) {
    this.router.navigate(['/vehicle-form', id]);
  }

  setUpdate(data: any) {
    this.brand = data.brand;
    this.model = data.model;
    this.plate = data.plate;
    this.odometer = data.odometer;
    this.basePrice = data.basePrice;
    this.kmCost = data.kmCost;
    this.imgUrl = data.imgUrl;
    this.status = data.status;
    this.currentVehicleID = data._id;
    this.showForm = true; 
  }

  updateRecords() {
    let bodyData = {
      "brand": this.brand,
      "model": this.model,
      "plate": this.plate,
      "odometer": this.odometer,
      "basePrice": this.basePrice,
      "kmCost": this.kmCost,
      "imgUrl": this.imgUrl,
      "status": this.status
    };

    this.http.patch("http://localhost:8000/vehicle/update" + "/" + this.currentVehicleID, bodyData)
      .subscribe((resultData: any) => {
        console.log(resultData);
        alert("Vehicle Updated");
        this.getAllVehicle();
        this.toggleForm(); 
      });
  }

  setDelete(data: any) {
    this.http.delete("http://localhost:8000/vehicle/delete" + "/" + data._id)
      .subscribe((resultData: any) => {
        console.log(resultData);
        alert("Vehicle Deleted");
        this.getAllVehicle();
      });
  }

  save() {
    if (this.currentVehicleID === '') {
      this.register();
    } else {
      this.updateRecords();
    }
  }

  register() {
    let bodyData = {
      "brand": this.brand,
      "model": this.model,
      "plate": this.plate,
      "odometer": this.odometer,
      "basePrice": this.basePrice,
      "kmCost": this.kmCost,
      "imgUrl": this.imgUrl,
      "status": this.status
    };
    this.http.post("http://localhost:8000/vehicle/create", bodyData)
      .subscribe((resultData: any) => {
        console.log(resultData);
        alert("Vehicle Registered Successfully");
        this.resetForm();
        this.getAllVehicle();
      });
  }

  resetForm() {
    this.brand = '';
    this.model = '';
    this.plate = '';
    this.odometer = '';
    this.basePrice = '';
    this.kmCost = '';
    this.imgUrl = '';
    this.status = '';
    this.currentVehicleID = '';
  }
}

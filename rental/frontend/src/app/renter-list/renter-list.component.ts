
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-renter-list',
  templateUrl: './renter-list.component.html',
  styleUrls: ['./renter-list.component.scss']
})
export class RenterListComponent {
  RenterArray: any[] = [];
  currentRenterID = '';
  firstName: string = '';
  lastName: string = '';
  address: string = '';
  tel: string = '';
  email: string = '';
  showForm: boolean = false; 

  constructor(private http: HttpClient, private router: Router) {
    this.getAllRenter();
  }

  toggleForm() { 
    this.showForm = !this.showForm;
    if (!this.showForm) { 
      this.resetForm();
    }
  }

  getAllRenter() {
    this.http.get("http://localhost:8000/renter/getAll")
      .subscribe((resultData: any) => {
        console.log(resultData);
        this.RenterArray = resultData.data;
      });
  }

  navigateToRenterForm(id: number) {
    this.router.navigate(['/renter-form', id]);
  }

  setUpdate(data: any) {
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.address = data.address;
    this.tel = data.tel;
    this.email = data.email;
    this.currentRenterID = data._id;
    this.showForm = true; 
  }

  updateRecords() {
    let bodyData = {
      "firstName": this.firstName,
      "lastName": this.lastName,
      "address": this.address,
      "tel": this.tel,
      "email": this.email,
    };

    this.http.patch("http://localhost:8000/renter/update" + "/" + this.currentRenterID, bodyData)
      .subscribe((resultData: any) => {
        console.log(resultData);
        alert("Renter Updated");
        this.getAllRenter();
        this.toggleForm(); 
      });
  }

  setDelete(data: any) {
    this.http.delete("http://localhost:8000/renter/delete" + "/" + data._id)
      .subscribe((resultData: any) => {
        console.log(resultData);
        alert("Renter Deleted");
        this.getAllRenter();
      });
  }

  save() {
    console.log("save() method called");
    if (this.currentRenterID === '') {
      this.register();
    } else {
      this.updateRecords();
    }
  }

  register() {
    console.log("register() method called");
    let bodyData = {
      "firstName": this.firstName,
      "lastName": this.lastName,
      "address": this.address,
      "tel": this.tel,
      "email": this.email,
    };
    console.log("Registering new renter with data:", bodyData);
    this.http.post("http://localhost:8000/renter/create", bodyData)
      .subscribe({
        next: (resultData: any) => {
          console.log("Renter registered successfully:", resultData);
          alert("Renter Registered Successfully");
          this.resetForm();
          this.getAllRenter();
        },
        error: (error) => {
          console.error("Error registering renter:", error);
          alert("Error registering renter. Please try again.");
        }
      });
  }

  resetForm() {
    this.firstName = '';
    this.lastName = '';
    this.address = '';
    this.tel = '';
    this.email = '';
    this.currentRenterID = '';
  }
}

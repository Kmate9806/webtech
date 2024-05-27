import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoryDTO, VehicleDTO, UserDTO } from 'models';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from '../services/category.service';

import { UserService } from '../services/user.service';
@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit{

  isNewUser = true;

  userForm = this.formBuilder.group({
    id: this.formBuilder.control(0),
    firstName: this.formBuilder.control(''),
    lastName: this.formBuilder.control(''),
    address: this.formBuilder.control(''),
    tel: this.formBuilder.control(0),
    email: this.formBuilder.control(''),
});


  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private categoryService: CategoryService,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];

    if (id) {
      this.isNewUser = false;

      this.userService.getOne(id).subscribe({
        next: (user) => this.userForm.setValue(user),
        error: (err) => {
          console.error(err);
          this.toastrService.error('A Bérlő betöltése sikertelen.', 'Hiba');
        }
      });
    }
  }

  saveUser() {
    const user = this.userForm.value as UserDTO;

    if (this.isNewUser) {
      this.userService.create(user).subscribe({
        next: (user) => {
          this.toastrService.success('Bérlő sikeresen hozzáadva, id:' + user.id, 'Siker');
        },
        error: (err) => {
          this.toastrService.error('A Bérlő hozzáadása nem sikerült.', 'Hiba');
        }
      });
    }
    else {
      this.userService.update(user).subscribe({
        next: (user) => {
          this.toastrService.success('Bérlő sikeresen szerkesztve', 'Siker');
        },
        error: (err) => {
          this.toastrService.error('A Bérlő szerkesztése nem sikerült.', 'Hiba');
        }
      });
    }
    
  }

  compareObjects(obj1: any, obj2: any) {
    return obj1 && obj2 && obj1.id == obj2.id;
  }
}

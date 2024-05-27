import { Component , OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryDTO, VehicleDTO, UserDTO } from 'models';
import { ToastrService } from 'ngx-toastr';

import { UserService } from '../services/user.service';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: UserDTO[] = [];
  query: string = '';
  constructor(
    private userService: UserService,
    private toastrService: ToastrService,
    private router: Router) { }

  ngOnInit(): void {
    this.userService.getAll().subscribe({
      next: (users) => { this.users = users },
      error: (err) => {
        this.toastrService.error('A felhasználó lista betöltésekor hiba keletkezett.', 'Hiba');
      }
    });
  }

  navigateToUserForm(id: number) {
    this.router.navigate([ '/user-form', id ]);
  }

  deleteUser(user: UserDTO) {
    this.userService.delete(user.id).subscribe({
      next: () => {
        const index = this.users.indexOf(user);
        if (index > -1) {
          this.users.splice(index, 1);
        }
      },
      error: (err) => {
        console.error(err);
        this.toastrService.error('Hiba a jármű törlésekor.', 'Hiba');
      }
    })
  }
  async search() {
    this.users = await this.userService.filterUsers(this.query);
  }

}



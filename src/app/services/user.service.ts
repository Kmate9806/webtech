import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserDTO } from 'models';

@Injectable({
  providedIn: 'root'
})
export class UserService {
 users: UserDTO[] = [];
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<UserDTO[]>('/api/users');
  }

  getOne(id: number) {
    return this.http.get<UserDTO>('/api/users/' + id);
  }

  create(user: UserDTO) {
    return this.http.post<UserDTO>('/api/users', user);
  }

  update(user: UserDTO) {
    return this.http.put<UserDTO>('/api/users', user);
  }

  delete(id: number) {
    return this.http.delete('/api/users/' + id);
  }

  async loadUsersIfEmpty() {
    if (!this.users || this.users.length === 0) {
        const users = await new Promise<UserDTO[]>((resolve, reject) => {
            this.getAll().subscribe({
                next: (users) => {
                    resolve(users);
                },
                error: (err) => {
                    reject(err);
                }
            });
        });

        this.users = users;
    }
}


async filterUsers(query: string) {
  try {
    await this.loadUsersIfEmpty();
    return this.users.filter(user => {
      const searchTerm = query.toLowerCase();
      return (
        (user.firstName && user.firstName.toLowerCase().includes(searchTerm)) ||
        (user.lastName && user.lastName.toLowerCase().includes(searchTerm)) ||
        (user.address && user.address.toString().toLowerCase().includes(searchTerm)) ||
        (user.tel && user.tel.toString().toLowerCase().includes(searchTerm)) ||
        (user.email && user.email.toString().toLowerCase().includes(searchTerm))
      );
    });
  } catch (err) {
    console.error(err);
    return [];
  }
}
}

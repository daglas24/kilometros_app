import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

interface User {
  id?: number;
  name: string;
  email: string;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {
  users: User[] = [];
  newUser: User = { name: '', email: '' };
  editingUser: User | null = null;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe((users) => (this.users = users));
  }

  addUser() {
    this.userService.addUser(this.newUser).subscribe((user) => {
      this.users.push(user);
      this.newUser = { name: '', email: '' };
    });
  }

  editUser(user: User) {
    this.editingUser = { ...user };
  }

  updateUser() {
    if (this.editingUser) {
      this.userService.updateUser(this.editingUser).subscribe(() => {
        this.loadUsers();
        this.editingUser = null;
      });
    }
  }

  deleteUser(id: number =0) {
    this.userService.deleteUser(id).subscribe(() => {
      this.users = this.users.filter((user) => user.id !== id);
    });
  }

  cancelEdit() {
    this.editingUser = null;
  }
}

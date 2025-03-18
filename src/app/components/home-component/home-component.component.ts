import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-home-component',
  standalone: true,
  imports: [NgIf, LoginComponent],
  templateUrl: './home-component.component.html',
  styleUrl: './home-component.component.css'
})
export class HomeComponentComponent {
  showLogin = false;

  toggleLogin() {
    this.showLogin = !this.showLogin;
  }
}

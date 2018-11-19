import { AuthService } from './../../login/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  usuario = '';

  constructor(
    public auth: AuthService) { }

  ngOnInit() {
    this.usuario = localStorage.getItem('usuario');
  }

}

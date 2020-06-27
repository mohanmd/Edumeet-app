import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  constructor(
    private route: Router,
    private authService: AuthenticationService
  ) { }

  ngOnInit() {
  }
  
  logoutUser(){
    this.authService.logout();
  }
}

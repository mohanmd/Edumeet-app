import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { Storage } from '@ionic/storage';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor( 
    private storage: Storage,
    private route: Router,
    private authService: AuthenticationService
    ) { }

  ngOnInit() {
  }

  login(){
    // this.route.navigate(['dashboard']);
    this.authService.login()
  }
}

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { ToastController, Platform } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';

import {  SERVER_URL } from '../../environments/environment';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { AlertController,LoadingController } from '@ionic/angular';



@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  authState = new BehaviorSubject(false);

user ={
  username:'',
  password:''
};

// headers = {
//   'Authorization' : 'Basic YWRtaW46MTIzNA==',
//   'X-API-KEY':'CODEX@123'
// };
//private headers: HttpHeaders = new HttpHeaders({});



  constructor(
    private router: Router,
    private storage: Storage,
    private platform: Platform,
    public toastController: ToastController,
    private http: HttpClient, 
    public alertController: AlertController,
    private loadingController: LoadingController,



  )
  { 
    this.platform.ready().then(() => {
      this.ifLoggedIn();
    });
  }


  ifLoggedIn() {
    this.storage.get('USER_INFO').then((response) => {
      if (response) {
        this.authState.next(false);
      }
    });
  }

  // login() {
  //   var dummy_response = {
  //     user_id: '007',
  //     user_name: 'test'
  //   };
  //   this.storage.set('USER_INFO', dummy_response).then((response) => {
  //     this.router.navigate(['dashboard']);
  //     this.authState.next(true);
  //   });
  // }


   // Http Options
   httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  logout() {
    this.storage.remove('USER_INFO').then(() => {
      this.router.navigate(['login']);
      this.authState.next(false);
    });
  }

  isAuthenticated() {
    return this.authState.value;
  }



  async login()
  {

    if(this.user)
    {
     // alert("1");
    let loading = this.loadingController.create({
      message: 'Please wait...',
      spinner:"circles"
    });
    let headers = new HttpHeaders({
      'Authorization': "Basic " + btoa("admin:1234"),
      'X-API-KEY': 'CODEX@123'
    });
   (await loading).present();
    console.log(SERVER_URL);
   // console.log(this.user);
  
   this.http.post(SERVER_URL+'authentication/login',this.user,{headers: headers}).subscribe((data:any)=> {
   console.log(data.user);
   console.log(data.status);
    if(data.status=="success")
    {
       this.loadingController.dismiss();
       this.storage.set('user',data.user);

       this.router.navigate(['dashboard'])   
    }
    else if(data.status=="failure")
    {
      console.log(this.user);

       this.loadingController.dismiss();
       this.failurealert();
    }
    else{
      this.loadingController.dismiss();
      this.incorrectalert();
    }
   },
   (err) => {
    this.loadingController.dismiss();

    console.log(err); 
  });
  }
    else
    {
      //alert("2");
    }
    
  }
  async failurealert() {
    const alert = await this.alertController.create({
      message: 'Incorret Username And Password',
      buttons: ['OK']
    });
    alert.present();
  
  }
  async incorrectalert() {
    const alert = await this.alertController.create({
      message: 'Username And Password Empty',
      buttons: ['OK']
    });
    alert.present();
  
  }
  


}

import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { User } from 'src/app/models/user';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public modalRef: BsModalRef;
  public messageModal: string;
  public count: number = 0;
  public user: User;
  public response: any;
  private cookieId : string;

  constructor(private modalService: BsModalService, private loginService: LoginService, private router: Router, private cookieService: CookieService) { }

  ngOnInit() {
  }

  
  loginForm = new FormGroup({
    type: new FormControl(''),
    username: new FormControl(''),
    password: new FormControl('')
  });

  onSubmit(template: TemplateRef<any>){
    
    if(this.loginForm.value.username != ''&& this.loginForm.value.password != '' && this.loginForm.value.type != ''){
      this.user = this.loginForm.value;
      //console.log(this.user);
      this.loginService.postLogin(this.user)
      .subscribe(res => {
        this.response = res;
        this.cookieService.set('cookie-id', this.response.cid);
      });
       this.router.navigateByUrl('/timeline');
    } 
    else {

      if(this.loginForm.value.type == '')this.count++;

      if(this.loginForm.value.username == '')this.count++;

      if(this.loginForm.value.password == '')this.count++;
      
      switch (this.count) {
        case 0:
          this.messageModal = "Falta ingresar el campo tipo";
          break;
        case 1:
          if(this.loginForm.value.type == '') this.messageModal = "Falta ingresar el campo tipo";
          else if(this.loginForm.value.username == '') this.messageModal = "Falta ingresar el campo usuario";
          else this.messageModal = "Falta ingresar el campo contraseña";
          break;
        case 2:
          if(this.loginForm.value.type == '')this.messageModal = "Falta ingresar el campo tipo";
          else this.messageModal = "Falta ingresar el campo usuario" ;
          break;
        case 3:
          this.messageModal = "Falta ingresar el campo tipo";
          break;
      }

      this.count = 0;
      this.modalRef = this.modalService.show(template);
    }
  }  

  alert(){
    alert('Recuperar contraseña');
  }

}

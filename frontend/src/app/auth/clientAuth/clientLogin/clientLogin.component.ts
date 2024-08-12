import { NgForm } from '@angular/forms';
import { Component } from '@angular/core';
import { AuthClientUserService } from '../authClientUser.service';
@Component({
  templateUrl: './clientLogin.component.html',
  styleUrls: ['./clientLogin.component.css']
})
export class ClientLoginComponent{

  constructor(public authClientUserService : AuthClientUserService){}

  onClientLogin(form:NgForm){
    if(form.invalid){
      return;
    }
    this.authClientUserService.login(form.value.email,form.value.password);
  }

}

import { NgForm } from '@angular/forms';
import { Component } from '@angular/core';
import { AuthClientUserService } from '../authClientUser.service';
@Component({
  templateUrl: './clientSignup.component.html',
  styleUrls: ['./clientSignup.component.css']
})
export class ClientSignupComponent{

  constructor(public authClientUserService : AuthClientUserService){}

  onClientSignup(form:NgForm){

    if(form.invalid){
      return;
    }
    this.authClientUserService.createClientUser(form.value.name, form.value.contact, form.value.nic, form.value.email, form.value.password);

  }

  onImagePicked(){

  }

}

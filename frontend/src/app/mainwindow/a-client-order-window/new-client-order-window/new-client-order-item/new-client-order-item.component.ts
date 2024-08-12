import { MatSnackBar } from '@angular/material';
import { Subscription } from 'rxjs';
import { ClientOrderServices } from './../../../a-inventory-window/a-shopping-cart-window/ClientOrderServices.service';
import { Component, OnInit } from '@angular/core';
import { EmailInteractionService } from '../email-Interaction.service';

@Component({
  selector: 'app-new-client-order-item',
  templateUrl: './new-client-order-item.component.html',
  styleUrls: ['./new-client-order-item.component.css']
})
export class NewClientOrderItemComponent implements OnInit {



  docOrders: any[] = [];
  isLoading= false;

  docOrderSubs: Subscription;



  constructor(private cliorderService: ClientOrderServices, private emailInteractionService: EmailInteractionService , private sankBar : MatSnackBar){}

  ngOnInit() {
    this.isLoading = true;
    this.cliorderService.getDocOrders();
    this.docOrderSubs = this.cliorderService.getDocOrdersUpdateListener()
      .subscribe((posts) => {
        this.isLoading = false;
        this.docOrders = posts;
      });
  }

  onOrderVerify(name:string,email:string,total:number,pickupDate:string,productId:any[] = [],productName:any[] = [],productPrice:any[] = [],productQuantity:any[] = [],realQuantity:any[] = [],clientId:string,clientContact:string,id:string){

    this.cliorderService.createVerifiedClientOrder(name,email,clientId,total,pickupDate,productId,productName,productPrice,productQuantity,realQuantity,clientContact);


    let user={
      name : name,
      email : email,
      total : total,
      pickupDate : pickupDate,
      productName : productName,
      productPrice : productPrice,
      productQuantity : productQuantity
    }
    console.log(user);

    this.emailInteractionService.sendEmail("http://localhost:3000/api/clientOrder/sendmail", user).subscribe(
      data => {
        let res:any = data;
        console.log(
          `👏 ${user.name} an email has been successfully and the message id is ${res.messageId}`
        );
      },
      err => {
        console.log(err);

      }
    );


    this.cliorderService.deleteItem(id);

    this.sankBar.open("Verification Email Sent!!", 'Close');
  }

  }



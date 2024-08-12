import { MatSnackBar } from '@angular/material';
import { InventoryInteractionService } from './../../../a-inventory-window/inventory-interaction.service';
import { EmailInteractionService } from './../../new-client-order-window/email-Interaction.service';
import { ClientOderServices } from './../../../a-inventory-window/a-shopping-cart-window/ClientOderServices.service';
import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-verified-client-order-item',
  templateUrl: './verified-client-order-item.component.html',
  styleUrls: ['./verified-client-order-item.component.css']
})
export class VerifiedClientOrderItemComponent implements OnInit {

  cliOrders: any[] = [];
  isLoading= false;

  cliOrderSubs: Subscription;



  constructor( private inventoryInteractionService: InventoryInteractionService,
               private cliOrderService: ClientOderServices,
               private emailInteractionService: EmailInteractionService,
               private sankBar: MatSnackBar){}

  ngOnInit() {
    this.isLoading = true;
    this.cliOrderService.getVerifiedDocOders();
    this.cliOrderSubs = this.cliOrderService.getVerifiedDocOdersUpdateListener()
      .subscribe((posts) => {
        this.isLoading = false;
        this.cliOrders = posts;cliOrderproduct
      });
  }


  async onPickup(name:string,email:string,total:number,pickupDate:string,productId:any[] = [],productName:any[] = [],productPrice:any[] = [],productQuantity:any[] = [],realQuantity:any[] = [],clientId:string,clientContact:string,id:string){

    let length = productName.length;
    let quantity= 0;
    console.log(length, realQuantity);


    for (let count = 0 ; count < length; count++) {

      quantity= +realQuantity[count] - +productQuantity[count];
      await this.inventoryInteractionService.updateQuantity(productId[count],quantity);

    console.log(productId[count],productQuantity[count],realQuantity[count],quantity);

   }

    this.cliOrderService.createPickedUpClientOder(name,email,clientId,total,pickupDate,productId,productName,productPrice,productQuantity,clientContact);



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

    this.emailInteractionService.sendEmail("http://localhost:3000/api/verifiedClientOder/sendmail", user).subscribe(
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



    this.sankBar.open("Pickedup Email Sent!!", 'Close');
    this.cliOrderService.deleteVerifiedItem(id);
  }

}

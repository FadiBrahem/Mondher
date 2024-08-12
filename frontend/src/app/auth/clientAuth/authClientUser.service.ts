import { map } from 'rxjs/operators';
//import { AShoppingCartItemsComponent } from './../../mainwindow/a-inventory-window/a-shopping-cart-window/a-shopping-cart-items/a-shopping-cart-items.component';
import { Router } from '@angular/router';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
//import { AuthData } from './auth-data.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthClientData } from './ClientAuth-model';
import { Token } from '@angular/compiler/src/ml_parser/lexer';

@Injectable({providedIn: 'root'})
export class AuthClientUserService {

  isAuthenticated = false;
  private token : string;
  private tokenTimer : any;
  private authStatusListener  = new Subject<boolean>();
  Clients: Array<any> = [];
  private ClientUpdated = new Subject<AuthClientData[]>();
  private currentUserSubject: BehaviorSubject<AuthClientData>;
  public currentUser: Observable<AuthClientData>;
  private name;
  private contact;
  private email;
  private cliId;

  private cliUser= [];
  private cliUserUpdated = new Subject<any>();


  constructor(private http: HttpClient, private router: Router){
    this.currentUserSubject = new BehaviorSubject<AuthClientData>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
  }

  createClientUser(name: string , contact: string , cliId: string ,email: string ,password: string ){
    const authClientData :AuthClientData = {name:name , contact:contact , cliId:cliId , email:email , password:password};
    this.http.post("http://localhost:3000/api/ClientUser/ClientSignup",authClientData)
      .subscribe(response =>{
        console.log(response);
      });

  }


  login(email: string, password){
    const authClientData :AuthClientData = {name: name , contact: null , cliId: null , email: email , password: password};
    this.http.post<{token: string, expiresIn: number, name:string, contact: string, email:string,cliId:string}>("http://localhost:3000/api/ClientUser/ClientLogin",authClientData)
      .subscribe(response =>{
        const token= response.token;
        this.token=token;
        if(token){
          const expiresInDuration = response.expiresIn;
          this.setAuthTimer(expiresInDuration);
          this.isAuthenticated = true;
          this.authStatusListener.next(true);
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
          console.log(expirationDate,email);
          this.saveAuthData(token, expirationDate );
          this.name = response.name;
          this.contact = response.contact;
          this.email = response.email;
          this.cliId = response.cliId;
          console.log(this.name,this.cliId,this.contact,this.email);
          //this.aShoppingCartItemsComponent.onViewUserEmail(email);
          this.router.navigate(['/shoppingcart']);

        }



      });
      return this.http.get<{name: string , contact: string , cliId: string, email: string}>
    ('http://localhost:3000/api/ClientUser/shoppingcart/'+email);

  }


  private setAuthTimer(duration : number){
    console.log("setting timer " + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }


  private saveAuthData(token: string, expirationDate: Date){
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expirationDate.toISOString());
  }


  logout(){
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/ClientLogin']);

  }

  private clearAuthData(){
    localStorage.removeItem("token");
    localStorage.removeItem("expiration")
  }



  getToken(){
    return this.token;
  }

  getIsAuth(){
    return this.isAuthenticated;
  }

  getAuthStatusListener(){
    return this.authStatusListener.asObservable();
  }

  private getAuthData(){
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    if(!token || !expirationDate){
      return;
    }
    return{
      token: token,
      expirationDate : new Date(expirationDate)
    }
  }

  getClients(){
    this.Clients.push([this.name,this.contact,this.email,this.cliId]);
    return(this.Clients);
  }
  // getClients(id: string) {
  //   return this.http.get<{userId:string,role:string}>("http://localhost:3000/api/user/profile/"+id);
  //  }

  getCurrentClient(){
    return this.currentUserSubject.value;
  }

  getClientDatas(id: string){
    return this.http.get<{_id: string , name: string, email: string, cliId: string ,contact: string, password: string}>
    ('http://localhost:3000/api/ClientUser/' +id);
  }

  getClientData() {
    this.http.get<{message: string, Clients: any}>('http://localhost:3000/api/ClientUser/getClientUserData')
    .pipe(map(cliData => {
     return cliData.Clients.map(cli=>{
       return{

        name: cli.name,
        contact: cli.contact,
        cliId: cli.cliId,
        email: cli.email,
        password: cli.password,
        id: cli._id

       }
     })
    }))
    .subscribe((transformedSuppliers)=>{
      this.cliUser = transformedSuppliers;
      this.cliUserUpdated.next([...this.cliUser])
    });

  }

  getClientUpdateListener() {
    return this.cliUserUpdated.asObservable();
  }

  updateClient(id: string ,  name: string, email: string, cliId: string, contact: string, password: string){
    const Client  ={id:id , name:name , email:email , cliId : cliId , contact:contact , password:password};
    this.http
             .put('http://localhost:3000/api/ClientUser/' +id , Client)
             .subscribe(response => {
               const updatedClients = [...this.cliUser];
               const oldClientIndex = updatedClients.findIndex(s => s.id ===Client.id);
               updatedClients[oldClientIndex] = Client;
               this.cliUserUpdated.next([...this.cliUser]);
               this.router.navigate(["/settings/ClientAccount"]);
             });
  }

  deleteUser(userId: string) {
    this.http.delete('http://localhost:3000/api/ClientUser/' +userId)
      .subscribe(() => {
        const updatedSupplier = this.cliUser.filter(supplier => supplier.id !== userId);
        this.cliUser = updatedSupplier;
        this.cliUserUpdated.next([...this.cliUser])
      });
  }

//   getAll() {
//     return this.http.get<AuthClientData[]>('http://localhost:3000/api/ClientUser');
// }
// name: {type: String , require:true},
//   contact: {type: String , require:true},
//   cliId: {type: String , require:true},
//   email: {type: String , require:true, unique:true} ,
//   password: {type: String , require:true}

  /////////////////////////////////////////////////////////////

  // interface TokenResponse {
  //   token: string;
  // }

  // export interface TokenPayload {
  //   email: string;
  //   password: string;
  //   name?: string;
  // }

  // private request(method: 'post'|'get', type: 'login'|'register'|'profile', user?: Token): Observable<any> {
  //   let base;

  //   if (method === 'post') {
  //     base = this.http.post(`/api/${type}`, user);
  //   } else {
  //     base = this.http.get(`/api/${type}`, { headers: { Authorization: `Bearer ${this.getToken()}` }});
  //   }

  //   const request = base.pipe(
  //     map((data: TokenResponse) => {
  //       if (data.token) {
  //         this.saveToken(data.token);
  //       }
  //       return data;
  //     })
  //   );

  //   return request;
  // }

  // public profile(): Observable<any> {
  //   return this.request('get', 'profile');
  // }



};

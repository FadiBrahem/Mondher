import { Subscription } from 'rxjs';
import { AuthService } from './../../auth/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-header-taskbar',
  templateUrl: './header-taskbar.component.html',
  styleUrls: ['./header-taskbar.component.css']
})
export class HeaderTaskbarComponent implements OnInit, OnDestroy {
  AdminRole = false;

  VerifierRole = false;
  role: string;
  userIsAuthenticated =false;
  private authListenerSubs: Subscription;

  constructor(private authService:AuthService) { }

  ngOnInit() {
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService.getAuthStatusListener()
    .subscribe(isAuthenticated =>{
      this.userIsAuthenticated= isAuthenticated;
    });

    this.role = this.authService.getUserRole();
    console.log(this.role);
    if(this.role === "Admin"){
      this.AdminRole = true;
    }
    else if(this.role === "Verifier"){
      this.VerifierRole = true;
    }

  }

  onLogout(){
    this.authService.logout();
  }

  ngOnDestroy(){
    this.authListenerSubs.unsubscribe();
  }

}

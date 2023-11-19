
import { Component, OnInit } from '@angular/core';
import { AccountService } from './Service/account.service';
import { User } from './Models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Dating App';

  constructor(
    private accountService:AccountService) {}

  ngOnInit(): void {

  this.setCurrentUser();
  }



  setCurrentUser(){
    const userString = localStorage.getItem('userToken');
    if(!userString) return;
    const user:User = JSON.parse(userString);
    this.accountService.setCurrentUser(user);
  }

}

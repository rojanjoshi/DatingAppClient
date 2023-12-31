import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { User } from 'src/app/Models/user';
import { AccountService } from 'src/app/Service/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  model: any = {};
  
  constructor(
    public accountService: AccountService,
    private router:Router,
    private toastr:ToastrService) {}
  ngOnInit(): void {
  }

  login() {
    this.accountService.login(this.model).subscribe({
      next: (response) => {
        this.router.navigateByUrl('/members');

      },
      // error: (error) => this.toastr.error(error.error),
    });
  }

  logout() {
   this.accountService.logout();
   this.router.navigateByUrl('/');
  }
}

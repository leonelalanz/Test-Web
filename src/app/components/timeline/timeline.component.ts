import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { User } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {
  private cid: string;
  public users: User[];

  constructor(private loginService: LoginService ,private cookieService: CookieService) { }

  ngOnInit() {
    this.cid = this.cookieService.get('cookie-id');
    console.log(this.cid);
    this.loginService.getData(this.cid)
    .subscribe(res => {
      this.users = res as User[];
    });
  }

}

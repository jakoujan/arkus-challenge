import { Component, OnInit } from '@angular/core';
import { SessionStorage } from 'ngx-webstorage';
import { ISession, IUser } from 'src/app/interfaces/entities';
import { UserService } from 'src/app/services/user.service';
import { constants } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  @SessionStorage(constants.SESSION)
  session: ISession;

  user: IUser = {
    id: undefined,
    username: undefined,
    password: undefined,
    name: undefined,
    email: undefined,
    userRole: undefined,
    englishLevel: undefined,
    techKnowledge: undefined,
    resumeLink: undefined,
  };

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUser(this.session.user.id).subscribe(user => {
      this.user = user;
    });
  }

}

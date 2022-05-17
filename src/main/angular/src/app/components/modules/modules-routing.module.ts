import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SessionGuard } from 'src/app/guards/session.guard';
import { constants } from 'src/environments/environment';
import { NavigationComponent } from '../ui/navigation/navigation.component';
import { AccountsComponent } from './accounts/accounts.component';
import { AssignmentsComponent } from './assignments/assignments.component';
import { UsersComponent } from './users/users.component';


const routes: Routes = [
  {
    path: '', component: NavigationComponent,
    children: [
      { path: 'users', component: UsersComponent, data: { role: constants.ROLE_ADMIN, validate: true }, canActivate: [SessionGuard] },
      { path: 'accounts', component: AccountsComponent, data: { role: constants.ROLE_ADMIN, validate: true }, canActivate: [SessionGuard] },
      { path: 'assignments', component: AssignmentsComponent, data: { role: constants.ROLE_ADMIN, validate: true }, canActivate: [SessionGuard] }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModulesRoutingModule { }

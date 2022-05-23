import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SessionGuard } from 'src/app/guards/session.guard';
import { constants } from 'src/environments/environment';
import { NavigationComponent } from '../ui/navigation/navigation.component';
import { ProfileComponent } from './profile/profile.component';


const routes: Routes = [
  {
    path: '', component: NavigationComponent,
    children: [
      { path: 'profile', component: ProfileComponent, data: { role: constants.ROLE_USER, validate: true }, canActivate: [SessionGuard] },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QueriesRoutingModule { }

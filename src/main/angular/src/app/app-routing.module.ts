import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { constants } from 'src/environments/environment';
import { DashboardComponent } from './components/ui/dashboard/dashboard.component';
import { NavigationComponent } from './components/ui/navigation/navigation.component';
import { SessionGuard } from './guards/session.guard';


const routes: Routes = [
  { path: '', loadChildren: () => import('./components/security/security.module').then(m => m.SecurityModule) },
  {
    path: 'dashboard', component: NavigationComponent,
    children: [
      { path: '', component: DashboardComponent, data: { role: constants.ROLE_USER, validate: true }, canActivate: [SessionGuard] }
    ]
  },
  {
    path: 'modules',
    loadChildren: () => import('./components/modules/modules.module').then(m => m.ModulesModule)
  },
  {
    path: 'queries',
    loadChildren: () => import('./components/queries/queries.module').then(m => m.QueriesModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false, useHash: true, relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

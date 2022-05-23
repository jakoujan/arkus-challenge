import { Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SessionStorage, SessionStorageService } from 'ngx-webstorage';
import { constants } from 'src/environments/environment';
import { NavigationService } from 'src/app/services/navigation.service';
import { MatSidenav } from '@angular/material/sidenav';
import { ISession } from 'src/app/interfaces/entities';
import { Module, Submodule } from 'src/app/modules';
import { SecurityService } from 'src/app/services/security.service';



@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  @SessionStorage(constants.SESSION)
  session: ISession;

  @SessionStorage(constants.MODULE)
  submodule: Submodule;


  @ViewChild('drawer')
  drawer: MatSidenav;

  modules: Array<Module> = [];


  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(map(result => result.matches), shareReplay());

  constructor(private breakpointObserver: BreakpointObserver, private router: Router, private navigationService: NavigationService,
    private securityService: SecurityService, private sessionStorage: SessionStorageService) { }

  ngOnInit(): void {
    if (this.submodule) {
      this.navigationService.navigate(this.submodule);
    }
  }

  public goto(action: string) {
    this.router.navigate([action]);
  }

  public onNavigate() {
    this.drawer.toggle();
  }

  public logout() {
    this.securityService.logout().subscribe(response => {
      if (response.code === 200) {
        this.router.navigate(['login']).then(() => {
          this.sessionStorage.clear(constants.SESSION);
        });
      }
    });
  }
}
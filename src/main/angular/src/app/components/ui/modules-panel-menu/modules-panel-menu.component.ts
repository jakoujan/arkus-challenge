import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Module, MODULES, Submodule } from 'src/app/modules';
import { SessionStorage } from 'ngx-webstorage';
import { constants } from 'src/environments/environment';
import { Router } from '@angular/router';
import { NavigationService } from 'src/app/services/navigation.service';
import { ISession } from 'src/app/interfaces/entities';

@Component({
  selector: 'modules-panel-menu',
  templateUrl: './modules-panel-menu.component.html',
  styleUrls: ['./modules-panel-menu.component.scss'],
})
export class ModulesPanelMenuComponent implements OnInit {

  @Output()
  onNavigate = new EventEmitter<void>();

  @SessionStorage(constants.SESSION)
  session: ISession;

  modules: Array<Module> = [];

  constructor(private router: Router, private navigationService: NavigationService) { }

  ngOnInit(): void {
    this.modules = this.buildMenu(this.session.user.userRole);
  }

  private buildMenu(role: string): Array<Module> {
    const modules: Array<Module> = [];
    const mods = MODULES.map(a => ({ ...a }));
    mods.filter(m => m.submodules.filter(s => s.role === role).length >= 1).map(m => {
      let mod: Module = m;
      m.submodules = m.submodules.filter(s => s.role === role);
      modules.push(m);
    });

    return modules;
  }

  public navigate(submodule: Submodule) {
    this.router.navigate([submodule.uri]).then(() => {
      this.onNavigate.emit();
      this.navigationService.navigate(submodule);
    });
  }
}
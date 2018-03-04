import { Component } from '@angular/core';
import { HttpEvent, HttpEventType } from '@angular/common/http';

import { DataStorageService } from '../../shared/data-storage.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  navbarIsOpen = false;

  constructor(private dataStorageService: DataStorageService,
              private authService: AuthService) {
  }

  navbarOnClick() {
    this.navbarIsOpen = !this.navbarIsOpen;
  }

  onSaveData() {
    this.dataStorageService.storeRecipes()
      .subscribe(
        // (response: HttpEvent<Object>) => {
        (response) => {
          // console.log(response.type === HttpEventType.Sent);
          console.log(response);
        }
      );
  }

  onFetchData() {
    this.dataStorageService.getRecipes();
  }

  onLogout() {
    this.authService.logout();
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }
}

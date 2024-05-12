import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { UserService } from '../../_services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.scss'
})
export class FeedComponent implements OnInit  {
  items: MenuItem[] | undefined;

  constructor(private userService: UserService, private router: Router) { }
 ngOnInit(): void {
    this.items = [
           
            {
                label: 'Logout',
              icon: 'pi pi-sign-out',
              command: () => {
                  this.userService.logout();
                }
            }
        ];
 }
 
}

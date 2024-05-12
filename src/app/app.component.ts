import { Component, HostListener, OnInit  } from '@angular/core';
import { UserService } from './_services/user.service';
import { User } from './_models/user';
import { AuthenticatedUser } from './_models/authenticatedUser';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent  implements OnInit {
  
  title = 'ReadMindMe.FE';
  hubConnection?: HubConnection
    
  constructor(private userService: UserService){}
  
  ngOnInit(): void {
    this.setCUrrentUser()
    this.connecttoHub()
  }

  connecttoHub() {
    console.log('connecting to hub');
    this.hubConnection = new HubConnectionBuilder()
     .withUrl('http://localhost:5127/hubs/presence', {
        accessTokenFactory: () => this.userService.authTokenSource.getValue()!
      })
     .withAutomaticReconnect()
      .build();
    
    this.hubConnection.start().catch(err => console.log(err))
    this.hubConnection.on('UserIsOnline', (data: any) => {
      console.log(data);
    })

  }

  
  setCUrrentUser() {
    const storage = localStorage.getItem('authenticated');

    if (!storage) {
      return;
    }

    const auth: AuthenticatedUser = JSON.parse(storage);
    this.userService.setCurrentUser(auth);
  }


}

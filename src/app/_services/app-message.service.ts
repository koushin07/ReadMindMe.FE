import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { AppMessage } from '../_models/appMessage';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map } from 'rxjs';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { UserService } from './user.service';
import { Conversation } from '../_models/Conversation';
import { ConversationService } from './conversation.service';

@Injectable({
  providedIn: 'root'
})
export class AppMessageService {
  baseUrl = environment.apiUrl + '/Messages'
  hubConnection?: HubConnection
  hubUrl = environment.hubUrl;

  constructor(private http: HttpClient, private userService: UserService, private conversationService: ConversationService) { }


  createMessageHub(convoId: number) {
    const token = this.userService.authTokenSource.getValue()
    this.hubConnection =  new HubConnectionBuilder()
     .withUrl(this.hubUrl + '/chat?convo='+convoId, {
        accessTokenFactory: () => token!
      })
     .withAutomaticReconnect()
     .build();
    this.hubConnection.start().then(_=>console.log('message connected')).catch(_=>console.log("error connecting"));
    
  }

  loadMessage(id: number) {
    return this.conversationService.conversationList$.pipe(
      map(convo => {
        return convo.find(c=>c.id === id); 
      })
    )
  }

sendMessage(convoId: number, content: string, otherUserId: number) { 
  
    return this.hubConnection?.invoke('SendMessage', { content, conversationId: convoId, otherUserId }).catch((err) => { 
      console.log(err);
    })
  }
}

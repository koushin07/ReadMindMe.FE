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


 
  loadMessage(id: number) {
    return this.conversationService.conversationList$.pipe(
      map(convo => {
        return convo.find(c=>c.id === id); 
      })
    )
  }

  sendMessage(convoId: number, content: string) { 
  
    return this.hubConnection?.invoke('SendMessage', { content, conversationId: convoId }).catch((err) => { 
      console.log(err);
    })
  }
}

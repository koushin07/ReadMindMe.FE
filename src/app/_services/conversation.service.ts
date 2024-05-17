import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { BehaviorSubject, Observable, map, take } from 'rxjs';
import { Conversation } from '../_models/Conversation';
import { AppMessage } from '../_models/appMessage';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ConversationService {
  baseUrl = environment.apiUrl + "/Conversations"
  hubConnection?: HubConnection
  hubUrl = environment.hubUrl

  private conversationListSource = new BehaviorSubject<Conversation[]>([])
  conversationList$ = this.conversationListSource.asObservable();

  connectionEstablished = new BehaviorSubject<boolean>(false);
  connectionEstablished$ = this.connectionEstablished.asObservable();
  
  
  constructor(private http: HttpClient, private userService: UserService) { }

  createHubConnection() {
    const token = this.userService.authTokenSource.getValue()
    this.hubConnection =  new HubConnectionBuilder()
      .withUrl(this.hubUrl + '/conversation', {
        accessTokenFactory: () => token!
      })
      .withAutomaticReconnect()
      .build();
   return this.hubConnection.start().then(_=> {
      console.log("connection started");
   }).catch(err => { 
     console.log(err, "error connecting");
   });


  }
  

  
  LoadUserConversation(otherUserEmail: string) {
    this.hubConnection?.invoke('LoadUserConversation', otherUserEmail).catch((error=>console.log(error)))
  }


   sendMessage(convoId: number, content: string, otherUserId: number) { 
  //    return this.http.post('http://localhost:5127/api/Messages', { content, conversationId: convoId, otherUserId }).pipe(
  //      map(res => {
  //      return res
  //    })
  //  )
    return this.hubConnection?.invoke('SendMessage', { content, conversationId: convoId, otherUserId }).catch((err) => { 
      console.log(err);
    })
  }

  stopConnection() {
    this.hubConnection?.stop()
  }
  

  
   crateConvo(postId: number, senderId: number) {
    return this.http.post<Conversation>(this.baseUrl, { senderId, postId }).pipe(
      map(response => {
        return response
      })
    )
  }

  deleteConvo(id: number) {
    return this.http.delete<Conversation>(this.baseUrl + '/' +id).pipe(
      take(1)
    )
  }
}

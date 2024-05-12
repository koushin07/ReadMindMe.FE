import { Conversation } from './../../_models/Conversation';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { UserService } from '../../_services/user.service';
import { ConversationService } from '../../_services/conversation.service';
import { BehaviorSubject, take } from 'rxjs';
import { AppMessage } from '../../_models/appMessage';
import { User } from '../../_models/user';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.scss'
})
export class MessageListComponent implements OnInit{
  private convoSource = new BehaviorSubject<Conversation[]>([])
  convo$ = this.convoSource.asObservable()
  user: User = {} as User;
  items: MenuItem[] | undefined;


  constructor(
    private router: Router,
    private userService: UserService,
    public conversationService: ConversationService,
    
  ) { }
  
  ngOnInit(): void {
    this.items = [
            { label: 'View', icon: 'pi pi-fw pi-search' },
            { label: 'Delete', icon: 'pi pi-fw pi-trash' }
        ];
    
    this.loadUser()
   
    // this.conversationService.createHubConnection()
    this.conversationService.receiveConversationThread();
  }

  
  loadUser() {
    this.userService.currentUser$.subscribe(usr => {
      if(usr) {
      this.user = usr;
      }
    })
  }

  isRead(convo: AppMessage[]): boolean{
    return convo.some(mssg => !mssg.isRead)
    
  }

  getSenderFullName(convo: Conversation): string {
    if (convo.sender.email == this.user.email) {
      return convo.post.user.firstName + ' ' + convo.post.user.lastName
    }
    
    return convo.sender.firstName + ' ' + convo.sender.lastName
  }

  serializePost(description: string) {
    return description.replace(/<[^>]*>/g, '')
  }

  deleteConvo(id: number) {
    this.conversationService.deleteConvo(id).subscribe(data => {
      this.router.navigateByUrl('/message')
      window.location.reload()
    })
  }


}

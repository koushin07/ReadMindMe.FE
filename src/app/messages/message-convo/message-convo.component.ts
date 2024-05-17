import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AppMessage } from '../../_models/appMessage';
import { BehaviorSubject, take } from 'rxjs';
import { AppMessageService } from '../../_services/app-message.service';
import { UserService } from '../../_services/user.service';
import { ConversationService } from '../../_services/conversation.service';
import { Conversation } from '../../_models/Conversation';
import { User } from '../../_models/user';
import { ScrollPanel } from 'primeng/scrollpanel';

@Component({
  selector: 'app-message-convo',
  templateUrl: './message-convo.component.html',
  styleUrl: './message-convo.component.scss',
})
export class MessageConvoComponent implements OnInit {
  private convoSource = new BehaviorSubject<Conversation>({} as Conversation);
  convo$ = this.convoSource.asObservable();
  private messageSource = new BehaviorSubject<AppMessage[]>([]);
  message$ = this.messageSource.asObservable();
  newMessage: string = '';
  user: User = {} as User;
  id: number = 0;

  constructor(
    private route: ActivatedRoute,
    public conversationService: ConversationService,
    private userService: UserService,
    private appMessageService: AppMessageService
  ) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe((param: ParamMap) => {
      this.id = +param.get('id')!;
    });
    this.loadUser();
    this.appMessageService.createMessageHub(this.id)
    this.loadMessagesHub()

  }

  loadMessagesHub() {
     this.appMessageService.hubConnection?.on("JoinConversation",( convo: Conversation) => {
      this.convoSource.next(convo)
      console.log(convo);
    })
    this.appMessageService.hubConnection?.on(
      'NewMessage',
      (data: AppMessage) => {
        // console.log("new message received", data);
        const prevVal = this.convoSource.getValue();
        this.convoSource.next({...prevVal, messages: [...prevVal.messages, data]});
      }
    );
  }


 
  loadUser() {
    this.userService.currentUser$.subscribe((usr) => {
      if (usr) {
        this.user = usr;
      }
    });
  }
  joinConversation() {
    this.conversationService.hubConnection?.on(
      'JoinConversation',
      (conversation: Conversation) => {
        console.log('join conversation is connected: ' + conversation);
        this.convoSource.next(conversation);
      }
    );

    
    this.conversationService.hubConnection?.invoke('JoinConversation', this.id);
    console.log(this.convoSource.getValue() + ' the value');
  }

  isOutGoing(message: AppMessage): boolean {
    // console.log(message);
    if (message.sender.id === this.user.id) {
      return true;
    }
    return false;
  }

  sendMessage(): void {
    const convo = this.convoSource.getValue();
    if (convo) {
      const otherUserId =
        convo.sender.email == this.user.email
          ? convo.post.user.id
          : convo.sender.id;

      this.appMessageService
        .sendMessage(convo.id, this.newMessage, otherUserId)
        ?.then((_) => (this.newMessage = ''));
    }
  }

  deleteConvo() {
    const convo = this.convoSource.getValue();
    if (convo) {
      this.conversationService.deleteConvo(convo.id).subscribe((data) => {});
    }
  }
}

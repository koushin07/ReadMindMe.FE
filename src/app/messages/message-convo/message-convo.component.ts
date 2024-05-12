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
    this.joinConversation();
  }

  loadMessages() {
    this.conversationService.conversationList$
      .pipe(take(1))
      .subscribe((convo) => {
        this.convoSource.next(
          convo.find((convo) => convo.id === this.user.id)!
        );
      });
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

    this.conversationService.hubConnection?.on(
      'NewMessage',
      (data: Conversation) => {
        console.log(`new Message: ${JSON.stringify(data)}`);
        this.convoSource.next(data);
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

      this.conversationService
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

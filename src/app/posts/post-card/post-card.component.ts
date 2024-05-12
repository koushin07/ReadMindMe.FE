import { User } from './../../_models/user';
import { Post } from './../../_models/post';
import { Component, Input, OnInit, input } from '@angular/core';
import { PostService } from '../../_services/post.service';
import { BehaviorSubject, take } from 'rxjs';
import { UserService } from '../../_services/user.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { Conversation } from '../../_models/Conversation';
import { ConversationService } from '../../_services/conversation.service';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.scss',
})
export class PostCardComponent implements OnInit {
  private postSource = new BehaviorSubject<Post>({} as Post);
  post$ = this.postSource.asObservable();
  private reactSource = new BehaviorSubject<string | null>(null);
  react$ = this.reactSource.asObservable();
  user: User = {} as User;
  visible: boolean = false;
  description = ''
  @Input() post: Post = {} as Post;

  constructor(
    private userService: UserService,
    private postService: PostService,
    private conversationService: ConversationService,
    private messageService: MessageService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.postSource.next(this.post);
    this.loadUser();
    this.loadReact(this.post);
  }
    showDialog() {
        this.visible = true;
    }
  loadUser() {
    this.userService.currentUser$.subscribe((usr) => {
      if (usr) {
        this.user = usr;
      }
    });
  }

 

  reactPost(id: number, reactType: string) {
    const type = this.reactSource.getValue();
    console.log(type);
  if (type) {
    this.deleteReact(this.post.id);
    
  } else {
     this.postService.reactPost(id, reactType).subscribe({
       next: (response) => {
         console.log(response);
            // this.postSource.next(response);
          
            this.reactSource.next(reactType);
          
          },
        });
  }}

  

  loadReact(post: Post) {
    const react = post.reacts.find(
      (react) => react.user.email === this.user.email
    );
    if (react) {
      this.reactSource.next(react.reactType);
    }
  }

  deleteReact(id: number) {
    this.postService.deleteReact(id).subscribe({
      next: (response) => {
        console.log("react");
        console.log(response);
        // this.postSource.next(response);
          
        this.reactSource.next(null);
      }
    })
  }

  updatePost(post: Post) {
    this.postService.updatePost(post.id, post.description).subscribe(res => { 
      this.visible = false;
      const post = this.postSource.getValue();
      this.messageService.add({severity: 'success', summary: "Successful", detail: "post has been updated"})
      
    })
  }

  createConvo(post: Post) {
    
    this.conversationService.crateConvo(post.id, this.user.id).subscribe({
      next: response => {
        console.log(response);
      this.router.navigateByUrl(`message/${response.id}`)
      },
      error: (err: any) => { 
        console.log(err, typeof (err));
        this.messageService.add({severity: 'error', detail: err.error.message});
      }
    })
  }

  canEdit(): boolean{
    const auth = this.userService.currentUserSource.getValue();
    return auth?.email === this.post.user.email ? true : false;
    
  }
 
}

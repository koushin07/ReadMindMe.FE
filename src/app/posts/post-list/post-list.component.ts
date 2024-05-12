import { Post } from './../../_models/post';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../../_services/user.service';
import { PostService } from '../../_services/post.service';
import { BehaviorSubject, map, take } from 'rxjs';
import { MenuItem, MessageService } from 'primeng/api';
import { User } from '../../_models/user';
import { FileUploadEvent } from 'primeng/fileupload';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.scss'
})
export class PostListComponent implements OnInit {
  description: string | undefined;
  private postSource = new BehaviorSubject<Post[] | null>(null);
  post$ = this.postSource.asObservable();
  user: User = {} as User;
  items: MenuItem[] | undefined;
  showupload: boolean = false;
  file: File | undefined;

  private imgSource = new BehaviorSubject<string | ArrayBuffer | null>(null);
     img$ = this.imgSource.asObservable();
  
  constructor(
    private userService: UserService,
    private postService: PostService,
    private messageService: MessageService) { }

  ngOnInit(): void {
     this.items = [
       {
         label: 'upload profile',
         icon: 'pi pi-copy',
         command: () => {
           this.showupload =!this.showupload;
         }
       },
            { label: 'Rename', icon: 'pi pi-file-edit' }
        ];
    this.loadPosts();
    this.loadUser()
  }
  loadUser() {
    this.userService.currentUser$.subscribe(usr => {
      if(usr) {
      this.user = usr;
      }
    })
  }
  createPost(form: NgForm) {
    if (this.description) {
      this.postService.createPost(this.description).subscribe({
        next: (response) => {

          const post = this.postSource.getValue();
          this.postSource.next([response, ...post!]);
          this.description = '';
          this.messageService.add({ severity: 'success', detail: 'Uploaded successfully' })
         }
      })
      // const post: Post = {
      //   description: this.description
      // };
    // this.posts.unshift(Post{description: this.description, user: this.userService.currentUser$ })})      
    }
  }
  
  loadPosts(): void {
    this.postService.getPosts().subscribe({
      next: (data: Post[]): void => {
        this.postSource.next(data);
      }
    })
  }
  fileUploading(event: any) {
     const files = event.target.files;
    const ext: string | undefined = files[0].type;
   
  const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      console.log('wrong extension');
        return;
    }
  
 const reader = new FileReader();
    
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => { 
      this.imgSource.next(reader.result);
    }
   this.file = files[0];
    
    }

  uploadPhoto() {
    if (this.file) {
      this.userService.uploadPhoto(this.file).subscribe(data => {
        console.log(data);
        this.showupload=false
    })
    }
    
  }
}
interface UploadEvent {
    originalEvent: Event;
    files: File[];
}
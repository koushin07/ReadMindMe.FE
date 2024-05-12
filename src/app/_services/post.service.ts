import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Post } from '../_models/post';
import { map, take } from 'rxjs';
import { Conversation } from '../_models/Conversation';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  baseUrl: string = environment.apiUrl + '/Posts';
  posts: Post[] = [];

  constructor(private http: HttpClient) { }


  createPost(description: string) {
    return this.http.post<Post>(this.baseUrl, { description: description }).pipe(
      map(response => {
        
        return response;
      })
    )
  }

  getPosts() {
    return this.http.get<Post[]>(this.baseUrl).pipe(
      map(response => {
        this.posts = response;
        return response;
      })
    )
  }

  likePost(id: number) {
    return this.http.post<Post>(this.baseUrl + '/like/' + id, {}).pipe(
      map(response => {
        return response;
      })
    )
  }
  reactPost(id: number, reactType: string) {
    return this.http.post<Post>(this.baseUrl + '/react/' + id, { reactType }).pipe(
      map(response => {
        return response
      })
    )
  }
  
  deleteReact(id: number) {
    return this.http.delete<Post>(this.baseUrl + '/delete/' + id).pipe(
      map(res => {
        return res
      })
    )
  }
  updatePost(id: number, description: string) {
    return this.http.put<Post>(this.baseUrl +"/"+ id, { description }).pipe(
      map(res => {
        
        return res;
      })
    )
  }

 
}

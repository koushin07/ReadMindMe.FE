import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, take } from 'rxjs';
import { User } from '../_models/user';
import { AuthenticatedUser } from '../_models/authenticatedUser';
import { Router } from '@angular/router';
import { Photo } from '../_models/photo';

@Injectable({
  providedIn: 'root'
})
export class UserService {
   currentUserSource = new BehaviorSubject<User | null>(null);
   authTokenSource = new BehaviorSubject<string | null>(null);
  authToken$ = this.authTokenSource.asObservable();
  currentUser$ = this.currentUserSource.asObservable();
  baseUrl : string = environment.apiUrl + '/User';

  constructor(private http: HttpClient, private router: Router) { }

  register(user: any) {
    return this.http.post(this.baseUrl+ "/register", user).pipe(take(1))
  }

  login(user: any) {
     return this.http.post<AuthenticatedUser>(this.baseUrl + '/login', user).pipe(
      map((response: AuthenticatedUser) => {
        const user = response;
        console.log(user);
        if (user) {
          console.log("set user", user);
          this.setCurrentUser(user)
        }
      })
    );
  }

    setCurrentUser(auth: AuthenticatedUser) {
      localStorage.setItem('authenticated', JSON.stringify(auth));
      this.authTokenSource.next(auth.token);
    this.currentUserSource.next(auth.user);

  }

   uploadPhoto(file: File) {
    const formData = new FormData()
    formData.append('file', file);
     return this.http.post<Photo>(this.baseUrl + "/upload-photo", formData).pipe(
       map((response) => {
         const auth = this.currentUserSource.getValue();
         if (auth) { 
           auth.photoUrl = response.url;
           const token = this.authTokenSource.getValue();
           this.setCurrentUser({ user: auth, token: token! });
         }
      })
    )
  }

  
  logout() { 
    localStorage.removeItem('authenticated');
    this.authTokenSource.next(null);
    this.currentUserSource.next(null);
    this.router.navigateByUrl('/')
  }

  
}

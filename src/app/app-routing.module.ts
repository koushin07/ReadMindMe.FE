import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DynamicListComponent } from './dynamic-list/dynamic-list.component';
import { LoginComponent } from './auth/login/login.component';
import { LandingPageComponent } from './layout/landing-page/landing-page.component';
import { RegisterComponent } from './auth/register/register.component';
import { authGuard } from './_guard/auth.guard';
import { PostListComponent } from './posts/post-list/post-list.component';
import { MessageListComponent } from './messages/message-list/message-list.component';
import { MessageConvoComponent } from './messages/message-convo/message-convo.component';
import { FeedComponent } from './layout/feed/feed.component';
import { hubConnectionResolver } from './_resolver/hub-connection.resolver';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { LandingpageSComponent } from './landingpage-s/landingpage-s.component';

const routes: Routes = [
  { path: 'landing', component:LandingpageSComponent },
  { path: '', component: LandingPageComponent },
  { path: 'test', component: DynamicListComponent },
  { path: "login", component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path:'',
    runGuardsAndResolvers: "always",
    component: FeedComponent,
    canActivate: [authGuard],
    children: [
      { path: 'feed', component: PostListComponent },
      { path: 'profile', component: UserDetailComponent },
      {
        path: 'message',
        component: MessageListComponent,
        children: [
          { path: ':id', component: MessageConvoComponent}
        ]
      },

    ]
    
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

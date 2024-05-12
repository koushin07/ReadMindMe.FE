import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DynamicListComponent } from './dynamic-list/dynamic-list.component';
import { LandingPageComponent } from './layout/landing-page/landing-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './auth/login/login.component';
import { SpartanModule } from './_modules/spartan/spartan.module';
import { RegisterComponent } from './auth/register/register.component';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TextInputComponent } from './_forms/register/text-input/text-input.component';

import { ToastrModule } from 'ngx-toastr';
import { PostListComponent } from './posts/post-list/post-list.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { PostCardComponent } from './posts/post-card/post-card.component';

import { jwtInterceptor } from './_interceptor/jwt.interceptor';
import { TimeagoModule } from 'ngx-timeago';
import { MessageService } from 'primeng/api';

import { FeedComponent } from './layout/feed/feed.component';
import { MessageListComponent } from './messages/message-list/message-list.component';
import { MessageConvoComponent } from './messages/message-convo/message-convo.component';

import { IncomingMessageComponent } from './messages/incoming-message/incoming-message.component';
import { OutgoingMessageComponent } from './messages/outgoing-message/outgoing-message.component';

import { PrimengModule } from './_modules/primeng/primeng.module';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { LandingpageSComponent } from './landingpage-s/landingpage-s.component';
@NgModule({
  declarations: [
    AppComponent,
    DynamicListComponent,
    LandingPageComponent,
    LoginComponent,
    RegisterComponent,
    TextInputComponent,
    PostListComponent,
    SidebarComponent,
    PostCardComponent,
    FeedComponent,
    MessageListComponent,
    MessageConvoComponent,
    IncomingMessageComponent,
    OutgoingMessageComponent,
    UserDetailComponent,
    LandingpageSComponent
  ],
  imports: [
    
   PrimengModule,
    TimeagoModule.forRoot(),
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    SpartanModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      enableHtml: true,
    }),

  ],
  providers: [
    provideHttpClient(withInterceptors([jwtInterceptor])),
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

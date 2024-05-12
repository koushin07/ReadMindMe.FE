import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { ConversationService } from '../_services/conversation.service';

export const hubConnectionResolver: ResolveFn<boolean> = (route, state) => {
  const conversationService = inject(ConversationService)
  return conversationService.createHubConnection().catch(err => {
    return false;
  }).then(_ => {
    return true
  }).finally(() => console.log('Connection established'))
 
};

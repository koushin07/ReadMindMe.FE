import { Component, Input } from '@angular/core';
import { AppMessage } from '../../_models/appMessage';

@Component({
  selector: 'app-outgoing-message',
  templateUrl: './outgoing-message.component.html',
  styleUrl: './outgoing-message.component.scss'
})
export class OutgoingMessageComponent {
  @Input() message: AppMessage ={} as AppMessage
}

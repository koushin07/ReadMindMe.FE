import { Component, Input } from '@angular/core';
import { AppMessage } from '../../_models/appMessage';

@Component({
  selector: 'app-incoming-message',
  templateUrl: './incoming-message.component.html',
  styleUrl: './incoming-message.component.scss'
})
export class IncomingMessageComponent {
 @Input() message: AppMessage ={} as AppMessage
}

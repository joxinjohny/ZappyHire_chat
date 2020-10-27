import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { ChatBotComponent } from './chat/components/chat-bot/chat-bot.component';
import { ChatService } from './core/services/chat/chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    // Chat window animation
    trigger('chatSpace', [
      state('close', style({
        height: '50px',
        width: '50px',
        right: '10px',
        bottom: '10px',
        opacity: 1,
        transform: 'scale(1)',
        cursor: 'pointer',
        'box-shadow': '0px 0px 7px -3px #4b5d6f',
        'background-color': '#1976d2',
        'border-radius': '35% 35% 0 35%'
      })),
      state('open', style({
        height: '540px',
        width: '430px',
        right: '10px',
        bottom: '10px',
        opacity: 1,
        'box-shadow': '0px 12px 25px -5px #4b5d6f',
        'border-radius': '35px 35px 0 35px',
        'background-color': '#f7f8fe',
        'padding': '20px'
      })),
      transition('* => *', animate('300ms ease-in-out'))
    ])
  ]
})
export class AppComponent {
  title = 'Zappyhire Chat';
  chatSpaceState: string = "close";
  chatComponent:any = '';

  constructor(private chatSrv: ChatService) {
    this.chatSrv.endChat.subscribe(chatStatus => {
      if(chatStatus) {
        this.chatSpaceState = 'close';
        this.chatComponent = '';
      } else {
        this.chatSpaceState = 'open';
        this.chatComponent = ChatBotComponent;
      }
    });
  }

  /**
   * 
   */
  toggleChatBox(){
    this.chatSrv.triggerEndAction(false);
  }
}

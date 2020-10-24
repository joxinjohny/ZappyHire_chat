import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { ChatBotComponent } from './chat/components/chat-bot/chat-bot.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
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
        height: '550px',
        width: '450px',
        right: '10px',
        bottom: '10px',
        opacity: 1,
        'box-shadow': '0px 12px 25px -5px #4b5d6f',
        'border-radius': '35px 35px 0 35px',
        'background-color': '#FFFFFF',
      })),
      transition('* => *', animate('200ms ease-in-out'))
    ])
  ]
})
export class AppComponent {
  title = 'Zappyhire Chat';
  chatSpaceState: string = "close";
  chatComponent:any = '';

  toggleChatBox(){
    this.chatSpaceState = 'open';
    this.chatComponent = ChatBotComponent;
  }
  
  endChat(){
    this.chatSpaceState = 'close';
    this.chatComponent = null;
  }
}

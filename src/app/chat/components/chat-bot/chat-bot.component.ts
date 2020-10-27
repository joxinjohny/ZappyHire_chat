import { animate, style, transition, trigger } from '@angular/animations';
import { ElementRef, EventEmitter, Renderer2, ViewChild } from '@angular/core';
import { Component, OnInit, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { ChatRequestBody, State, Token } from 'src/app/core/models/request-body.model';
import { ChatResponseBody } from 'src/app/core/models/response-body.model';
import { ChatService } from 'src/app/core/services/chat/chat.service';

@Component({
  selector: 'app-chat-bot',
  templateUrl: './chat-bot.component.html',
  styleUrls: ['./chat-bot.component.scss'],
  animations: [
    // Chat bubble animation
    trigger('msgAnim', [
      transition('void => *', [
        style({
          opacity: 0,
          marginBottom: '-30px' 
        }),
        animate('500ms', style({
          opacity: '*',
          marginBottom: '*'
        })),
        animate(100)
      ]),
    ])
  ]
})
export class ChatBotComponent implements OnInit {
  initialChatState: string = 'start';
  publicToken: string = '"sew1#jpZs>&YY{}"';
  requestBody:ChatRequestBody;
  responseData = <ChatResponseBody>{};
  chatSession:any= [];
  chatServiceSubscription: Subscription;
  interviewers: any = [];

  weekendFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    return day !== 0 && day !== 6;
  }

  constructor(private chatService: ChatService, private sanitization: DomSanitizer) {
    this.requestBody = new ChatRequestBody(this.initialChatState, this.publicToken);
  }

  /**
   * After DOM load, this method initiate chat with the bot.
   */
  ngOnInit(): void {
    this.chatServiceSubscription = this.chatService.getChatData(this.requestBody).subscribe(
      data => {
        this.parseResponse(data);
      }
    );
  }

  /**
   * 
   * @param responseData 
   * Parse and  process the response information recieved from API
   */
  public parseResponse(responseData: ChatResponseBody) {
    if(responseData.status){
      this.responseData = responseData;
      this.setState(responseData.results.state.prev_state);
      this.setCompleteStatus(responseData.results.complete);
      this.chatSession.unshift({type: 'inc', data: responseData});
      if(this.responseData.results.complete) {
        let component = this;
        setTimeout(function(){ component.endChat() }, 2000);
      }
      if(this.responseData.results.input_type == "no_answer") {
        this.sendResponse();
      }
      if(this.responseData.results.list_type == "interviewers") {
        this.addInterviewers(this.responseData.results.option_list[0]);
      }
    } else {
      alert("Error");
    }
  }

  /**
   * Sends the message to API
   */
  public sendResponse(){
    this.chatServiceSubscription = this.chatService.getChatData(this.requestBody).subscribe(
      data => {
        this.parseResponse(data);
      }
    );
  }

  /**
   * 
   * @param action 
   * @param value
   * Handles the action elements
   */
  public setAnswer(action: string, value: any) {
    let message = "";
    this.requestBody.input = '';
    this.requestBody.answer = '';
    if((typeof(value) == 'object' && value.text == '') || (typeof(value) == 'string' && value == '')) {
      return;
    }

    switch (action) {
      case 'answer':
        this.requestBody.answer = message = value;
        break;
      case 'input':
        this.requestBody.input = value;
        message = value.text;
        break;
      case 'endChat':
        this.requestBody.answer = this.getSelectedInterviewers();
        this.requestBody.complete = true;
        message = value;
        break;
    }

    this.chatSession.unshift({type: 'out', data: {message: message}});
    this.sendResponse();
  }

  /**
   * @param state 
   * sets the current state in request body
   */
  public setState(state: string) {
    this.requestBody.state.prev_state = state;
  }

  /**
   * @param complete 
   * sets the complete attribute in request body
   */
  public setCompleteStatus(complete: boolean) {
    this.requestBody.complete = complete;
  }

  public addInterviewers(optionList: any) {
    optionList.forEach(element => {
      this.interviewers.push({id: element.id, selected: false, data: element});
    });
  }

  /**
   * 
   * @param id 
   * handles the interviewer data
   */
  public selectInterviewer(id) {
    this.interviewers.find(x=>x.id == id).selected = !this.interviewers.find(x=>x.id == id).selected;
  }

  /**
   * gets the selected interviewers
   */
  public getSelectedInterviewers(){
    return this.interviewers.map( x => { if(x.selected) return x.id; }).filter(x => x);
  }

  /**
   * Ends the chat and close the popup
   */
  public endChat(){
    this.chatService.triggerEndAction(true);
  } 

  /**
   * 
   * @param url 
   * Sanitize the URL
   */
  sanitizeUrl(url: string) {
    return this.sanitization.bypassSecurityTrustStyle('url(' + url + ')');
  }
  
  /**
   * Unsubscribes from the chat service
   */
  ngOnDestroy () {
    this.chatServiceSubscription.unsubscribe();
  }
}

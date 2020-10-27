import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { ChatRequestBody } from '../../models/request-body.model';
import { ChatResponseBody } from '../../models/response-body.model';
import { BaseService } from '../base.service';

@Injectable()
export class ChatService extends BaseService{
  public endChat = new Subject();

  public getChatData(requestBody: ChatRequestBody): Observable<ChatResponseBody> {
    return super.post('', JSON.stringify(requestBody)).pipe(
      map(responseData => {
        return responseData;
      })
    );
  }

  triggerEndAction(state: boolean) {
    this.endChat.next(state);
  }
}

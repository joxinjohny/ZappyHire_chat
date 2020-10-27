export class ChatRequestBody {
    turn: number;
    answer:any;
    complete: boolean;
    quick_replies: any;
    input: any;
    speechResponse: any;
    state: State;
    intent: string;

    constructor(state: string, token: string){
        this.turn = 0;
        this.complete = false;
        this.quick_replies = [];
        this.speechResponse = [];
        this.state = new State(state, token);
        this.intent  = 'welcome';
    }
};

export class State {
    data: Token;
    prev_state: string;

    constructor(state: string, token: string){
        this.prev_state = state;
        this.data = new Token(token);
    }
}

export class Token {
    public_token: string;

    constructor(token: string) {
        this.public_token = token;
    }
}


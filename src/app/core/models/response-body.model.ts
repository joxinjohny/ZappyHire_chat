export interface ChatResponseBody {
    status: number;
    results: Result;
    errors: string;
};

export interface Result {
    complete: boolean;
    option_list: any;
    endpoint: string;
    input_list_data: any;
    speechResponse: any;
    state: State;
    list_type: string;
    intent: string;
    input_type: string;
    turn: number;
    search_api: string;
    quick_replies: any;
}

export interface State {
    prev_state: string;
    data: Token;
}

export interface Token {
    public_token: string;
    entities: any;
    user_data: UserData;
}

export interface UserData {
    public_token: string;
    name: string;
    email: string;
}
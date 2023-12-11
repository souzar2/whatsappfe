class TextMessage {
    text: string;
}



class Options {
    delay= 100;
    presence ="composing";
    linkPreview = false;
}

export class MessageModel {
    number: string
    options: Options
    textMessage: TextMessage

    constructor() {}

    start() {
        this.textMessage = new TextMessage();
        this.options = new Options();
    }
}
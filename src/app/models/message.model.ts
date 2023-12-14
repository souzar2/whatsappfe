class TextMessage {
    text: string;
}



class Options {
    delay= 100;
    presence ="composing";
    linkPreview = false;
}

class MediaMessage {
    mediatype= "image";
    caption: String;
    media:String;
}


export class MessageModel {
    number: string
    options: Options
    textMessage: TextMessage
    mediaMessage: MediaMessage
    audioBase64: string

    constructor() {}

    start() {
        this.textMessage = new TextMessage();
        this.options = new Options();
        this.mediaMessage = new MediaMessage();
    }
}
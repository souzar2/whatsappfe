export class ChatModel {
    remoteJid: string | undefined;
    fromMe: boolean | undefined;
    id: string | undefined;
    pushName: string | undefined;
    text: string | undefined;
    message: any | undefined;
    messageType: string | undefined;
    messageTimestamp: Date| undefined;
    imagemBase64: string| undefined;
    
    constructor() {}

}
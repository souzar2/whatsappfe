import { Component, Input } from '@angular/core';
import { ChatModel } from 'src/app/models/chat.model';

@Component({
  selector: 'app-mensagem-tile',
  templateUrl: './mensagem-tile.component.html',
  styleUrls: ['./mensagem-tile.component.sass']
})
export class MensagemTileComponent {
  @Input() enviada: boolean;
  @Input() msg: ChatModel;
  @Input() midia: string;
}

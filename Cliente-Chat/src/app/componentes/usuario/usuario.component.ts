// usuario.component.ts
import { Component } from '@angular/core';
import { SocketIOService } from 'src/app/socket-io.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css'],
})
export class UsuarioComponent {
  public message: string;
  public mensajes: any[] = [];
  private token: string;

  constructor(private socketService: SocketIOService) {
    // math.random() genera un número aleatorio entre 0 y 1

    const numero = Math.random() * 100;
    this.token = numero.toString();
    this.socketService.$chatList.subscribe((data) => {
      this.mensajes = data;
    });
  }

  ngOnInit(): void {}

  public sendMessage(): void {
    this.socketService.sendMessage(this.message, this.token);
    this.message = '';
  }
}

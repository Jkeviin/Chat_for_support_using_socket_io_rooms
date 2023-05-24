// administrador.component.ts
import { Component } from '@angular/core';
import { SocketIOService } from 'src/app/socket-io.service';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.css'],
})
export class AdministradorComponent {
  public message: string;
  public room: string;
  public userList: any[] = [];
  public mensajes: any[] = [];

  constructor(private socketService: SocketIOService) {
    this.socketService.loadRooms();
    this.socketService.$userList.subscribe((data) => {
      this.userList = data;
    });

    this.socketService.socket.on("actualizarChat", (data) => {
      this.mensajes = data;
    })
  }

  public sendMessage(): void {
    this.socketService.sendMessageAsesor({ message: this.message, room: this.room });
    this.message = '';
  }

  public disconnectUser(): void {
    this.socketService.disconnectUser(this.room, 'asesor');
  }

  public verChat(token: string){
    this.room = token;
    this.socketService.verChat(token);
  }
}

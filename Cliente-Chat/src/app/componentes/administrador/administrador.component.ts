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
  public userList: any[] = [];

  constructor(private socketService: SocketIOService) {
    this.socketService.$userList.subscribe((data) => {
      this.userList = data;
    });
  }

  public sendMessage(): void {
    const room = this.userList[0]; // Obtener el primer usuario de la lista
    this.socketService.sendMessageAsesor({ message: this.message, room });
    this.message = '';
  }

  public disconnectUser(room: string): void {
    this.socketService.disconnectUser(room);
  }
}

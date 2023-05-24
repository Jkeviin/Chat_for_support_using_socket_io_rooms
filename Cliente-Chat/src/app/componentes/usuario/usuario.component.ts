// usuario.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { SocketIOService } from 'src/app/socket-io.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css'],
})
export class UsuarioComponent implements OnInit, OnDestroy {
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

  // Declarar variables para los manejadores de eventos
  private beforeUnloadHandler: () => void;
  private unloadHandler: () => void;

  ngOnInit(): void {
    // ...

    // Asignar funciones a las variables de los manejadores de eventos
    this.beforeUnloadHandler = () => {
      this.socketService.disconnectUser('usuario' + this.token, 'usuario');
    };

    this.unloadHandler = () => {
      this.socketService.disconnectUser('usuario' + this.token, 'usuario');
    };

    // Agregar event listeners utilizando las funciones asignadas
    window.addEventListener('beforeunload', this.beforeUnloadHandler);
    window.addEventListener('unload', this.unloadHandler);
  }

  ngOnDestroy(): void {
    // Eliminar los event listeners utilizando las mismas funciones asignadas
    window.removeEventListener('beforeunload', this.beforeUnloadHandler);
    window.removeEventListener('unload', this.unloadHandler);
  }

  public sendMessage(): void {
    this.socketService.sendMessage(this.message, this.token);
    this.message = '';
  }
}

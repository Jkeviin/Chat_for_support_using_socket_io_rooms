import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketIOService {
  private socket: Socket;

    // BehaviorSubject variables:
    private userListSubject = new BehaviorSubject<any[]>([]);
    $userList = this.userListSubject.asObservable();

    private chatListSubject = new BehaviorSubject<any[]>([]);
    $chatList = this.chatListSubject.asObservable();

  constructor() {
    this.socket = io('http://localhost:3000'); // Cambia la URL si el servidor Node.js se encuentra en otra dirección

    // Escuchar eventos
    this.socket.on('actualizarRooms', (data) => {
      this.userListSubject.next(data);
    });

    this.socket.on('actualizarChat', (data) => {
      this.chatListSubject.next(data);
    });
  }

  public sendMessage(message: string, token: string): void {
    let data = {
      message: message,
      token: token
    }
    this.socket.emit('sendMessage', data);
  }

  public verChat(room: string): void {
    this.socket.emit('verChat', { room });
  }

  public sendMessageAsesor(data: { message: string, room: string }): void {
    this.socket.emit('sendMessageAsesor', data);
  }

  public loadRooms(): void {
    this.socket.emit('loadRooms');
  }

  public disconnectAsesor(room: string): void {
    this.socket.emit('disconnectAsesor', { room });
  }

  public disconnectUser(room: string): void {
    this.socket.emit('disconnectUser', { room });
  }

  public LoguearAsesor(){
    this.socket.emit('LoguearAsesor');
  }
  public onAsesorDisconnect(): Observable<any> {
    return new Observable<any>((observer) => {
      this.socket.on('asesorDisconnect', (message) => observer.next(message));
    });
  }

  public onUserDisconnect(): Observable<any> {
    return new Observable<any>((observer) => {
      this.socket.on('userDisconnect', (message) => observer.next(message));
    });
  }
}

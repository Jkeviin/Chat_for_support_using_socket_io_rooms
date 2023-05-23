import { Component, OnInit } from '@angular/core';
import { io, Socket } from 'socket.io-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  socket: any;
  queuePosition: number = 0; // Posición en la fila
  chatsPending: any[] = []; // Lista de chats pendientes
  currentChat: any; // Chat actual en progreso
  messages: any[] = []; // Lista de mensajes del chat actual
  newMessage: string = ''; // Nuevo mensaje a enviar

  ngOnInit() {
    this.socket = io('http://localhost:3000') as Socket;

    // Evento cuando el usuario se conecta al chat
    this.socket.on('connect', () => {
      const userId = 'usuario'; // Coloca aquí el ID del usuario actual
      this.socket.emit('join', userId);
    });

    // Evento cuando el usuario recibe su posición en la fila
    this.socket.on('queuePosition', (position: number) => {
      this.queuePosition = position;
    });

    // Evento cuando el usuario recibe la lista de chats pendientes
    this.socket.on('pendingChats', (chats: any[]) => {
      this.chatsPending = chats;
    });

    // Evento cuando se inicia un nuevo chat
    this.socket.on('startChat', ({ adminId }: { adminId: string }) => {
      // Establecer el chat actual con el administrador
      this.currentChat = { adminId };
      this.messages = [];
    });

    // Evento cuando se recibe un nuevo mensaje
    this.socket.on('newMessage', ({ senderId, message }: { senderId: string, message: string }) => {
      // Agregar el mensaje a la lista de mensajes
      this.messages.push({ senderId, message });
    });

    // Evento cuando el chat finaliza
    this.socket.on('chatEnded', () => {
      this.currentChat = null;
      this.messages = [];
    });
  }

  // Método para unirse a un chat pendiente
  joinPendingChat(chat: any) {
    const { userId, position } = chat;
    this.socket.emit('adminChat', { userId, position });
  }

  // Método para enviar un mensaje
  sendMessage(message: string) {
    const roomId = this.currentChat.adminId || this.currentChat.userId;
    this.socket.emit('sendMessage', { roomId, message });
  }

  // Método para abandonar el chat
  leaveChat() {
    const roomId = this.currentChat.adminId || this.currentChat.userId;
    this.socket.emit('leaveChat', roomId);
    this.currentChat = null;
    this.messages = [];
  }
}

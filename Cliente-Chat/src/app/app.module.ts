import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Asegúrate de importar FormsModule

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { UsuarioComponent } from './componentes/usuario/usuario.component';
import { AdministradorComponent } from './componentes/administrador/administrador.component';

@NgModule({
  declarations: [
    AppComponent,
    UsuarioComponent,
    AdministradorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule // Asegúrate de importar FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

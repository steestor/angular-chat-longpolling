import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ViewChild, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { environment } from '../environments/environment';
import {
  DxButtonModule,
  DxPopupModule,
  DxSwitchModule,
  DxTextBoxComponent,
  DxTextBoxModule,
} from 'devextreme-angular';
import notify from 'devextreme/ui/notify';
import { firstValueFrom } from 'rxjs';
import { avataresFemale, avataresMale } from './data/avatar';
//import { avatares } from './data/avatar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    DxButtonModule,
    DxTextBoxModule,
    FormsModule,
    DxPopupModule,
    DxSwitchModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private http = inject(HttpClient);
  @ViewChild('messageBox') messageBox!: DxTextBoxComponent;

  messages: any[] = [];
  initPage = true;
  switchValue = true;
  newMessage = '';
  avatarSrc = '';
  user = '';
  urlBaseBack = environment.apiUrl + '/';

  initChat() {
    this.initPage = false;
    if (this.switchValue) {
      this.avatarSrc =
        avataresFemale[Math.floor(Math.random() * avataresFemale.length)];
    } else {
      this.avatarSrc =
        avataresMale[Math.floor(Math.random() * avataresMale.length)];
    }
    this.pollForMessages();
  }

  pollForMessages() {
    firstValueFrom(
      this.http.get<any>(this.urlBaseBack + 'messages', {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
          'Access-Control-Allow-Headers': '*',
        },
      })
    )
      .then((res) => {
        this.messages = this.messages.concat(res.messages);
        this.pollForMessages();
      })
      .catch((err) => {
        // Cuando ocurre un timeout
        if (err.status == 502) {
          this.pollForMessages();
        } else {
          this.toast('Se ha producido un error', 'error');
          this.pollForMessages();
        }
      });
  }

  sendMessage() {
    if (this.newMessage) {
      this.http
        .post(this.urlBaseBack + 'sendMessage', {
          message: {
            avatar: this.avatarSrc,
            message: this.newMessage,
            date: new Date(),
            user: this.user,
          },
        })
        .subscribe((res) => {});
      this.messageBox.instance.reset();
    }
  }

  private toast(
    message: string,
    type: string,
    position: string = 'bottom center'
  ) {
    notify({
      message: message,
      type,
      displayTime: 5000,
      position,
      width: 'auto',
    });
  }
}

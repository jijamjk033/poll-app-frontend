import { Component, NgZone } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatComponent } from '../chat/chat.component';
import { CreatePollComponent } from '../create-poll/create-poll.component';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [NgFor, FormsModule, NgIf, ChatComponent, CreatePollComponent],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent {
  showChat = false;
  openCreatePoll = false;

  constructor(private userService: UserService, private router: Router, private ngZone: NgZone) { }
  openPolls = [
    { id: 1, question: "What's your favorite programming language?", options: ["JavaScript", "Python", "Java","Golang"] },
    { id: 2, question: "Do you prefer remote or office work?", options: ["Remote", "Office", "Hybrid"] }
  ];
  selectedPoll: any = null;
  selectedOption: string = '';

  selectPoll(poll: any) {
    this.selectedPoll = poll;
    this.selectedOption = '';
  }

  vote() {
    if (this.selectedOption) {
      alert(`You voted for: ${this.selectedOption}`);
    } else {
      alert('Please select an option.');
    }
  }

  openChat(){
    this.showChat = !this.showChat;
  }

  createPoll() {
    this.openCreatePoll = !this.openCreatePoll;
  }

  logout() {
    this.userService.logout();
    this.ngZone.run(() => {
      this.router.navigate(['/']);
    });
  }
}

import { Component, NgZone } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatComponent } from '../chat/chat.component';
import { CreatePollComponent } from '../create-poll/create-poll.component';
import { PollService } from '../../services/poll.service';
import { Poll } from '../../models/pollResponse';

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
  openPolls: Poll[] = [];
  selectedPoll: Poll | null = null;
  selectedOption: string = '';

  constructor(private userService: UserService, private router: Router, private ngZone: NgZone, private pollService: PollService) {
    this.fetchPolls();
  }

  selectPoll(poll: Poll) {
    this.selectedPoll = poll;
    this.selectedOption = '';
  }

  fetchPolls() {
    this.pollService.getPolls().subscribe({
      next: (polls) => {
        this.openPolls = polls.data;
      },
      error: (err) => {
        console.error('Error fetching polls:', err);
      }
    });
  }

  pollEventRecieved(event: boolean) {
    this.openCreatePoll = false;
    if (event) {
      this.fetchPolls();
    }
  }

  vote() {
    if (this.selectedOption && this.selectedPoll?._id) {
      this.pollService.vote(this.selectedPoll._id, this.selectedOption).subscribe({
        next: (updatedPoll) => {
          this.fetchPolls();
          this.selectedPoll = null;
        },
        error: (err) => {
          console.error('Vote error:', err);
        }
      });
    } else {
      alert('Please select an option.');
    }
  }

  openChat() {
    this.showChat = !this.showChat;
  }

  chatEventRecieved(event: boolean) {
    this.showChat = event;
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

import { CommonModule, NgFor } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PollService } from '../../services/poll.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-poll',
  standalone: true,
  imports: [NgFor, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './create-poll.component.html',
  styleUrl: './create-poll.component.css'
})
export class CreatePollComponent {
  @Input() isPollOpen = true;
  @Output() pollEvent = new EventEmitter();

  pollForm!: FormGroup;
  createdPolls: any[] = [];

  ngOnInit() {
    this.pollForm = this.fb.group({
      pollType: ['yesno', Validators.required],
      question: ['', Validators.required],
      options: this.fb.array([]),
    });
    this.setDefaultOptions();
  }
  constructor(private fb: FormBuilder, private pollService: PollService, private router: Router) { }

  get options(): FormArray {
    return (this.pollForm.get('options') as FormArray) || new FormArray([]);
  }

  togglePollType(type: string) {
    this.pollForm.get('pollType')?.setValue(type);
    this.options.clear();
    setTimeout(() => {
      if (type === 'multiple') {
        for (let i = 0; i < 4; i++) {
          this.options.push(new FormControl('', Validators.required));
        }
      } else {
        this.options.push(new FormControl('Yes', Validators.required));
        this.options.push(new FormControl('No', Validators.required));
      }
      this.options.updateValueAndValidity();
    });
  }

  setDefaultOptions() {
    this.togglePollType(this.pollForm.value.pollType);
  }

  createPoll() {
    if (this.pollForm.valid) {
      const pollData = {
        question: this.pollForm.value.question,
        pollType: this.pollForm.value.pollType,
        options: this.pollForm.value.options || []
      };
      this.pollService.createPoll(pollData).subscribe({
        next: (response) => {
          console.log('Poll saved successfully:', response);
          this.pollEvent.emit(response);
          this.pollForm.reset({ pollType: 'yesno', question: '' });
          this.setDefaultOptions();
          this.closeCreatePoll();
        },
        error: (error) => {
          console.error('Error saving poll:', error);
        }
      });
    }
  }

  closeCreatePoll() {
    this.isPollOpen = false;
    this.pollEvent.emit(false);
  }
}

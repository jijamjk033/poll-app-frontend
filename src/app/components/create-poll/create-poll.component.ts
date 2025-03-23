import { CommonModule, NgFor } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

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

  constructor(private fb: FormBuilder) {
    this.pollForm = this.fb.group({
      question: ['', Validators.required],
      options: this.fb.array([
        this.fb.control('', Validators.required),
        this.fb.control('', Validators.required),
        this.fb.control('', Validators.required),
        this.fb.control('', Validators.required),
      ]),
    });
  }

  get options(): FormArray {
    return this.pollForm.get('options') as FormArray;
  }

  getOptionLabel(index: number): string {
    return String.fromCharCode(65 + index);
  }

  togglePollType(type: string) {
    this.pollForm.get('pollType')?.setValue(type);

    if (type === 'multiple') {
      this.options.clear();
      this.options.push(new FormControl('', Validators.required));
      this.options.push(new FormControl('', Validators.required));
    } else {
      this.options.clear();
    }
  }

  createPoll() {
    if (this.pollForm.valid) {
      this.createdPolls.push(this.pollForm.value);
      console.log(this.pollForm.value);
      this.pollForm.reset({ pollType: 'yesno' });
      this.options.clear();
    }
  }
  closeCreatePoll() {
    this.isPollOpen = false;
    this.pollEvent.emit(false);
  }
}

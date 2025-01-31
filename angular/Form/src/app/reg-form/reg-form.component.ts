import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-reg-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reg-form.component.html',
  styleUrls: ['./reg-form.component.css'],
  
})
export class RegFormComponent {
  name: string = '';
  email: string = '';
  phone: string = '';
  dob: string = '';
  gender: string = '';
  department: string = '';
  @Output() formSubmitted = new EventEmitter<any>();
  onSubmit(): void {
    const formData={
      name: this.name,
      email: this.email,
      phone: this.phone,
      dob: this.dob,
      gender: this.gender,
      department: this.department
    };
    this.formSubmitted.emit(formData);
  }
}
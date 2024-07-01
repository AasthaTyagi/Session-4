import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-details.component.html',
  styleUrl: './form-details.component.css'
})
export class FormDetailsComponent {
  myForm : FormGroup


  constructor(private fb: FormBuilder){
    this.myForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      skills: this.fb.array([this.createSkillFormGroup()])
    })
  }

  createSkillFormGroup(): FormGroup {
    return this.fb.group({
      skillName: ['', Validators.required]
    });
  }

  addSkill(): void {
    const skillsArray = this.myForm.get('skills') as FormArray;
    skillsArray.push(this.createSkillFormGroup());
  }

  removeSkill(index: number): void {
    const skillsArray = this.myForm.get('skills') as FormArray;
    skillsArray.removeAt(index);
  }

  onSubmit(): void {
    if (this.myForm.valid) {
      console.log(this.myForm.value, " ...form data");
    } else {
      this.markFormGroupTouched(this.myForm);
    }
  }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}

import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class FormComponent {
  registrationForm = new FormGroup({
    name: new FormControl('', []),
    email: new FormControl('', []),
    telephone: new FormControl('', []),
    dob: new FormControl('', []),
    gender: new FormControl('', []),
    address: new FormControl('', []),
  });

  maxdob = new Date().toLocaleDateString('fr-ca');

  apiResponse: any;
  loadingModal = true;

  constructor(private router: Router, private http: HttpClient) {}

  onSubmit() {
    // show modal
    let modal = new bootstrap.Modal('#loadingModal', { backdrop: 'static' });
    modal.show();

    this.http
      .post('http://localhost:3000/submit-form', this.registrationForm.value, {responseType: 'json'})
      .subscribe(
        {
          next: (response) => {
            this.apiResponse = response;
            this.router.navigate(['/success'], {
              state: this.apiResponse,
            });
            modal.hide();
          },
          error: (error) => {
            this.apiResponse = error;
            console.log(this.apiResponse);
            let errorArray = this.apiResponse?.error.errors;
            console.log(errorArray);
            // this.myForm.get('email').setErrors({ 'incorrect': true });
            for (let index = 0; index < errorArray.length; index++) {
              this.registrationForm.get(errorArray[index].path)?.setErrors({ 'incorrect': true })
            }
            console.log(this.registrationForm.controls.name.errors);
            // simulate loading
            setTimeout(() => {
              modal.hide();
            }, 1000);
          },
        }
      );
  }
}

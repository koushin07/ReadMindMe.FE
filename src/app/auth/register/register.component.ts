import { MessageService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { UserService } from '../../_services/user.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit  {
  value: string = '';
  registerForm: FormGroup = new FormGroup({})
  private validationErrorsSource = new BehaviorSubject<string[] | null>(null);
  validationErrors$ = this.validationErrorsSource.asObservable();

  constructor(private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService,
    private messageService: MessageService
  ){}
  ngOnInit(): void {
    this.initializeForm();
  }
  register() {
  
    this.userService.register(this.registerForm.value).subscribe({
      next: () => { 
        this.router.navigateByUrl('/login');
        this.messageService.add({severity: 'success', summary: 'Ok', detail: 'Register Successfully'})
        // this.toastr.success("", "Registration Success")
      },
      error: (err) => {
        this.messageService.add({severity: "error", summary: err.statusText, detail: err.error.message})
        // this.toastr.error(err.error.message, "Registration Error");
       },
      complete: () => {}
    })
  }

  initializeForm(): void {

    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      PasswordConfirmation: ['', [Validators.required, Validators.minLength(4), this.matchValue('password')]]
    })
     this.registerForm.controls['password'].valueChanges.subscribe(_ => {
      this.registerForm.controls['confirmPassword'].updateValueAndValidity()
    })
  }

   matchValue(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control.value === control.parent?.get(matchTo)?.value ? null : { notMatching: true }
    }
  }

  
  

  
}

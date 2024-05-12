import { Component, OnInit } from '@angular/core';
import { UserService } from '../../_services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  
  loginForm: FormGroup = new FormGroup({})
  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router,
    private messageService: MessageService
  ) { }
  ngOnInit(): void {
    this.initializeForm()
  }

  login() {
    this.userService.login(this.loginForm.value).subscribe({
      next: _ => {
      console.log("login")
      this.router.navigateByUrl("/feed")
      },
      error: err => {
        console.log(err);
        this.messageService.add({severity: "error", summary: err.statusText, detail: err.error.message})
       }
    })
  }

  initializeForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }


}


import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  form!: UntypedFormGroup;
  isSubmitted = false;
  returnUrl = '';

  constructor(private fb: UntypedFormBuilder, 
    private service: UserService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'];
    console.log(this.form)
  }

  get fc() {
    return this.form.controls;
  }

  submit(){
    console.log(this.form)
    this.isSubmitted = true;
    if(this.form.invalid) return;

    this.service.login({
      email: this.fc['email'].value,
      password: this.fc['password'].value}).subscribe(() => {
      this.router.navigateByUrl(this.returnUrl);
    });
  }
}

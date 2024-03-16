import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    ReactiveFormsModule,
    TranslateModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [AuthService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  errorMessage = "";
  successMessage = "";
  loginForm = new FormGroup({
    email: new FormControl(),
    password: new FormControl(),
  });

  constructor(
    private authService: AuthService,
    public translate: TranslateService
  ) { }

  loginUser(value: any): void {
    this.authService.loginWithEmail(value.email, value.password)
      .then(() => {
        this.authService.navigate("dashboard")
      }).catch(_error => {
        this.errorMessage = _error;
        this.authService.navigate('/login');
      });
  }
}

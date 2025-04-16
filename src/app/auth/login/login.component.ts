import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email = '';
  password = '';
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  login() {
    this.auth.login(this.email, this.password).subscribe({
      next: (res) => {
        this.auth.setToken(res.token); // تخزين التوكن في localStorage
        this.router.navigate(['/home']); // التوجيه إلى الصفحة الرئيسية
      },
      error: () => {
        this.error = 'Invalid email or password'; // رسالة الخطأ عند الفشل
      }
    });
  }
}
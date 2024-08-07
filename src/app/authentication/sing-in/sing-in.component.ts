import { Component, inject, OnInit } from '@angular/core';
import {MatCardModule} from '@angular/material/card'
import { Router, RouterLink } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import {MatCheckboxModule} from '@angular/material/checkbox'
import { MatButtonModule } from '@angular/material/button';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sing-in',
  standalone: true,
  imports: [
    MatCardModule,
    RouterLink,
    MatFormFieldModule,
    MatCheckboxModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatIconModule
  ],
  templateUrl: './sing-in.component.html',
  styleUrl: './sing-in.component.scss'
})
export class SingInComponent implements OnInit {

  hide = true;
  load = false

  login_email = new FormControl('', [Validators.required, Validators.minLength(3)]);
  login_password = new FormControl('', [Validators.required, Validators.minLength(3)]);


  authService = inject(AuthService);
  router = inject(Router);

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigateByUrl('dashboard')
    }
  }

  singIn(){
    this.authService.singIn(this.login_email.value!, this.login_password.value!)
    //if (this.login_email.valid && this.login_password.valid) {
      //this.authService.singIn(this.login_email.value!, this.login_password.value!)
    //}
  }
}

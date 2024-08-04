import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CacheService } from '../../../../services/cache.service';

@Component({
  selector: 'app-dashboard-employee',
  standalone: true,
  imports: [MatFormFieldModule, ReactiveFormsModule, MatSelectModule, MatInputModule, MatButtonModule],
  templateUrl: './dashboard-employee.component.html',
  styleUrl: './dashboard-employee.component.scss'
})
export class DashboardEmployeeComponent {
  employeeForm!: FormGroup;
  documentTypes: string[] = ['Cedula Ciudadania', 'Cedula Extranjeria', 'NIT', 'Pasaporte'];

  
  cacheService = inject(CacheService);
  fb = inject(FormBuilder);

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.employeeForm = this.fb.group({
      employee_id: ['', Validators.required],
      account_id: ['', Validators.required],
      first_name: ['', Validators.required],
      second_name: [''],
      first_surname: ['', Validators.required],
      second_surname: [''],
      document_number: ['', Validators.required],
      document_type: ['', Validators.required],
      phone_number: ['', Validators.required],
      office_id: ['', Validators.required],
      extension: ['', Validators.required],
      charge_id: ['', Validators.required],
      created_at: ['', Validators.required],
      updated_at: ['', Validators.required],
      boss_id: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.employeeForm.valid) {
      console.log(this.employeeForm.value);
      // Aquí puedes llamar a tu servicio para enviar los datos
    }
  }
}

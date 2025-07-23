import { Component, OnInit, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login implements OnInit {
  isLoading = signal<boolean>(false);
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['userTest@gmail.com', [Validators.required, Validators.email]],
      password: ['123456', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() {
    // Lógica de inicialización aquí
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading.set(true);
      const formData = this.loginForm.value;
      setTimeout(() => {
        this.isLoading.set(false);
        console.log('Datos del formulario:', formData);
      }, 1700);
    } else {
      // Marcar todos los campos como tocados para mostrar errores
      this.loginForm.markAllAsTouched();
    }
  }

  // Métodos helper para validaciones en el template
  isFieldInvalid(fieldName: string): boolean {
    const field = this.loginForm.get(fieldName);
    return field ? field.invalid && field.touched : false;
  }

  getFieldError(fieldName: string): string {
    const field = this.loginForm.get(fieldName);
    if (field?.errors && field.touched) {
      if (field.errors['required']) {
        return `${fieldName === 'email' ? 'Correo electrónico' : 'Contraseña'} es requerido`;
      }
      if (field.errors['email']) {
        return 'Ingresa un correo electrónico válido';
      }
      if (field.errors['minlength']) {
        return 'La contraseña debe tener al menos 6 caracteres';
      }
    }
    return '';
  }
}

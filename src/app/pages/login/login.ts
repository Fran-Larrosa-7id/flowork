import { Component, OnInit, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
interface TypedChar {
  char: string;
  class: string;
}
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login implements OnInit {
  isLoading = signal<boolean>(false);
  showPassword = signal<boolean>(false);
  loginForm: FormGroup;
  texts: TypedChar[][] = [
    [...'¡Hola! Bienvenido a Portal Biz'].map(char => ({ char, class: 'text-white' })),
    [...'Que la tecnología te acompañe'].map(char => ({ char, class: 'text-white' })),
  ];
  typedChars = signal<TypedChar[]>([]);
  textIndex = 0;
  charIndex = 0;
  isDeleting = false;
  constructor(
    private formBuilder: FormBuilder
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['userTest@gmail.com', [Validators.required, Validators.email]],
      password: ['123456', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() {
    this.typeLoop();
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

  typeLoop(): void {
    const currentText = this.texts[this.textIndex];
    const currentTypedChars = [...this.typedChars()];

    if (this.isDeleting) {
      currentTypedChars.pop();
      this.charIndex--;
    } else {
      currentTypedChars.push(currentText[this.charIndex]);
      this.charIndex++;
    }

    // Update the signal with the new array
    this.typedChars.set(currentTypedChars);

    let delay = this.isDeleting ? 30 : 80;

    if (!this.isDeleting && this.charIndex === currentText.length) {
      delay = 1500;
      this.isDeleting = true;
    } else if (this.isDeleting && this.charIndex === 0) {
      this.isDeleting = false;
      this.textIndex = (this.textIndex + 1) % this.texts.length;
    }

    setTimeout(() => this.typeLoop(), delay);
  }

  // Método para alternar la visibilidad de la contraseña
  togglePasswordVisibility() {
    this.showPassword.set(!this.showPassword());
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

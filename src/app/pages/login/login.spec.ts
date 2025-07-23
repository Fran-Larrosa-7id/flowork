import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Login } from './login';

describe('Login', () => {
  let component: Login;
  let fixture: ComponentFixture<Login>;
  let formBuilder: FormBuilder;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Login, ReactiveFormsModule, CommonModule],
      providers: [FormBuilder]
    }).compileComponents();

    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;
    formBuilder = TestBed.inject(FormBuilder);
    fixture.detectChanges();
  });

  describe('Component Creation', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should initialize isLoading signal as false', () => {
      expect(component.isLoading()).toBe(false);
    });

    it('should create login form with default values', () => {
      expect(component.loginForm).toBeTruthy();
      expect(component.loginForm.get('email')?.value).toBe('userTest@gmail.com');
      expect(component.loginForm.get('password')?.value).toBe('123456');
    });
  });

  describe('Form Validation', () => {
    it('should create form with required validators', () => {
      const emailControl = component.loginForm.get('email');
      const passwordControl = component.loginForm.get('password');

      expect(emailControl?.hasError('required')).toBeFalsy(); // Has default value
      expect(passwordControl?.hasError('required')).toBeFalsy(); // Has default value
    });

    it('should validate email format', () => {
      const emailControl = component.loginForm.get('email');
      
      emailControl?.setValue('invalid-email');
      expect(emailControl?.hasError('email')).toBeTruthy();
      
      emailControl?.setValue('valid@email.com');
      expect(emailControl?.hasError('email')).toBeFalsy();
    });

    it('should validate password minimum length', () => {
      const passwordControl = component.loginForm.get('password');
      
      passwordControl?.setValue('12345'); // 5 characters
      expect(passwordControl?.hasError('minlength')).toBeTruthy();
      
      passwordControl?.setValue('123456'); // 6 characters
      expect(passwordControl?.hasError('minlength')).toBeFalsy();
    });

    it('should validate required fields when empty', () => {
      const emailControl = component.loginForm.get('email');
      const passwordControl = component.loginForm.get('password');
      
      emailControl?.setValue('');
      passwordControl?.setValue('');
      
      expect(emailControl?.hasError('required')).toBeTruthy();
      expect(passwordControl?.hasError('required')).toBeTruthy();
    });

    it('should be valid with correct values', () => {
      component.loginForm.patchValue({
        email: 'test@example.com',
        password: 'password123'
      });
      
      expect(component.loginForm.valid).toBeTruthy();
    });

    it('should be invalid with incorrect values', () => {
      component.loginForm.patchValue({
        email: 'invalid-email',
        password: '123'
      });
      
      expect(component.loginForm.valid).toBeFalsy();
    });
  });

  describe('onSubmit method', () => {
    it('should process valid form submission', (done) => {
      component.loginForm.patchValue({
        email: 'test@example.com',
        password: 'password123'
      });
      
      spyOn(console, 'log');
      
      component.onSubmit();
      expect(component.isLoading()).toBe(true);
      
      // Wait for the setTimeout to complete
      setTimeout(() => {
        expect(component.isLoading()).toBe(false);
        expect(console.log).toHaveBeenCalledWith('Datos del formulario:', {
          email: 'test@example.com',
          password: 'password123'
        });
        done();
      }, 1800);
    });

    it('should mark all fields as touched when form is invalid', () => {
      component.loginForm.patchValue({
        email: 'invalid-email',
        password: '123'
      });
      
      spyOn(component.loginForm, 'markAllAsTouched');
      
      component.onSubmit();
      
      expect(component.loginForm.markAllAsTouched).toHaveBeenCalled();
      expect(component.isLoading()).toBe(false);
    });
  });

  describe('isFieldInvalid method', () => {
    it('should return true for invalid and touched field', () => {
      const emailControl = component.loginForm.get('email');
      emailControl?.setValue('invalid-email');
      emailControl?.markAsTouched();
      
      expect(component.isFieldInvalid('email')).toBe(true);
    });

    it('should return false for invalid but untouched field', () => {
      const emailControl = component.loginForm.get('email');
      emailControl?.setValue('invalid-email');
      emailControl?.markAsUntouched();
      
      expect(component.isFieldInvalid('email')).toBe(false);
    });

    it('should return false for valid field', () => {
      const emailControl = component.loginForm.get('email');
      emailControl?.setValue('valid@email.com');
      emailControl?.markAsTouched();
      
      expect(component.isFieldInvalid('email')).toBe(false);
    });

    it('should return false for non-existent field', () => {
      expect(component.isFieldInvalid('nonexistent')).toBe(false);
    });
  });

  describe('getFieldError method', () => {
    it('should return required error message for email', () => {
      const emailControl = component.loginForm.get('email');
      emailControl?.setValue('');
      emailControl?.markAsTouched();
      
      expect(component.getFieldError('email')).toBe('Correo electrónico es requerido');
    });

    it('should return required error message for password', () => {
      const passwordControl = component.loginForm.get('password');
      passwordControl?.setValue('');
      passwordControl?.markAsTouched();
      
      expect(component.getFieldError('password')).toBe('Contraseña es requerido');
    });

    it('should return email validation error message', () => {
      const emailControl = component.loginForm.get('email');
      emailControl?.setValue('invalid-email');
      emailControl?.markAsTouched();
      
      expect(component.getFieldError('email')).toBe('Ingresa un correo electrónico válido');
    });

    it('should return minlength error message for password', () => {
      const passwordControl = component.loginForm.get('password');
      passwordControl?.setValue('123');
      passwordControl?.markAsTouched();
      
      expect(component.getFieldError('password')).toBe('La contraseña debe tener al menos 6 caracteres');
    });

    it('should return empty string for valid field', () => {
      const emailControl = component.loginForm.get('email');
      emailControl?.setValue('valid@email.com');
      emailControl?.markAsTouched();
      
      expect(component.getFieldError('email')).toBe('');
    });

    it('should return empty string for untouched field with errors', () => {
      const emailControl = component.loginForm.get('email');
      emailControl?.setValue('invalid-email');
      emailControl?.markAsUntouched();
      
      expect(component.getFieldError('email')).toBe('');
    });

    it('should return empty string for non-existent field', () => {
      expect(component.getFieldError('nonexistent')).toBe('');
    });
  });

  describe('ngOnInit', () => {
    it('should call ngOnInit without errors', () => {
      expect(() => component.ngOnInit()).not.toThrow();
    });
  });

  describe('Integration Tests', () => {
    it('should handle invalid form submission flow', () => {
      // Set invalid form data
      component.loginForm.patchValue({
        email: 'invalid',
        password: '123'
      });
      
      // Mark as touched to trigger validations
      component.loginForm.markAllAsTouched();
      
      // Should be invalid
      expect(component.loginForm.valid).toBe(false);
      expect(component.isFieldInvalid('email')).toBe(true);
      expect(component.isFieldInvalid('password')).toBe(true);
      
      // Get error messages
      expect(component.getFieldError('email')).toBe('Ingresa un correo electrónico válido');
      expect(component.getFieldError('password')).toBe('La contraseña debe tener al menos 6 caracteres');
      
      // Submit form
      spyOn(component.loginForm, 'markAllAsTouched');
      component.onSubmit();
      
      // Should not set loading
      expect(component.isLoading()).toBe(false);
      expect(component.loginForm.markAllAsTouched).toHaveBeenCalled();
    });
  });

  describe('Edge Cases', () => {
    it('should handle null form control gracefully', () => {
      // Simulate null form control
      spyOn(component.loginForm, 'get').and.returnValue(null);
      
      expect(component.isFieldInvalid('email')).toBe(false);
      expect(component.getFieldError('email')).toBe('');
    });

    it('should handle form control without errors', () => {
      const emailControl = component.loginForm.get('email');
      emailControl?.setValue('valid@email.com');
      emailControl?.markAsTouched();
      
      // Mock errors property to be null
      Object.defineProperty(emailControl, 'errors', {
        get: () => null,
        configurable: true
      });
      
      expect(component.getFieldError('email')).toBe('');
    });
  });
});

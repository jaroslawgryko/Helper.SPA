import { AuthService } from './../_services/auth.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../_models/User';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


 @Component({
   selector: 'app-register',
   templateUrl: './register.component.html',
   styleUrls: ['./register.component.css']
 })
 export class RegisterComponent implements OnInit {

  @Output() cancelRegister = new EventEmitter();

  user: User;
  registerForm: FormGroup;

  rodzajeInstytucji: string[] = [
    'urząd wojewódzki',
    'ministerstwo',
    'archiwum państwowe',
    'uczelnia wyższa',
    'urzęd centralny',
    'samorząd',
    'inny'
  ];

  constructor(private authService: AuthService, private alertify: AlertifyService,
    private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      telefon: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(16)]],
      confirmPassword: ['', Validators.required],
      instytucjaNazwa: ['', Validators.required],
      instytucjaSymbol: ['', Validators.required],
      instytucjaRodzaj: ['urząd wojewódzki']

    }, {validator: this.passwordMatchValidator});
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value ? null : {'mismatch' : true };
  }

  register() {
    if (this.registerForm.valid) {
      this.user = Object.assign({}, this.registerForm.value);
      this.authService.register(this.user)
        .subscribe(() => {
          this.alertify.success('Rejestracja zakończona pomyślnie');
        }, error => {
          this.alertify.error(error);
        }, () => {
          this.authService.login(this.user).subscribe(() => {
            this.router.navigate(['/members']);
          });
        });
    }
  }

   cancel() {
     this.cancelRegister.emit(false);
   }
 }

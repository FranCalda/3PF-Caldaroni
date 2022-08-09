import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {

  public registroForm !: FormGroup;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.registroForm = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100), Validators.pattern('[a-z A-Z ÁÉÍÓÚ áéíóú]*')]],
      email: ['', [Validators.required, Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$')]],
      contraseña: ['']
    })
  }

  registro() {
    if (this.registroForm.valid) {
      this.http.post<any>("http://localhost:3000/registroUsuario", this.registroForm.value)
        .subscribe(res => {
          alert("Registrado con exito");
          this.registroForm.reset();
          this.router.navigate(['login']);
        }, err => {
          alert("Hubo un problema con el registro");
        })
    } else {
      alert("Hubo un problema con el registro");
    }
  }

}

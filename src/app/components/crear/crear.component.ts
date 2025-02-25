import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css'],
  imports: [CommonModule, ReactiveFormsModule],
})
export class CrearComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.crearFormulario();
  }

  crearFormulario() {
    this.form = this.fb.group({
      titulo: ['', Validators.required],
      director: ['', Validators.required],
      anio: ['', [Validators.required, Validators.pattern("^[0-9]*$")]], // Validar que sea un número

    });
  }
  onSubmit(): void {
    if (this.form.valid) {
      this.apiService.create(this.form.value).subscribe({
        next: () => {
          this.openSnackBar('Película creada con éxito!', 'Cerrar');
          setTimeout(() => {
            this.router.navigate(['/listar']); // Redirigir a la lista después de crear
          }, 3000);
        },
        error: (err) => console.error('❌ Error al crear la película:', err)
      });
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }
  cancelar(): void {
    this.router.navigate(['']); // Redirige a la vista de listar
  }
  /*openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000, // Duración en milisegundos
    });
  }  
  onSubmit(): void {
    if (this.form.valid) {
      this.apiService.create(this.form.value).subscribe({
        next: () => {
          this.router.navigate(['']); // Redirigir a la lista después de crear
        },
        error: (err) => console.error('❌ Error al crear la película:', err)
      });
    }
  }*/
}

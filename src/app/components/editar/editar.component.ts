import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css'],
  imports: [CommonModule, ReactiveFormsModule],
})
export class EditarComponent implements OnInit {
  form!: FormGroup;
  id!: number;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.obtenerPelicula();
    this.crearFormulario();
  }

  crearFormulario() {
    this.form = this.fb.group({
      titulo: ['', Validators.required],
      director: ['', Validators.required],
      anio: ['', [Validators.required, Validators.pattern("^[0-9]*$")]], // Asegúrate de que sea un número

    });
  }

  obtenerPelicula(): void {
    this.apiService.getById(this.id).subscribe({
      next: (pelicula) => {
        this.form.patchValue(pelicula); // Carga los datos en el formulario
      },
      error: (err) => console.error('❌ Error al obtener la película:', err)
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.apiService.update(this.id, this.form.value).subscribe({
        next: () => {
          this.router.navigate(['/listar']);
        },
        error: (err) => console.error('❌ Error al actualizar la película:', err)
      });
    }
  }
  volver(): void {
    this.router.navigate(['/listar']); // Redirige a la vista de listar
  }
}
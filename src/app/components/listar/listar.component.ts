import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-listar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css'],
})
export class ListarComponent implements OnInit {
  peliculas: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.obtenerPeliculas();
  }

  obtenerPeliculas(): void {
    this.apiService.getAll().subscribe({
      next: (data) => {
        console.log('📌 Datos recibidos:', data); // Debug
        this.peliculas = data;
      },
      error: (err) => console.error('❌ Error al obtener datos:', err)
    });
  }
  eliminarPelicula(id: number) {
    const confirmacion = window.confirm("¿Estás seguro de que deseas eliminar esta película?");
    
    if (confirmacion) {
      this.apiService.delete(id).subscribe(() => {
        this.obtenerPeliculas(); // Actualiza la lista después de eliminar
        alert("Película eliminada con éxito"); // Opcional
      });
    }

}
}

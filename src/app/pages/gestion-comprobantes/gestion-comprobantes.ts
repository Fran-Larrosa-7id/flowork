import { Component, inject, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtilService } from '../../services/util';
import { MaterialDesignModule } from '../../shared/material-design.module';

interface Comprobante {
  id: number;
  periodo: string;
  monto: number;
  estado: 'NUEVO' | 'ACEPTADO' | 'RECHAZADO' | 'PAGO';
  archivos: number;
}

@Component({
  selector: 'app-gestion-comprobantes',
  imports: [CommonModule, MaterialDesignModule],
  templateUrl: './gestion-comprobantes.html',
  styleUrl: './gestion-comprobantes.scss'
})
export class GestionComprobantes {
  utilService = inject(UtilService);
  
  // Propiedades para responsive
  public isMobile = false;
  public deviceType = '';

  // Datos de ejemplo basados en la imagen
  comprobantes: Comprobante[] = [
    {
      id: 1,
      periodo: '07-2025',
      monto: 500000,
      estado: 'NUEVO',
      archivos: 2
    },
    {
      id: 2,
      periodo: '06-2025',
      monto: 399000,
      estado: 'ACEPTADO',
      archivos: 4
    },
    {
      id: 3,
      periodo: '05-2025',
      monto: 500000,
      estado: 'RECHAZADO',
      archivos: 2
    },
    {
      id: 4,
      periodo: '04-2025',
      monto: 500000,
      estado: 'PAGO',
      archivos: 3
    }
  ];

  // Filtros
  filtroEstado: string = '';
  filtroCliente: string = '';
  filtroPeriodo: string = '';

  // Effect para detectar cambios de dispositivo
  deviceEffect = effect(() => {
    this.deviceType = this.utilService.deviceTypeComputed();
    this.isMobile = this.deviceType.includes('mobile');
  });

  // Método para alternar la visibilidad del sidebar
  toggleSidebar() {
    this.utilService.toggleSidebarState();
  }

  // Métodos para filtros
  filtrarPorEstado(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.filtroEstado = target.value;
    // Implementar lógica de filtrado
  }

  filtrarPorCliente(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.filtroCliente = target.value;
    // Implementar lógica de filtrado
  }

  filtrarPorPeriodo(event: Event) {
    const target = event.target as HTMLInputElement;
    this.filtroPeriodo = target.value;
    // Implementar lógica de filtrado
  }

  // Métodos para acciones
  descargarComprobante(id: number) {
    console.log('Descargar comprobante:', id);
    // Implementar lógica de descarga
  }

  cargarArchivos(id: number) {
    console.log('Cargar archivos para comprobante:', id);
    // Implementar lógica de carga de archivos
  }

  eliminarComprobante(id: number) {
    console.log('Eliminar comprobante:', id);
  }

  // Método para obtener clase CSS del estado
  getEstadoClass(estado: string): string {
    switch (estado) {
      case 'NUEVO':
        return 'estado-nuevo';
      case 'ACEPTADO':
        return 'estado-aceptado';
      case 'RECHAZADO':
        return 'estado-rechazado';
      case 'PAGO':
        return 'estado-pago';
      default:
        return '';
    }
  }

  // Método para agregar nuevo comprobante
  agregarComprobante() {
    console.log('Agregar nuevo comprobante');
  }
}

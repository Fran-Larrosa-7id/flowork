import { Component, inject, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UtilService } from '../../services/util';
import { MaterialDesignModule } from '../../shared/material-design.module';

interface Comprobante {
  id: number;
  periodo: string;
  monto: number;
  estado: 'NUEVO' | 'ACEPTADO' | 'RECHAZADO' | 'PAGO';
  archivos: number;
}

interface ArchivoPreview {
  name: string;
  size: number;
  type: string;
  url: string;
  id: string;
}

@Component({
  selector: 'app-gestion-comprobantes',
  imports: [CommonModule, FormsModule],
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

  // Modal para agregar comprobante
  showModal: boolean = false;
  nuevoComprobante = {
    cliente: '',
    periodo: '',
    monto: 0
  };
  archivosPreview: ArchivoPreview[] = [];

  // Datos mockeados para preview
  archivosMock: ArchivoPreview[] = [
    {
      id: '1',
      name: 'comprobante_07_2025.pdf',
      size: 1024000, // 1MB
      type: 'application/pdf',
      url: 'mock-url-1'
    },
    {
      id: '2',
      name: 'factura_adicional.jpg',
      size: 512000, // 512KB
      type: 'image/jpeg',
      url: 'mock-url-2'
    }
  ];

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
    this.showModal = true;
    // Mockear archivos para demostración
    this.archivosPreview = [...this.archivosMock];
    console.log('Archivos mockeados para el preview:', this.archivosPreview);
    
  }

  // Cerrar modal
  cerrarModal() {
    this.showModal = false;
    this.nuevoComprobante = {
      cliente: '',
      periodo: '',
      monto: 0
    };
    this.archivosPreview = [];
  }

  // Crear nuevo comprobante
  crearPago() {
    console.log('Crear nuevo comprobante:', this.nuevoComprobante);
    console.log('Archivos:', this.archivosPreview);
    // Aquí iría la lógica para crear el comprobante
    this.cerrarModal();
  }

  // Simular carga de archivo
  onFileSelect(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      // En la implementación real, aquí procesarías los archivos
      console.log('Archivos seleccionados:', input.files);
    }
  }

  // Eliminar archivo del preview
  eliminarArchivo(id: string) {
    this.archivosPreview = this.archivosPreview.filter(archivo => archivo.id !== id);
  }

  // Formatear tamaño de archivo
  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  // Obtener icono según tipo de archivo
  getFileIcon(type: string): string {
    if (type.includes('pdf')) return 'fas fa-file-pdf';
    if (type.includes('image')) return 'fas fa-file-image';
    if (type.includes('word')) return 'fas fa-file-word';
    if (type.includes('excel')) return 'fas fa-file-excel';
    return 'fas fa-file';
  }
}

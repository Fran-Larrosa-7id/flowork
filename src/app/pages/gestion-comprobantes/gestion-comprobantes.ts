import { Component, inject, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UtilService } from '../../services/util';
import { MaterialDesignModule } from '../../shared/material-design.module';
import { RolService } from '../../services/rol';

interface Comprobante {
  id: number;
  numero?: string;
  cliente?: string;
  fecha?: string;
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
  rolService = inject(RolService);
  // Propiedades para responsive
  public isMobile = false;
  public deviceType = '';

  // Datos de ejemplo basados en la imagen
  comprobantes: Comprobante[] = [
    {
      id: 1,
      numero: 'PAG-0001',
      cliente: 'Empresa ABC S.A.S',
      fecha: '2025-01-15',
      periodo: '07-2025',
      monto: 500000,
      estado: 'NUEVO',
      archivos: 2
    },
    {
      id: 2,
      numero: 'PAG-0002',
      cliente: 'Compañía XYZ Ltda',
      fecha: '2025-01-10',
      periodo: '06-2025',
      monto: 399000,
      estado: 'ACEPTADO',
      archivos: 4
    },
    {
      id: 3,
      numero: 'PAG-0003',
      cliente: 'Industrias DEF S.A.S',
      fecha: '2025-01-05',
      periodo: '05-2025',
      monto: 500000,
      estado: 'RECHAZADO',
      archivos: 2
    },
    {
      id: 4,
      numero: 'PAG-0004',
      cliente: 'Servicios GHI E.U',
      fecha: '2024-12-28',
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
      name: 'factura_adicional_con_nombre_muy_largo_para_probar_truncate.jpg',
      size: 512000, // 512KB
      type: 'image/jpeg',
      url: 'mock-url-2'
    },
    {
      id: '3',
      name: 'GRILLA_CONCEPTOS_COMPRA_DEFINITIVA_ade575032_(1).pdf',
      size: 2048000, // 2MB
      type: 'application/pdf',
      url: 'mock-url-3'
    },
    {
      id: '4',
      name: 'WhatsApp_Image_2025-06-24_at_13.17.02.jpeg',
      size: 852000, // 852KB
      type: 'image/jpeg',
      url: 'mock-url-4'
    },
    {
      id: '5',
      name: 'INSTRUCCIONES_PARA_RECIBIR_FONDOS_DEL_EXTERIOR_BANCO_POPULAR.pdf',
      size: 1740000, // 1.74MB
      type: 'application/pdf',
      url: 'mock-url-5'
    },
    {
      id: '6',
      name: 'Autorizacion_de_Descuento_TC_(19).pdf',
      size: 194000, // 194KB
      type: 'application/pdf',
      url: 'mock-url-6'
    },
    {
      id: '7',
      name: 'archivo_con_nombre_extremadamente_largo_que_deberia_truncarse_apropiadamente.png',
      size: 3200000, // 3.2MB
      type: 'image/png',
      url: 'mock-url-7'
    },
    {
      id: '8',
      name: 'documento_excel_con_datos_financieros.xlsx',
      size: 256000, // 256KB
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      url: 'mock-url-8'
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

  // Métodos para aceptar y rechazar comprobantes (rol cliente)
  aceptarComprobante(id: number) {
    const comprobante = this.comprobantes.find(c => c.id === id);
    if (comprobante && comprobante.estado === 'NUEVO') {
      comprobante.estado = 'ACEPTADO';
      console.log('Comprobante aceptado:', id);
    }
  }

  rechazarComprobante(id: number) {
    const comprobante = this.comprobantes.find(c => c.id === id);
    if (comprobante && comprobante.estado === 'NUEVO') {
      comprobante.estado = 'RECHAZADO';
      console.log('Comprobante rechazado:', id);
    }
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
    // Inicializar con lista vacía para que el usuario pueda agregar archivos reales
    this.archivosPreview = [];
    console.log('Modal abierto, lista de archivos inicializada');
  }

  // Cerrar modal
  cerrarModal() {
    // Liberar URLs de archivos creadas para preview
    this.archivosPreview.forEach(archivo => {
      if (archivo.url.startsWith('blob:')) {
        URL.revokeObjectURL(archivo.url);
      }
    });
    
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
    // Validar que los campos requeridos estén completos
    if (!this.nuevoComprobante.cliente || !this.nuevoComprobante.periodo || this.nuevoComprobante.monto <= 0) {
      console.log('Datos incompletos');
      return;
    }

    // Generar nuevo ID único
    const nuevoId = Math.max(...this.comprobantes.map(c => c.id)) + 1;
    
    // Crear el nuevo comprobante
    const comprobante: Comprobante = {
      id: nuevoId,
      numero: `PAG-${String(nuevoId).padStart(4, '0')}`,
      cliente: this.nuevoComprobante.cliente,
      fecha: new Date().toISOString().split('T')[0], // Fecha actual
      periodo: this.nuevoComprobante.periodo,
      monto: this.nuevoComprobante.monto,
      estado: 'NUEVO', // Usar estado válido
      archivos: this.archivosPreview.length
    };

    // Agregar al inicio de la lista para que aparezca primero
    this.comprobantes.unshift(comprobante);
    
    console.log('Nuevo comprobante creado:', comprobante);
    console.log('Archivos adjuntos:', this.archivosPreview);
    
    // Cerrar modal
    this.cerrarModal();
  }

  // Simular carga de archivo
  onFileSelect(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      // Procesar cada archivo seleccionado
      Array.from(input.files).forEach(file => {
        // Crear un objeto de preview para cada archivo
        const archivoPreview: ArchivoPreview = {
          id: Math.random().toString(36).substr(2, 9), // ID único aleatorio
          name: file.name,
          size: file.size,
          type: file.type,
          url: URL.createObjectURL(file) // Crear URL para preview
        };
        
        // Agregar a la lista de archivos preview
        this.archivosPreview.push(archivoPreview);
      });
      
      // Limpiar el input para permitir seleccionar el mismo archivo de nuevo si es necesario
      input.value = '';
    }
  }

  // Eliminar archivo del preview
  eliminarArchivo(id: string) {
    // Encontrar el archivo para liberar su URL
    const archivo = this.archivosPreview.find(a => a.id === id);
    if (archivo && archivo.url.startsWith('blob:')) {
      URL.revokeObjectURL(archivo.url); // Liberar memoria
    }
    
    // Eliminar de la lista
    this.archivosPreview = this.archivosPreview.filter(archivo => archivo.id !== id);
    console.log('Archivo eliminado, archivos restantes:', this.archivosPreview.length);
  }

  // Agregar archivos de ejemplo para demostración
  agregarArchivosMock() {
    // Agregar archivos mockeados a la lista existente
    this.archivosMock.forEach(archivoMock => {
      // Verificar que no esté ya en la lista
      if (!this.archivosPreview.find(a => a.name === archivoMock.name)) {
        this.archivosPreview.push({
          ...archivoMock,
          id: Math.random().toString(36).substr(2, 9) // Nuevo ID único
        });
      }
    });
    console.log('Archivos mock agregados:', this.archivosPreview);
  }

  // Limpiar todos los archivos del preview
  limpiarArchivos() {
    // Liberar URLs de archivos creadas para preview
    this.archivosPreview.forEach(archivo => {
      if (archivo.url.startsWith('blob:')) {
        URL.revokeObjectURL(archivo.url);
      }
    });
    
    // Limpiar la lista
    this.archivosPreview = [];
    console.log('Todos los archivos eliminados');
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

  // Método temporal para testing - puedes removerlo después
  cambiarRol(nuevoRol: string) {
    this.rolService.setRole(nuevoRol);
  }
}

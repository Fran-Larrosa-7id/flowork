import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UtilService } from '../../services/util';

// Interface para el tipo de cliente
interface Cliente {
  id: number;
  nombre: string;
  estado: 'deudor' | 'correcto';
  cuitCuil: string;
  telefono?: string;
  email?: string;
  ultimoPago?: string;
  deuda?: number;
}

@Component({
  selector: 'app-clientes',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './clientes.html',
  styleUrl: './clientes.scss'
})
export class Clientes {
  utilService = inject(UtilService);
  formBuilder = inject(FormBuilder);

  // Signal para el término de búsqueda
  searchTerm = signal<string>('');

  // Signal para controlar el modal de crear cliente
  showCreateModal = signal<boolean>(false);

  // Signal para controlar el modal de detalles/editar cliente
  showDetailModal = signal<boolean>(false);

  // Signal para el cliente seleccionado
  selectedClient = signal<Cliente | null>(null);

  // Signal para mostrar feedback de actualización
  showUpdateFeedback = signal<boolean>(false);

  // Signal para mostrar feedback de creación
  showCreateFeedback = signal<boolean>(false);

  // FormGroup para el formulario reactivo
  clientForm!: FormGroup;

  // FormGroup para editar cliente
  editClientForm!: FormGroup;

  constructor() {
    this.initializeForm();
    this.initializeEditForm();
  }

  private initializeForm() {
    this.clientForm = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      cuitCuil: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
      estado: ['correcto', Validators.required],
      telefono: [''],
      email: ['', [Validators.email]],
      deuda: [0, [Validators.min(0)]]
    });
  }

  private initializeEditForm() {
    this.editClientForm = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      cuitCuil: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
      estado: ['correcto', Validators.required],
      telefono: [''],
      email: ['', [Validators.email]],
      deuda: [0, [Validators.min(0)]]
    });
  }

  // Lista de clientes (simulando datos del backend)
  clientes = signal<Cliente[]>([
    {
      id: 1,
      nombre: 'GRUPO FAVA',
      estado: 'deudor',
      cuitCuil: '21665626962621',
      telefono: '+54 11 1234-5678',
      email: 'contacto@grupofava.com',
      ultimoPago: '2024-12-15',
      deuda: 125000
    },
    {
      id: 2,
      nombre: 'LA ANÓNIMA',
      estado: 'correcto',
      cuitCuil: '21665626962622',
      telefono: '+54 11 8765-4321',
      email: 'admin@lanonima.com',
      ultimoPago: '2025-01-10',
      deuda: 0
    },
    {
      id: 3,
      nombre: 'CLÍNICA DE OJOS',
      estado: 'deudor',
      cuitCuil: '21665626962623',
      telefono: '+54 11 5555-1234',
      email: 'info@clinicaojos.com',
      ultimoPago: '2024-11-20',
      deuda: 87500
    },
    {
      id: 4,
      nombre: 'SUPERMERCADO CENTRAL',
      estado: 'correcto',
      cuitCuil: '21665626962624',
      telefono: '+54 11 9999-8888',
      email: 'ventas@supercentral.com',
      ultimoPago: '2025-01-15',
      deuda: 0
    },
    {
      id: 5,
      nombre: 'FARMACIA SAN JUAN',
      estado: 'correcto',
      cuitCuil: '21665626962625',
      telefono: '+54 11 7777-6666',
      email: 'farmacia@sanjuan.com',
      ultimoPago: '2025-01-12',
      deuda: 0
    },
    {
      id: 6,
      nombre: 'RESTAURANTE BELLA VISTA',
      estado: 'deudor',
      cuitCuil: '21665626962626',
      telefono: '+54 11 3333-2222',
      email: 'reservas@bellavista.com',
      ultimoPago: '2024-10-30',
      deuda: 210000
    }
  ]);

  get isMobile() {
    return this.utilService.deviceTypeComputed() !== 'desktop' && this.utilService.deviceTypeComputed() !== 'tablet';
  }

  get clientesFiltrados() {
    const search = this.searchTerm().toLowerCase();
    if (!search) return this.clientes();
    
    return this.clientes().filter(cliente => 
      cliente.nombre.toLowerCase().includes(search) ||
      cliente.cuitCuil.includes(search)
    );
  }

  get totalClientes() {
    return this.clientes().length;
  }

  get clientesDeudores() {
    return this.clientes().filter(c => c.estado === 'deudor').length;
  }

  get clientesAlDia() {
    return this.clientes().filter(c => c.estado === 'correcto').length;
  }

  get deudaTotal() {
    return this.clientes().reduce((total, cliente) => total + (cliente.deuda || 0), 0);
  }

  toggleSidebar() {
    this.utilService.setToggleSidebar(!this.utilService.toggleSidebar());
  }

  onSearchChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.searchTerm.set(target.value);
  }

  verDetalleCliente(cliente: Cliente) {
    this.selectedClient.set(cliente);
    this.showDetailModal.set(true);
    
    // Cargar los datos del cliente en el formulario de edición
    this.editClientForm.patchValue({
      nombre: cliente.nombre,
      cuitCuil: cliente.cuitCuil,
      estado: cliente.estado,
      telefono: cliente.telefono || '',
      email: cliente.email || '',
      deuda: cliente.deuda || 0
    });
  }

  contactarCliente(cliente: Cliente) {
    if (cliente.telefono) {
      const message = encodeURIComponent(`Hola ${cliente.nombre}, nos comunicamos desde Portal Biz para consultar sobre su cuenta.`);
      window.open(`https://wa.me/${cliente.telefono.replace(/[^0-9]/g, '')}?text=${message}`, '_blank');
    }
  }

  enviarEmail(cliente: Cliente) {
    if (cliente.email) {
      const subject = encodeURIComponent('Consulta sobre su cuenta - Portal Biz');
      const body = encodeURIComponent(`Estimado/a ${cliente.nombre},\n\nNos comunicamos para consultar sobre el estado de su cuenta.\n\nSaludos cordiales,\nEquipo Portal Biz`);
      window.open(`mailto:${cliente.email}?subject=${subject}&body=${body}`);
    }
  }

  // Métodos para el modal de crear cliente
  abrirModalCrearCliente() {
    this.showCreateModal.set(true);
    // Resetear formulario
    this.clientForm.reset({
      nombre: '',
      estado: 'correcto',
      cuitCuil: '',
      telefono: '',
      email: '',
      deuda: 0
    });
  }

  cerrarModalCrearCliente() {
    this.showCreateModal.set(false);
  }

  validarFormulario(): boolean {
    return this.clientForm.valid;
  }

  // Getter para acceder fácilmente a los controles del formulario
  get f() {
    return this.clientForm.controls;
  }

  // Getter para acceder fácilmente a los controles del formulario de edición
  get fe() {
    return this.editClientForm.controls;
  }

  // Métodos para el modal de detalles/editar cliente
  cerrarModalDetalleCliente() {
    this.showDetailModal.set(false);
    this.selectedClient.set(null);
  }

  validarFormularioEdicion(): boolean {
    return this.editClientForm.valid;
  }

  actualizarCliente() {
      const formValue = this.editClientForm.value;
      const clienteActualizado: Cliente = {
        ...this.selectedClient()!,
        nombre: formValue.nombre.toUpperCase(),
        estado: formValue.estado as 'deudor' | 'correcto',
        cuitCuil: formValue.cuitCuil,
        telefono: formValue.telefono || undefined,
        email: formValue.email || undefined,
        ultimoPago: formValue.estado === 'correcto' ? new Date().toISOString().split('T')[0] : this.selectedClient()!.ultimoPago,
        deuda: formValue.deuda || 0
      };

      // Actualizar el cliente en la lista
      this.clientes.update(current => 
        current.map(cliente => 
          cliente.id === clienteActualizado.id ? clienteActualizado : cliente
        )
      );

      // Cerrar modal
      this.cerrarModalDetalleCliente();

      // Mostrar feedback de actualización
      this.showUpdateFeedback.set(true);
      setTimeout(() => this.showUpdateFeedback.set(false), 3000);

      // Mostrar mensaje de éxito
      console.log('Cliente actualizado exitosamente:', clienteActualizado);
  }

  crearCliente() {
    if (this.clientForm.valid) {
      const formValue = this.clientForm.value;
      
      const nuevoCliente: Cliente = {
        id: Math.max(...this.clientes().map(c => c.id)) + 1,
        nombre: formValue.nombre.toUpperCase(),
        estado: formValue.estado as 'deudor' | 'correcto',
        cuitCuil: formValue.cuitCuil,
        telefono: formValue.telefono || undefined,
        email: formValue.email || undefined,
        ultimoPago: formValue.estado === 'correcto' ? new Date().toISOString().split('T')[0] : undefined,
        deuda: formValue.deuda || 0
      };

      // Agregar el nuevo cliente a la lista
      this.clientes.update(current => [...current, nuevoCliente]);

      // Cerrar modal
      this.cerrarModalCrearCliente();

      // Mostrar feedback de creación
      this.showCreateFeedback.set(true);
      setTimeout(() => this.showCreateFeedback.set(false), 3000);

      // Mostrar mensaje de éxito
      console.log('Cliente creado exitosamente:', nuevoCliente);
    }
  }
}

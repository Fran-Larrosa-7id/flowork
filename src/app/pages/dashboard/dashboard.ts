import { Component, OnInit, inject, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, ChartConfiguration, ChartType, registerables } from 'chart.js';
import { UtilService } from '../../services/util';
import { RolService } from '../../services/rol';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {

  // Configuración para el gráfico de Clientes (Donut)
  public clientesChartType = 'doughnut' as const;
  public clientesChartData: ChartConfiguration<'doughnut'>['data'] = {
    labels: ['Situación correcta', 'Deudores'],
    datasets: [{
      data: [60, 40],
      backgroundColor: ['#ff4757', '#8f001c'], // hover y border de la paleta
      borderWidth: 0
    }]
  };
  public clientesChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '70%',
    plugins: {
      legend: {
        display: false
      }
    }
  };

  // Configuración para el gráfico de Facturas (Donut)
  public facturasChartType = 'doughnut' as const;
  public facturasChartData: ChartConfiguration<'doughnut'>['data'] = {
    labels: ['Paga', 'Pendiente'],
    datasets: [{
      data: [70, 30],
      backgroundColor: ['#ff1f43', '#8f001c'], // main y border de la paleta
      borderWidth: 0
    }]
  };
  public facturasChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '70%',
    plugins: {
      legend: {
        display: false
      }
    }
  };

  // Configuración para el gráfico de Ingresos (Bar)
  public ingresosChartType = 'bar' as const;
  public ingresosChartData: ChartConfiguration<'bar'>['data'] = {
    labels: this.getIngresosLabels(),
    datasets: [{
      data: this.getIngresosData(),
      backgroundColor: this.getIngresosColors(),
      borderRadius: 2,
      borderSkipped: false
    }]
  };
  public ingresosChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      x: {
        display: true
      },
      y: {
        display: true
      }
    }
  };

  // Datos para mostrar
  public totalClientes = 200;
  public totalFacturas = 80;
  public deudaTotal = 120500;
  utilService = inject(UtilService);
  rolService = inject(RolService);

  // Datos específicos para rol cliente
  public saldoAPagar = 45600;
  public deudaTotalCliente = 75600;
  public nombreCliente = 'Grupo Fava';
  public cierreDelPeriodo = '10/07/2025';
  public situacionCliente = 'Deudor';
  public vencimiento = '10/07/2025';

  // Propiedades para responsive
  public isMobile = false;
  public deviceType = '';

  // Datos completos
  private labelsCompletos = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
  private dataCompleta = [900, 390, 500, 180, 500, 900, 400, 450, 300, 600, 700, 1200];
  private coloresCompletos = ['#8f001c', '#8f001c', '#ff1f43', '#8f001c', '#8f001c', '#ff4757', '#8f001c', '#8f001c', '#ff1f43', '#8f001c', '#8f001c', '#ff4757'];

  // Effect para detectar cambios de dispositivo
  deviceEffect = effect(() => {
    this.deviceType = this.utilService.deviceTypeComputed();
    this.isMobile = this.deviceType.includes('mobile');
    this.updateChartData();
  });

  ngOnInit() {
    Chart.register(...registerables);
  }

  // Métodos helper para datos responsive
  getIngresosLabels(): string[] {
    return this.isMobile ? this.labelsCompletos.slice(-6) : this.labelsCompletos;
  }

  getIngresosData(): number[] {
    return this.isMobile ? this.dataCompleta.slice(-6) : this.dataCompleta;
  }

  getIngresosColors(): string[] {
    return this.isMobile ? this.coloresCompletos.slice(-6) : this.coloresCompletos;
  }

  // Actualizar datos del gráfico cuando cambia el dispositivo
  updateChartData() {
    this.ingresosChartData = {
      labels: this.getIngresosLabels(),
      datasets: [{
        data: this.getIngresosData(),
        backgroundColor: this.getIngresosColors(),
        borderRadius: 2,
        borderSkipped: false
      }]
    };
  }

  // Método para alternar la visibilidad del sidebar
  toggleSidebar() {
    this.utilService.toggleSidebarState();
  }

  // Métodos para acciones del cliente
  descargarComprobante() {
    console.log('Descargando comprobante...');
    // Aquí iría la lógica para descargar el comprobante
  }

  verAvisoDeuda() {
    console.log('Viendo aviso de deuda...');
    // Aquí iría la lógica para ver el aviso de deuda
  }

  verUltimaFactura() {
    console.log('Viendo última factura...');
    // Aquí iría la lógica para ver la última factura
  }

  // Método temporal para testing - puedes removerlo después
  cambiarRol(nuevoRol: string) {
    this.rolService.setRole(nuevoRol);
  }
}

import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, ChartConfiguration, ChartType, registerables } from 'chart.js';
import { UtilService } from '../../services/util';

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
    // TODO: Mobile muestra solo 5 meses
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May'],
    datasets: [{
      data: [900, 390, 500, 180, 500, 900, 400, 450, 300, 600, 700, 1200],
      backgroundColor: ['#8f001c', '#8f001c', '#ff1f43', '#8f001c', '#8f001c', '#ff4757', '#8f001c', '#8f001c', '#ff1f43', '#8f001c', '#8f001c', '#ff4757'], // Usando paleta completa
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
  ngOnInit() {
    Chart.register(...registerables);
  }

  // Método para alternar la visibilidad del sidebar
  toggleSidebar() {
    this.utilService.toggleSidebarState();
  }
}

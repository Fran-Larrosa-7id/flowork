import { Component, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtilService } from '../../services/util';

@Component({
  selector: 'app-formas-de-pago',
  imports: [CommonModule],
  templateUrl: './formas-de-pago.html',
  styleUrl: './formas-de-pago.scss'
})
export class FormasDePago {
  utilService = inject(UtilService);

  // Datos bancarios
  public cbuTransferencia = '0015656546265956256';
  public aliasTransferencia = '0015656546265956256';
  public cbuDeposito = '0015656546265956256';
  public titularCuenta = 'CHRISTIAN ROIG';

  // Información de contacto
  public whatsappNumber = '+54 9 11 1234-5678';
  public emailPagos = 'pagos@empresa.com';

  // Estado para feedback visual de copiado
  public copiedStates = signal<{ [key: string]: boolean }>({});


  get isMobile() {
    return this.utilService.deviceTypeComputed() !== 'desktop' && this.utilService.deviceTypeComputed() !== 'tablet';
  }

  toggleSidebar() {
    this.utilService.setToggleSidebar(!this.utilService.toggleSidebar());
  }

  copyToClipboard(text: string, identifier: string) {
    // Prevenir múltiples clics mientras se está procesando
    if (this.copiedStates()[identifier]) {
      return;
    }
    // Método alternativo más compatible
    if (navigator.clipboard && window.isSecureContext) {
      // Usar clipboard API si está disponible y es contexto seguro
      navigator.clipboard.writeText(text).then(() => {
        this.showCopyFeedback(identifier);
      }).catch(() => {
        this.fallbackCopyToClipboard(text, identifier);
      });
    } else {
      // Usar método de fallback
      this.fallbackCopyToClipboard(text, identifier);
    }
  }

  private fallbackCopyToClipboard(text: string, identifier: string) {
    // Crear un elemento textarea temporal
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      document.execCommand('copy');
      this.showCopyFeedback(identifier);
    } catch (err) {
      console.error('Error al copiar: ', err);
      // Mostrar mensaje de error al usuario
      alert('No se pudo copiar al portapapeles. Por favor, selecciona y copia manualmente el texto.');
    } finally {
      document.body.removeChild(textArea);
    }
  }

  private showCopyFeedback(identifier: string) {
    // Mostrar feedback visual usando update() para signals
    this.copiedStates.update(current => ({
      ...current,
      [identifier]: true
    }));

    // Ocultar feedback después de 2 segundos
    setTimeout(() => {
      this.copiedStates.update(current => ({
        ...current,
        [identifier]: false
      }));
    }, 2000);
  }

  isCopied(identifier: string): boolean {
    return this.copiedStates()[identifier] || false;
  }


  contactWhatsApp() {
    const message = encodeURIComponent('Hola, necesito información sobre formas de pago');
    window.open(`https://wa.me/${this.whatsappNumber.replace(/[^0-9]/g, '')}?text=${message}`, '_blank');
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Header } from '../header/header';

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  ram?: string;
  rom?: string;
  camera?: string;
}

@Component({
  selector: 'app-principal',
  imports: [CommonModule, Header],
  templateUrl: './principal.html',
  styleUrl: './principal.css'
})
export class Principal implements OnInit, OnDestroy {

  tabs: string[] = ['Recommandé', 'Caméra', 'RAM', 'ROM'];
  selectedTab: string = 'Recommandé';

  // Contrôle d'affichage de la pop-up
  showPopup: boolean = false;
  private timer1: any;
  private timer2: any;
  private popupCount: number = 0; // Compteur d'affichages

  products: Product[] = [
    {
      id: 1,
      name: 'iPhone 14 Pro Max 256GB - kTE SARL',
      price: 650000,
      image: 'image/ktes.svg',
      ram: '6 Go',
      rom: '256 Go',
      camera: '48 MP'
    },
    {
      id: 2,
      name: 'Smartphone Ultra Caméra Pro HD',
      price: 180000,
      image: 'image/ktes.svg',
      ram: '8 Go',
      rom: '128 Go',
      camera: '108 MP'
    },
    {
      id: 3,
      name: 'Écran Tactile Interactif 86" 4K UHD',
      price: 1250000,
      image: 'image/ktes.svg',
      ram: '8 Go',
      rom: '64 Go'
    }
  ];

  ngOnInit(): void {
    // Premier affichage après 3 secondes (3 000 ms)
    this.timer1 = setTimeout(() => {
      this.triggerPopup();
    }, 3000);
  }

  ngOnDestroy(): void {
    if (this.timer1) clearTimeout(this.timer1);
    if (this.timer2) clearTimeout(this.timer2);
  }

  triggerPopup(): void {
    this.showPopup = true;
    this.popupCount++;
  }

  closePopup(): void {
    this.showPopup = false;

    // Si c'était le 1er affichage, on programme le 2e affichage pour 2 minutes plus tard (120 000 ms)
    if (this.popupCount === 1) {
      this.timer2 = setTimeout(() => {
        this.triggerPopup();
      }, 2 * 60 * 1000);
    }
  }

  get filteredProducts(): Product[] {
    if (this.selectedTab === 'Recommandé') {
      return this.products;
    }
    return this.products.filter(product => {
      if (this.selectedTab === 'Caméra') return !!product.camera;
      if (this.selectedTab === 'RAM') return !!product.ram;
      if (this.selectedTab === 'ROM') return !!product.rom;
      return true;
    });
  }

  selectTab(tab: string): void {
    this.selectedTab = tab;
  }

  orderOnWhatsApp(product: Product): void {
    const phoneNumber = '237600000000'; // Numéro WhatsApp kTE SARL
    const message = encodeURIComponent(`Bonjour kTE SARL, je souhaite commander : ${product.name} au prix de ${product.price} FCFA.`);
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  }
}
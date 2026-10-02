import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Header } from '../header/header';

export interface Product {
  id: number;
  name: string;
  price: number;
  images: string[]; // Tableau de photos pour le produit
  image?: string;   // Propriété optionnelle pour compatibilité
  ram?: string;
  rom?: string;
  camera?: string;
  description?: string;
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

  // Suivi de l'index de la photo active pour chaque produit (clé: id du produit, valeur: index de l'image)
  selectedImageIndex: { [productId: number]: number } = {};

  products: Product[] = [
    {
      id: 1,
      name: 'iPhone 14 Pro Max 256GB - kTE SARL',
      price: 650000,
      images: [
        'image/ktes.svg',
        'image/ktes-2.svg',
        'image/ktes-3.svg'
      ],
      ram: '6 Go',
      rom: '256 Go',
      camera: '48 MP'
    },
    {
      id: 2,
      name: 'Smartphone Ultra Caméra Pro HD',
      price: 180000,
      images: [
        'image/ktes.svg',
        'image/ktes-2.svg'
      ],
      ram: '8 Go',
      rom: '128 Go',
      camera: '108 MP'
    },
    {
      id: 3,
      name: 'Écran Tactile Interactif 86" 4K UHD',
      price: 1250000,
      images: [
        'image/ktes.svg'
      ],
      ram: '8 Go',
      rom: '64 Go'
    }
  ];

  ngOnInit(): void {
    // Initialiser l'index d'image sélectionnée à 0 pour chaque produit
    this.products.forEach(p => {
      this.selectedImageIndex[p.id] = 0;
    });

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

  // --- Gestion de la galerie d'images par produit ---

  // Obtenir l'image active pour un produit donné
  getActiveImage(product: Product): string {
    const images = product.images && product.images.length > 0 
      ? product.images 
      : [product.image || 'image/ktes.svg'];
    const index = this.selectedImageIndex[product.id] || 0;
    return images[index] || images[0];
  }

  // Sélectionner une image spécifique
  selectProductImage(productId: number, imageIndex: number): void {
    this.selectedImageIndex[productId] = imageIndex;
  }

  // Passer à l'image suivante
  nextProductImage(product: Product, event?: Event): void {
    if (event) event.stopPropagation(); // Évite le déclenchement d'autres événements au clic
    const total = product.images?.length || 1;
    const current = this.selectedImageIndex[product.id] || 0;
    this.selectedImageIndex[product.id] = (current + 1) % total;
  }

  // Passer à l'image précédente
  prevProductImage(product: Product, event?: Event): void {
    if (event) event.stopPropagation();
    const total = product.images?.length || 1;
    const current = this.selectedImageIndex[product.id] || 0;
    this.selectedImageIndex[product.id] = (current - 1 + total) % total;
  }

  orderOnWhatsApp(product: Product): void {
    const phoneNumber = '237600000000'; // Numéro WhatsApp kTE SARL
    const message = encodeURIComponent(`Bonjour kTE SARL, je souhaite commander : ${product.name} au prix de ${product.price} FCFA.`);
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  }
}
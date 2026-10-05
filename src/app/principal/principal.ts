import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';

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
  imports: [CommonModule, Header, Footer],
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
      name: 'Tenda',
      price: 1250000,
      images: [
        'image/kte4.jpeg',
         'image/kt4.jpeg'
      ],
      ram: '8 Go',
      rom: '64 Go'
    },


    {
      id: 2,
      name: 'HDMI 4K UHD',
      price: 10000,
      images: [
        'image/kte6.jpeg'
      ],
      ram: '8 Go',
      rom: '64 Go'
    },




     {
      id: 3,
      name: 'HIKVISION DS-2CD2043G0-I 4MP',
      price: 1250000,
      images: [
        'image/kt3.jpeg',
        'image/kt8.jpeg'
      ],
      ram: '8 Go',
      rom: '64 Go'
    },




    {
      id: 4,
      name: 'CLÉ USB 3.0 - kTE SARL',
      price: 650000,
      images: [
        'image/kte21.jpeg',
        'image/kte2111.jpeg'
      ],
      ram: '6 Go',
      rom: '256 Go',
      camera: '48 MP'
    },
    {
      id: 5,
      name: 'Chargeur iphone',
      price: 180000,
      images: [
      
      'image/kteccc.jpeg',
      'image/ktecccc.jpeg'
      

      ],
      ram: '8 Go',
      rom: '128 Go',
      camera: '108 MP'
    },
    
    

     {
      id: 6,
      name: 'caméra HIKVISION DS-2CD2043G0-I 4MP',
      price: 1250000,
      images: [
        'image/kt9.jpeg'
      ],
      ram: '8 Go',
      rom: '64 Go'
    },



     {
      id: 7,
      name: 'UNIVIEW IPC2324SB-DZK-G 2MP',
      price: 1250000,
      images: [
        'image/kte10.jpeg'
      ],
      ram: '8 Go',
      rom: '64 Go'
    },





     {
      id: 8,
      name: 'CAMERA HIKVISION DS-2CD2043G0-I 4MP',
      price: 1250000,
      images: [
        'image/kte11.jpeg'
      ],
      ram: '8 Go',
      rom: '64 Go'
    },
    
    
    
    
    
    {
      id: 9,
      name: 'POWER BANK araima 20000 mAh',
      price: 6000,
      images: [
        'image/kte23.jpeg',
        'image/kte24.jpeg'
      ],
      ram: '8 Go',
      rom: '64 Go'
    },




     {
      id: 10,
      name: 'Chargeur iphone ',
      price: 2500,
      images: [
        'image/kte27.jpeg',
        'image/kte277.jpeg'
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
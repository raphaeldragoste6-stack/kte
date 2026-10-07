import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header';
import { Footer } from '../footer/footer';

export interface Product {
  id: number;
  name: string;
  price: number;
  images: string[];
  image?: string;
  ram?: string;
  rom?: string;
  camera?: string;
  description?: string;
}

export interface CatalogItem {
  id: number;
  name: string;
  category: string; // Ex: 'RAM', 'ROM', 'Routeur', 'Modem', 'Clé USB'
  price: number;
  description?: string;
  images: string[];
}

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [CommonModule, HeaderComponent, Footer],
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
  private popupCount: number = 0;

  // Suivi de l'index de la photo active pour chaque produit
  selectedImageIndex: { [productId: number]: number } = {};

  // --- VARIABLES POUR LA MODALE CATALOGUE ---
  isCatalogOpen: boolean = false;
  selectedCategory: string = '';
  catalogItems: CatalogItem[] = [];
  activeImageIndex: { [itemId: number]: number } = {};

  // BASE DE DONNÉES DU CATALOGUE PAR CARACTÉRISTIQUE
  allCatalogData: CatalogItem[] = [
    {
      id: 101,
      name: 'Routeur Tenda 5GHz Extérieur',
      category: 'Routeur',
      price: 1250000,
      description: 'Antenne longue portée idéal pour zones à faible signal.',
      images: ['image/kte4.jpeg', 'image/kt4.jpeg']
    },
    {
      id: 102,
      name: 'Routeur TP-Link Archer AC1200',
      category: 'Routeur',
      price: 45000,
      description: 'Double bande 2.4GHz et 5GHz.',
      images: ['image/kterout.jpeg']
    },
    {
      id: 201,
      name: 'Modem Camtel 4G LTE Wi-Fi',
      category: 'Modem',
      price: 35000,
      description: 'Modem fixe/mobile compatible SIM 4G.',
      images: ['image/kterout.jpeg']
    },
    {
      id: 301,
      name: 'Clé USB 3.0 Kingston 64 Go',
      category: 'Clé USB',
      price: 7500,
      description: 'Haute vitesse de transfert USB 3.0.',
      images: ['image/kte21.jpeg', 'image/kte2111.jpeg']
    },
    {
      id: 401,
      name: 'Barrette RAM Laptop DDR4 8 Go',
      category: 'RAM',
      price: 18000,
      description: 'Mémoire vive pour PC portable 3200MHz.',
      images: ['image/kte6.jpeg']
    },
    {
      id: 501,
      name: 'Disque SSD NVMe 512 Go',
      category: 'ROM',
      price: 28000,
      description: 'Stockage rapide M.2 pour ordinateur.',
      images: ['image/kte6.jpeg']
    }
  ];

  products: Product[] = [
    {
      id: 1,
      name: 'Tenda',
      price: 1250000,
      images: ['image/kte4.jpeg', 'image/kt4.jpeg'],
      ram: '8 Go',
      rom: '64 Go'
    },
    {
      id: 2,
      name: 'HDMI 4K UHD',
      price: 10000,
      images: ['image/kte6.jpeg'],
      ram: '8 Go',
      rom: '64 Go'
    },
    {
      id: 3,
      name: 'HIKVISION DS-2CD2043G0-I 4MP',
      price: 1250000,
      images: ['image/kt3.jpeg', 'image/kt8.jpeg'],
      ram: '8 Go',
      rom: '64 Go'
    },
    {
      id: 4,
      name: 'CLÉ USB 3.0 - kTE SARL',
      price: 650000,
      images: ['image/kte21.jpeg', 'image/kte2111.jpeg'],
      ram: '6 Go',
      rom: '256 Go',
      camera: '48 MP'
    },
    {
      id: 5,
      name: 'Chargeur iphone',
      price: 180000,
      images: ['image/kteccc.jpeg', 'image/ktecccc.jpeg'],
      ram: '8 Go',
      rom: '128 Go',
      camera: '108 MP'
    },
    {
      id: 6,
      name: 'caméra HIKVISION DS-2CD2043G0-I 4MP',
      price: 1250000,
      images: ['image/kt9.jpeg'],
      ram: '8 Go',
      rom: '64 Go'
    },
    {
      id: 7,
      name: 'UNIVIEW IPC2324SB-DZK-G 2MP',
      price: 1250000,
      images: ['image/kte10.jpeg'],
      ram: '8 Go',
      rom: '64 Go'
    },
    {
      id: 8,
      name: 'CAMERA HIKVISION DS-2CD2043G0-I 4MP',
      price: 1250000,
      images: ['image/kte11.jpeg'],
      ram: '8 Go',
      rom: '64 Go'
    },
    {
      id: 9,
      name: 'POWER BANK araima 20000 mAh',
      price: 6000,
      images: ['image/kte23.jpeg', 'image/kte24.jpeg'],
      ram: '8 Go',
      rom: '64 Go'
    },
    {
      id: 10,
      name: 'Chargeur iphone',
      price: 2500,
      images: ['image/kte27.jpeg', 'image/kte277.jpeg'],
      ram: '8 Go',
      rom: '64 Go'
    },
    {
      id: 11,
      name: 'Chargeur iphone',
      price: 2500,
      images: ['image/kterout.jpeg'],
      ram: '8 Go',
      rom: '64 Go'
    }
  ];

  ngOnInit(): void {
    this.products.forEach(p => {
      this.selectedImageIndex[p.id] = 0;
    });

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

    if (this.popupCount === 1) {
      this.timer2 = setTimeout(() => {
        this.triggerPopup();
      }, 2 * 60 * 1000);
    }
  }

  // --- GESTION DE LA MODALE CATALOGUE ---

  openCatalogForCategory(category: string): void {
    this.selectedCategory = category;
    // Filtrer selon la catégorie sélectionnée
    this.catalogItems = this.allCatalogData.filter(item => item.category === category);
    this.isCatalogOpen = true;
  }

  closeCatalog(): void {
    this.isCatalogOpen = false;
  }

  setImage(itemId: number, index: number): void {
    this.activeImageIndex[itemId] = index;
  }

  encodeText(text: string): string {
    return encodeURIComponent(text);
  }

  // --- FIN GESTION CATALOGUE ---

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

  getActiveImage(product: Product): string {
    const images = product.images && product.images.length > 0 
      ? product.images 
      : [product.image || 'image/ktes.svg'];
    const index = this.selectedImageIndex[product.id] || 0;
    return images[index] || images[0];
  }

  selectProductImage(productId: number, imageIndex: number): void {
    this.selectedImageIndex[productId] = imageIndex;
  }

  nextProductImage(product: Product, event?: Event): void {
    if (event) event.stopPropagation();
    const total = product.images?.length || 1;
    const current = this.selectedImageIndex[product.id] || 0;
    this.selectedImageIndex[product.id] = (current + 1) % total;
  }

  prevProductImage(product: Product, event?: Event): void {
    if (event) event.stopPropagation();
    const total = product.images?.length || 1;
    const current = this.selectedImageIndex[product.id] || 0;
    this.selectedImageIndex[product.id] = (current - 1 + total) % total;
  }

  orderOnWhatsApp(product: Product): void {
    const phoneNumber = '237656727787';
    const message = encodeURIComponent(`Bonjour kTE SARL, je souhaite commander : ${product.name} au prix de ${product.price} FCFA.`);
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  }
}
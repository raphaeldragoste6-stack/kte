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

  // Recherche en temps réel
  searchQuery: string = '';

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
      images: ['image/kttttt.jpeg']
    },
    {
      id: 201,
      name: 'Modem Camtel 4G LTE Wi-Fi',
      category: 'Modem',
      price: 35000,
      description: 'Modem fixe/mobile compatible SIM 4G.',
      images: ['image/kttt.jpeg']
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
      name: 'Barrette ROM Laptop DDR4 8 Go',
      category: 'ROM',
      price: 18000,
      description: 'Mémoire pour PC portable 3200MHz.',
      images: ['image/kte2.jpeg']
    },
    {
      id: 501,
      name: 'Barrette ROM Desktop DDR4 16 Tb',
      category: 'ROM',
      price: 38000,
      description: 'Stockage rapide M.2 pour ordinateur.',
      images: ['image/im.jpeg']
    },
    {
      id: 601,
      name: 'carte RAM',
      category: 'RAM',
      price: 12500,
      description: 'Mémoire vive pour ordinateur portable ou de bureau.',
      images: ['image/ku.jpeg']
    }
  ];

  products: Product[] = [
    {
      id: 1,
      name: 'Tenda',
      price: 1250000,
      images: ['image/kte4.jpeg', 'image/kt4.jpeg'],
    },
    {
      id: 2,
      name: 'HDMI 4K UHD',
      price: 10000,
      images: ['image/kte6.jpeg'],
    },
    {
      id: 3,
      name: 'HIKVISION DS-2CD2043G0-I 4MP',
      price: 1250000,
      images: ['image/kt3.jpeg', 'image/kt8.jpeg'],
    },
    {
      id: 4,
      name: 'CLÉ USB 3.0 - kTE SARL',
      price: 650000,
      images: ['image/kte21.jpeg', 'image/kte2111.jpeg'],
    },
    {
      id: 5,
      name: 'Cordon iphone',
      price: 500,
      images: ['image/kteccc.jpeg', 'image/ktecccc.jpeg'],
    },
    {
      id: 6,
      name: 'caméra HIKVISION DS-2CD2043G0-I 4MP',
      price: 1250000,
      images: ['image/kt9.jpeg'],
      camera: '4MP'
    },
    {
      id: 7,
      name: 'UNIVIEW IPC2324SB-DZK-G 2MP',
      price: 1250000,
      images: ['image/kte10.jpeg'],
    },
    {
      id: 8,
      name: 'CAMERA HIKVISION DS-2CD2043G0-I 4MP',
      price: 125000,
      images: ['image/kte11.jpeg'],
      camera: '4MP'
    },
    {
      id: 9,
      name: 'POWER BANK araima 20000 mAh',
      price: 6000,
      images: ['image/kte23.jpeg', 'image/kte24.jpeg'],
    },
    {
      id: 10,
      name: 'carte ROM',
      price: 13500,
      images: ['image/kuu.jpeg'],
      rom: '25 Go',
    },
    {
      id: 11,
      name: 'Disck dur externe',
      price: 22500,
      images: ['image/im.jpeg'],
      rom: '16 Tb'
    },
    {
      id: 12,
      name: 'routeur',
      price: 8500,
      images: ['image/kttt.jpeg'],
    },
    {
      id: 13,
      name: 'Routeur Asus',
      price: 8500,
      images: ['image/ktttt.jpeg'],
    },
    {
      id: 14,
      name: 'Routeur lik',
      price: 8500,
      images: ['image/kttttt.jpeg'],
    },
    {
      id: 15,
      name: 'Monitoring',
      price: 8500,
      images: ['image/ktttttt.jpeg'],
    },
    {
      id: 16,
      name: 'Telecommande universelle',
      price: 6500,
      images: ['image/kte20.jpeg'],
    },
    {
      id: 17,
      name: 'Disck dur externe',
      price: 18500,
      images: ['image/kte2.jpeg'],
      rom: '10 Tb'
    },
    {
      id: 18,
      name: 'Chargeur machine',
      price: 8500,
      images: ['image/kte231.jpeg'],
    },
    {
      id: 19,
      name: 'Switch PoE D-Link 6 Ports',
      price: 32500,
      images: ['image/kiiii.jpeg'],
    },
    {
      id: 20,
      name: 'Caméra Dôme PTZ Hikvision',
      price: 42500,
      images: ['image/kii.jpeg'],
      camera: '4MP'
    },
    {
      id: 21,
      name: "Point d'accès Wi-Fi Extérieur",
      price: 22500,
      images: ['image/ki.jpeg'],
    },
    {
      id: 22,
      name: 'Câble Convertisseur USB',
      price: 2500,
      images: ['image/kilo.jpeg'],
    },
    {
      id: 23,
      name: 'Routeur sans fil Wi-Fi (Wireless Router).',
      price: 25000,
      images: ['image/poo.jpeg'],
    },
    {
      id: 25,
      name: 'Convertisseur / Onduleur de Tension RAGGIE',
      price: 6500,
      images: ['image/kilol.jpg'],
    },
    {
      id: 26,
      name: 'power extener',
      price: 10500,
      images: ['image/kiiil.jpeg'],
    },
    {
      id: 27,
      name: 'carte ROM',
      price: 12500,
      images: ['image/ku.jpeg'],
      ram: '16 Go',
    },
    {
      id: 28,
      name: 'Chargeur iphone',
      price: 2500,
      images: ['image/kte27.jpeg', 'image/kte277.jpeg'],
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

  // --- GESTION DE LA RECHERCHE ---

  onSearchQueryChange(query: string): void {
    this.searchQuery = query.trim().toLowerCase();
  }

  // --- GESTION DE LA MODALE CATALOGUE ---

  openCatalogForCategory(category: string): void {
    this.selectedCategory = category;
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

  // --- GETTER DE FILTRAGE PRODUITS ---

  get filteredProducts(): Product[] {
    return this.products.filter(product => {
      // 1. Filtrage par onglet sélectionné
      let matchesTab = true;
      if (this.selectedTab === 'Caméra') matchesTab = !!product.camera;
      else if (this.selectedTab === 'RAM') matchesTab = !!product.ram;
      else if (this.selectedTab === 'ROM') matchesTab = !!product.rom;

      // 2. Filtrage par mot-clé de recherche
      let matchesSearch = true;
      if (this.searchQuery) {
        const nameMatch = product.name.toLowerCase().includes(this.searchQuery);
        const ramMatch = product.ram?.toLowerCase().includes(this.searchQuery) ?? false;
        const romMatch = product.rom?.toLowerCase().includes(this.searchQuery) ?? false;
        const cameraMatch = product.camera?.toLowerCase().includes(this.searchQuery) ?? false;

        matchesSearch = nameMatch || ramMatch || romMatch || cameraMatch;
      }

      return matchesTab && matchesSearch;
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

  // --- COMMANDES WHATSAPP ---

  orderOnWhatsApp(product: Product): void {
    if (!product) return;
    const phoneNumber = '237656727787';
    const text = `Bonjour kTE SARL, je souhaite commander : ${product.name} au prix de ${product.price} FCFA.`;
    const encodedText = encodeURIComponent(text);

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const targetUrl = isMobile
      ? `https://wa.me/${phoneNumber}?text=${encodedText}`
      : `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodedText}`;

    window.open(targetUrl, '_blank', 'noopener,noreferrer');
  }

  orderCatalogOnWhatsApp(item: CatalogItem): void {
    if (!item) return;
    const phoneNumber = '237656727787';
    const text = `Bonjour kTE SARL, je souhaite commander : ${item.name} au prix de ${item.price} FCFA.`;
    const encodedText = encodeURIComponent(text);

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const targetUrl = isMobile
      ? `https://wa.me/${phoneNumber}?text=${encodedText}`
      : `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodedText}`;

    window.open(targetUrl, '_blank', 'noopener,noreferrer');
  }
}
import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';




@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class HeaderComponent {
 @Output() categorySelected = new EventEmitter<string>();

  isMenuOpen: boolean = false;
  isSubMenuOpen: boolean = false;
  isContactMenuOpen: boolean = false; // Gestion du sous-menu Contact

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
    if (!this.isMenuOpen) {
      this.isSubMenuOpen = false;
      this.isContactMenuOpen = false;
    }
  }

  toggleSubMenu(): void {
    this.isSubMenuOpen = !this.isSubMenuOpen;
  }

  toggleContactMenu(): void {
    this.isContactMenuOpen = !this.isContactMenuOpen;
  }

  selectCategory(category: string): void {
    this.categorySelected.emit(category);
    this.closeMenu();
  }

  closeMenu(): void {
    this.isMenuOpen = false;
    this.isSubMenuOpen = false;
    this.isContactMenuOpen = false;
  }
  
}
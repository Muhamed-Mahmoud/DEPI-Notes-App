import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  navBar: HTMLElement | null = null;
  collapse: HTMLElement | null = null;

  ngOnInit(): void {
    this.navBar = document.querySelector(".navlost");
    this.collapse = document.querySelector(".collapse");
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    // Get the height of the viewport
    const viewportHeight = window.innerHeight;

    // Check if elements exist
    if (!this.navBar) return;

    // Check scroll position
    if (window.scrollY >= viewportHeight) {
      this.navBar.classList.add("fixed-top");
    } else {
      this.navBar.classList.remove("fixed-top");
    }
  }
}
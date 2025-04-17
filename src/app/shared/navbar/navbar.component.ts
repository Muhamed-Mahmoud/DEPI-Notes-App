import { Component, ElementRef, HostListener, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, AfterViewInit {
  @ViewChild('navbar') navBarRef!: ElementRef;

  showLogoutPopup: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        setTimeout(() => this.checkScroll(), 100); // wait till DOM rendered
      }
    });
  }

  ngAfterViewInit(): void {
    this.checkScroll(); // initial check
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.checkScroll();
  }

  checkScroll() {
    const nav = this.navBarRef?.nativeElement;
    const viewportHeight = window.innerHeight;

    if (nav) {
      if (window.scrollY >= viewportHeight) {
        nav.classList.add("fixed-top");
      } else {
        nav.classList.remove("fixed-top");
      }
    }
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/auth/login']);
  }
}

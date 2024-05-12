import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent {
isScrolled: boolean = false;

    @HostListener('window:scroll', [])
    onWindowScroll() {
      this.isScrolled = window.scrollY > 10;
    }

    toggleNavContent(event: MouseEvent) {
      const target = event.target as HTMLElement;
      const navMenuDiv = document.getElementById('nav-content');
      const navMenu = document.getElementById('nav-toggle');

      if (!this.checkParent(target, navMenuDiv!)) {
        if (this.checkParent(target, navMenu!)) {
          navMenuDiv!.classList.toggle('hidden');
        } else {
          navMenuDiv!.classList.add('hidden');
        }
      }
    }

    private checkParent(target: HTMLElement, elm: HTMLElement): boolean {
      while (target.parentNode) {
        if (target === elm) {
          return true;
        }
        target = target.parentNode as HTMLElement;
      }
      return false;
    }
}

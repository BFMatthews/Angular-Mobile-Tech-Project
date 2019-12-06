import { Component } from '@angular/core';

@Component({
    selector: 'my-app-pages-general-about',
    templateUrl: './about.component.html',
    styleUrls: [ './about.component.css' ],
})
export class AboutComponent {
    private widthOfWindow;

    constructor() {
      this.widthOfWindow = window.screen.width;
    }

    onResize(event) {
      this.widthOfWindow = event.target.innerWidth;
    }
}
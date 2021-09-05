import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page404',
  templateUrl: './page404.component.html',
  styles: [
    `
      @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
      .page404 {
        text-align: center;
        min-height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      h1 {
        font-family: 'Press Start 2P' !important;
        font-size: 20vw;
        margin-top: 1em;
        color: #ccc;
        text-shadow: 2px 2px #a9a9a9;
      }
    `,
  ],
})
export class Page404Component {
  constructor(private router: Router) {}
  goHome() {
    this.router.navigateByUrl('/validate');
  }
}

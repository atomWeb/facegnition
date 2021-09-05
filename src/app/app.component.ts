import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ThemePalette } from '@angular/material/core';
import { SpinnerService } from './services/spinner.service';
import { Hub } from 'aws-amplify';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  loading$ = this.loader.loading$;
  color: ThemePalette = 'accent';

  constructor(
    public loader: SpinnerService,
    private authService: AuthService,
    private router: Router
  ) {
    Hub.listen('auth', (data) => {
      const { payload } = data;
      this.authService.onAuthEvent(payload);
      this.router.navigateByUrl('/validate');
    });
  }
}

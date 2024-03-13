import { Component, OnInit } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'top-navbar',
  standalone: true,
  imports: [
    MatToolbarModule, 
    FormsModule, 
    MatButtonModule, 
    MatIconModule, 
    RouterModule, 
    MatSelectModule, 
    MatFormFieldModule, 
    MatInputModule, 
    TranslateModule
  ],
  providers: [AuthService],
  templateUrl: './top-navbar.component.html',
  styleUrl: './top-navbar.component.scss'
})
export class TopNavbarComponent implements OnInit {
  language = 'es';
  langs:any = [];

  constructor(
    private authService: AuthService,
    public translate: TranslateService
  ) {
    this.translate.setDefaultLang('es');
    this.translate.use(this.language);
  }

  ngOnInit(){
    this.getTransLanguage();
  }

  getTransLanguage(){
    this.langs = [...this.translate.getLangs()];
  }

  setTransLanguage(){
    this.translate.use(this.language);
  }

  logout(): void {
    this.authService.logout();
  }
}

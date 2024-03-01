import { Component } from '@angular/core';
import { TopNavbarComponent } from '../top-navbar/top-navbar.component';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { LeftSidebarComponent } from '../left-sidebar/left-sidebar.component';

@Component({
  selector: 'app-basic-layout',
  standalone: true,
  imports: [TopNavbarComponent, RouterOutlet, FooterComponent, LeftSidebarComponent],
  templateUrl: './basic-layout.component.html',
  styleUrl: './basic-layout.component.scss'
})
export class BasicLayoutComponent {

}

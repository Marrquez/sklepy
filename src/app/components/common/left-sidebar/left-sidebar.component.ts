import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'left-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './left-sidebar.component.html',
  styleUrl: './left-sidebar.component.scss'
})
export class LeftSidebarComponent {
  constructor(private _router: Router){}

  navigateTo(url:string):void {
    this._router.navigate([url]);
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  items: MenuItem[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.items = [
      {
        label: 'Control Charts',
        icon: 'pi pi-fw pi-chart-bar',
        routerLink: '/control-charts'
      },
      {
        label: 'Add Control Chart',
        icon: 'pi pi-fw pi-plus',
        items: [
          {
            label: 'Variable',
            items: [
              { label: 'X-bar', command: () => this.router.navigate(['/add-variable-control-chart/x-bar']) },
              { label: 'Range', command: () => this.router.navigate(['/add-variable-control-chart/range']) },
              { label: 'Standard Deviation', command: () => this.router.navigate(['/add-variable-control-chart/standard-deviation']) }
            ]
          },
        ]
      }
    ];
  }
}

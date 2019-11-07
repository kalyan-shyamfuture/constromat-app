import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

import { IonRouterOutlet } from '@ionic/angular';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public routerDatas: any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public ionRouterOutlet: IonRouterOutlet
  ) {
    router.events.subscribe(changeEvent => {
      if (changeEvent instanceof NavigationEnd) {
        this.routerDatas = route.snapshot.data;
      }
    });
  }

  ngOnInit() {}

  goBack() {
    this.ionRouterOutlet.pop();
  }
}

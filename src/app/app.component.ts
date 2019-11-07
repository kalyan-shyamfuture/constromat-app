import { Component, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';

import { Events, MenuController, Platform, ToastController, IonRouterOutlet } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { Storage } from '@ionic/storage';
import { AlertController } from '@ionic/angular';
// RxJs
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
// Services
import { AuthService } from './core/services';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  animations: [
    trigger('expandCollapse', [
      state('open', style({
        height: '*',
        margin: '*',
        padding: '*',
        visibility: 'visible',
        opacity: '1'
      })),
      state('close', style({
        height: '0px',
        margin: '0px',
        padding: '0px',
        visibility: 'hidden',
        opacity: '0'
      })),
      transition('open <=> close', animate(200))
    ])
  ]
})
export class AppComponent implements AfterViewInit, OnDestroy {
  private onDestroyUnSubscribe = new Subject<void>();
  @ViewChild(IonRouterOutlet, { static: false }) routerOutlet: IonRouterOutlet;
  public loggedIn = true;
  public appMenus = [
    {
      sectionName: 'ACCOUNT',
      showAfterLogin: false,
      sectionItems: [
        {
          title: 'Login',
          url: '/login',
          icon: 'log-in'
        },
        {
          title: 'Register',
          url: '/register',
          icon: 'person-add'
        },
      ]
    },
    {
      sectionName: 'MENUS',
      showAfterLogin: true,
      sectionItems: [
        {
          title: 'Home',
          url: '/user-tab/home',
          icon: 'home'
        },
        {
          title: 'Product',
          url: '/user-tab/product',
          icon: 'notifications'
        },
        {
          title: 'Menu',
          url: '/user/menu',
          icon: 'menu',
          state: 'close',
          subMenus: [
            {
              title: 'Sub Menu 1',
              url: '/user/notification',
              icon: 'notifications'
            },
            {
              title: 'Sub Menu 2',
              url: '/user/notification',
              icon: 'notifications',
              state: 'close',
              subSubMenus: [
                {
                  title: 'Sub Sub Menu 1',
                  url: '/user/notification',
                  icon: 'notifications'
                },
                {
                  title: 'Sub Sub Menu 2',
                  url: '/user/notification',
                  icon: 'notifications'
                },
              ]
            },
          ]
        },
        {
          title: 'Profile',
          url: '/user/profile',
          icon: 'person'
        }
      ]
    },
    {
      sectionName: 'ACCOUNT',
      showAfterLogin: true,
      sectionItems: [
        {
          title: 'Profile',
          url: '/profile',
          icon: 'person'
        }
      ]
    },
  ];
  public dark = false;
  public backSubscription: Subscription;
  public userData: any;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage: Storage,
    private router: Router,
    public alertController: AlertController,
    public authService: AuthService,
  ) {
    this.initializeApp();
    router.events.subscribe(val => {
      if (val instanceof NavigationEnd) {
        this.authService.isUserLoggedIn().then(userData => {
          if (userData && Object.keys(userData).length) {
            this.userData = userData;
            this.userData.isLoggedIn = true;
            this.loggedIn = true;
            // return userDataGot;
          } else {
            this.userData = userData;
            this.loggedIn = false;
          }
        });
        // console.log(this.userData);
      }
    });
  }

  ngAfterViewInit() {
    this.backbuttonInitializer();
  }

  ionDidClose() {
    this.appMenus.map(item => {
      // this.closeAllCollapsibles(item);
    });
  }

  // closeAllCollapsibles(item) {
  //   if (condition) {
  //     item['state'] = 'close';
  //   } else {
  //     item['state'] = 'close';
  //   }
  // }

  ngOnDestroy() {
    // UnSubscribe Subscriptions
    this.onDestroyUnSubscribe.next();
    this.onDestroyUnSubscribe.complete();
    this.backSubscription.unsubscribe();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.storage.get('darkMode').then(darkModeValue => {
        this.dark = darkModeValue;
        this.setStatusBarStyle();
      });
      this.splashScreen.hide();
    });
  }
  private setStatusBarStyle() {
    if (this.dark) {
      this.statusBar.styleLightContent();
      this.statusBar.backgroundColorByHexString('#000000');
    } else {
      this.statusBar.styleDefault();
      this.statusBar.backgroundColorByHexString('#ffffff');
    }
  }

  private backbuttonInitializer() {
    // this.platform.backButton
    // .pipe(takeUntil(this.onDestroyUnSubscribe))
    // .subscribe(() => {
    this.backSubscription = this.platform.backButton
    .subscribeWithPriority(0, () => {
      if (this.router.url === '/login' || this.router.url === '/dashboard') {
        this.presentAlertConfirm();
      } else if (this.routerOutlet && this.routerOutlet.canGoBack()) {
        this.routerOutlet.pop();
      }  else {
        this.presentAlertConfirm();
      }
    });
  }
  async presentAlertConfirm() {
    console.log('presentAlertConfirm');
    const alert = await this.alertController.create({
      header: 'Exit',
      message: 'Do you want to exit the app?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Exit',
          handler: () => {
            navigator['app'].exitApp();
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }
  toggleTheme() {
    this.dark = !this.dark;
    this.storage.set('darkMode', this.dark);
    this.setStatusBarStyle();
  }
  expandClose(event, navItem) {
    navItem.state = (navItem.state === 'open') ? 'close' : 'open';
  }
  logout() {
    this.storage.remove('userData');
    // this.routerOutlet.pop();
    this.router.navigate(['/login']);
  }
}

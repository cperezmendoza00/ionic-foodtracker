import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { InicioPage } from '../pages/inicio/inicio';
import { ModalPage } from '../pages/modal/modal';
import { RecetaPage } from '../pages/receta/receta';
import { AlimentosPage } from '../pages/alimentos/alimentos';
import { ConfiguracionesPage } from '../pages/configuraciones/configuraciones';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    this.pages = [
      { title: 'Alimentación', component: HomePage },
      { title: 'Mostar / ocultar alimentos', component: AlimentosPage },
      { title: 'Tus Macros', component: InicioPage },
      { title: 'Ajustes', component: ConfiguracionesPage },
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}

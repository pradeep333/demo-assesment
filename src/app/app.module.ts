import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { HttpClientModule } from '@angular/common/http';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FoodsService } from '../pages/home/services/foods.service';
import {FoodDetails} from '../pages/foodDetails/foodDetails';
import { Favs } from '../pages/favs/favs';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    FoodDetails,
    Favs
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    FoodDetails,
    Favs
  ],
  providers: [
    StatusBar,
    SplashScreen,
    FoodsService,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }

import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FoodsService } from '../home/services/foods.service'
import { LoadingController } from 'ionic-angular';
import { FoodDetails } from '../foodDetails/foodDetails';

@Component({
  selector: 'fav-foods',
  templateUrl: 'favs.html'
})
export class Favs {
  favFoods: any[];
  items: Array<{ title: string, note: string, icon: string }>;

  constructor(public navCtrl: NavController,
    public navParams: NavParams, private _foodSvc: FoodsService) {
    this.favFoods = this._foodSvc.getAllFavFoods();
    console.log(this.favFoods);
  }
  getItemDetails(item: any) {
    this.navCtrl.push(FoodDetails, {
      item
    });
  }
}

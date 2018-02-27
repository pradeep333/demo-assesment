import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FoodsService } from '../home/services/foods.service'
import { LoadingController } from 'ionic-angular';

@Component({
  selector: 'food-details-list',
  templateUrl: 'foodDetails.html'
})
export class FoodDetails {
  selectedItemName: string;
  isInFavs:boolean = this.isInFavFoods;
  nutrients: any[];
  items: Array<{ title: string, note: string, icon: string }>;

  constructor(public navCtrl: NavController, private loadingCtrl: LoadingController,
    public navParams: NavParams, private _foodSvc: FoodsService) {
    this.selectedItemName = this.navParams.get('item').name;
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this._foodSvc.getFoodDetails(this.navParams.get('item').id).subscribe(data => {
      loading.dismiss();
      this.nutrients = data.report.food.nutrients
    })
  }
  addToFavs(){
    this.isInFavs = true;
    this._foodSvc.addToFavFoods(this.navParams.get('item'));
  }
  get isInFavFoods(){
    return this._foodSvc.isInFavFoods(this.navParams.get('item'));
  }
}

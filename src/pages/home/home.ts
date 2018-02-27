import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FoodsService } from './services/foods.service';
import { FoodDetails } from '../foodDetails/foodDetails';
import { LoadingController } from 'ionic-angular';

interface IItem {
  id: number;
  offset: number;
  name: string;
}

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  searchQuery: string = '';
  items: Array<IItem>
  filteredItems: Array<IItem> = [];

  constructor(public navCtrl: NavController, private _foodSvc: FoodsService, private loadingCtrl: LoadingController) {
    this.initializeItems();
  }

  initializeItems() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this._foodSvc.getAllFoods().subscribe(data => {
      loading.dismiss();
      this.items = data.list.item;
      this.filteredItems = this.items;
    })
  }
  getItems(ev: any) {
    let val = ev.target.value;
    if (val && val.trim() != '') {
      this.filteredItems = this.items.filter((item) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }
  getItemDetails(item: IItem) {

    this.navCtrl.push(FoodDetails, {
     item
    });
  }
}



import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { AppConstants } from '../../../app/appConstants';
interface IFoodlist {
  item: Array<IFoodItems>;
}
interface IFoodItems {
  offset: number;
  id: number;
  name: string
}
interface IFoods {
  list: IFoodlist
}
interface INutrients {
  name: string;
  unit: string;
  value: string;
}
interface IFood {
  nutrients: Array<INutrients>
}
interface IFoodReport {
  food: IFood;
}

interface IFoodDetails {
  report: IFoodReport
}

@Injectable()
export class FoodsService {
  private _favFoodItems: any = [];
  constructor(private _http: HttpClient) {
  }
  getAllFoods(): Observable<IFoods> {
    return this._http.get<IFoods>(`${AppConstants.api_endPoint}/list`, {
      params: { format: 'json', lt: 'f', api_key: AppConstants.api_key }
    }).catch(this.handleError);
  }
  handleError(err: HttpErrorResponse) {
    return Observable.throw(err.message);
  }
  getFoodDetails(id: number): Observable<IFoodDetails> {
    return this._http.get<IFoodDetails>(`${AppConstants.api_endPoint}/reports`, {
      params: { ndbno: `${id}`, format: 'json', type: 'b', api_key: AppConstants.api_key }

    }).catch(this.handleError);

  }
  addToFavFoods(item: any) {
    this._favFoodItems.push(item);
  }
  removeFromFavFoods(food: any) {
    this._favFoodItems = this._favFoodItems.filter(item => item.id !== food.id);
  }
  isInFavFoods(food: any) {
    return this._favFoodItems.filter(item => item.id === food.id).length > 0;
  }
  getAllFavFoods(){
    return this._favFoodItems;
  }
}

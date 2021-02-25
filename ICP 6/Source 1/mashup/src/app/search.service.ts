import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  id_edamam: string;
  key_edamam: string;
  id_fourSquare: string;
  secret_fourSquare: string;

  constructor(private _http: HttpClient) { 
    this.id_edamam = '1a4efb4f';
    this.key_edamam = '984f40b8e85dddd48ffb853e8cd41dae';
    this.id_fourSquare = 'UUB0BWUFV41NO0AKYKTSQYMI5X5Q42OSVQMKZ325EIWAYZWS';
    this.secret_fourSquare = 'OASWJGPK00M1KVJL3TZF0IHWLTUGEVMPKBMCKQV22ZODZALH';
   }

  getRecipe(value) {
    return this._http.get('https://api.edamam.com/search?q=' +
      value + 
      '&app_id='+this.id_edamam+'&app_key='+this.key_edamam+'&from=0&to=5');
  }

  getPlaces(place, recipe:string = '') {
    return this._http.get('https://api.foursquare.com/v2/venues/search' +
    '?client_id=' + this.id_fourSquare +
    '&client_secret=' + this.secret_fourSquare +
    '&v=20160215&limit=10' +
    '&near=' + place +
    '&query=' + recipe);
  }
}

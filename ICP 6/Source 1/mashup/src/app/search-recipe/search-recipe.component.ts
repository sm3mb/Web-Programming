import { SearchService } from './../search.service';
import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-search-recipe',
  templateUrl: './search-recipe.component.html',
  styleUrls: ['./search-recipe.component.css']
})
export class SearchRecipeComponent implements OnInit {
  @ViewChild('recipe') recipes: ElementRef;
  @ViewChild('place') places: ElementRef;
  recipeValue: any;
  placeValue: any;
  venueList = [];
  recipeList = [];

  currentLat: any;
  currentLong: any;
  geolocationPosition: any;


  constructor(private searchService: SearchService) {
  }

  ngOnInit() {

    window.navigator.geolocation.getCurrentPosition(
      position => {
        this.geolocationPosition = position;
        this.currentLat = position.coords.latitude;
        this.currentLong = position.coords.longitude;
      });
  }

  getVenues() {
    console.log('venues')
    this.recipeValue = this.recipes.nativeElement.value;
    this.placeValue = this.places.nativeElement.value;

    if (this.recipeValue !== null && this.recipeValue !== '') {
      /**
       * Write code to get recipe
       */
      this.searchService.getRecipe(this.recipeValue).subscribe((response: any) => {
        this.recipeList = response.hits;
      }, err => {
        console.log("Failed to get Recipe for "+this.recipeValue+" . Error is "+err);
      })
    }

    if (this.placeValue != null && this.placeValue !== '') {
      /**
       * Write code to get place
       */
      this.searchService.getPlaces(this.placeValue, this.recipeValue).subscribe( (response: any) => {
        this.venueList = response.response.venues;
      }, err => {
        console.log('Failed to get the restaurants at '+this.placeValue+' .Error is '+err);
      })
    }
  }
}

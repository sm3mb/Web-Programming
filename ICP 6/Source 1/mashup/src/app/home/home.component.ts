import { SearchService } from './../search.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  restaurants: any[] = [];

  constructor(private searchService: SearchService) { }

  ngOnInit() {
  }

  getPlaces(event, place) {
    this.searchService.getPlaces(place).subscribe((res:any) => {
      this.restaurants = res.response.venues;
    })
    event.preventDefault();
  }

}

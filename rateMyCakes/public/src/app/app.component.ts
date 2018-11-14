import { Component, OnInit } from '@angular/core';
import { HttpService } from "./http.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Rate My Cakes';
  cakes = [];
  singleCake = [];
  newInput = {title: "", url: ""};
  newRating = {comment: "", rating: Number};
  cakeAvg = 0;
  cakeRatings = [];
  showCake = false;
  showNewForm =  false;
  showRatingForm = false;

  constructor(private _httpService: HttpService) {}

  ngOnInit() {
    this.getCakes();
  }

  getAvg() {
    let sum = 0;
    for(let grade of this.singleCake.ratings) {
      sum += grade.rating;
      console.log(grade.rating);
    }
    this.cakeAvg = Math.floor(sum/this.singleCake.ratings.length);
    if(isNaN(this.cakeAvg)) {
      this.cakeAvg = "Not Rated"
    }
    console.log("Cake AVG: " + this.cakeAvg);
    this.showCake = true;
  }

  newForm() {
    this.showCake = false;
    this.showRatingForm = false;
    this.showNewForm = true;
  }

  ratingForm(id: String) {
    this.showCake = false;
    this.showNewForm = false;
    this.showRatingForm = true;
    this.getCake(id);
  }

  getCake(id: String) {
    let observable = this._httpService.getOneFromService(id);
    observable.subscribe(data => {
      console.log("Object received from '/cakes/:id' ", data);
      this.singleCake = data['cake'];
      this.getAvg();
      console.log(this.singleCake.ratings);
    });
  }

  getCakes() {
    let observable = this._httpService.getAllFromService();
    observable.subscribe(data => {
      console.log("Object received from '/cakes' ", data);
      this.cakes = data['cakes'];
    });
  }

  rateCakeById(id: String) {
    let observable = this._httpService.postNewRating(id, this.newRating);
    observable.subscribe(data => {
      console.log("Object posted to '/cakes/rating/:id' ", data);
      this.newRating = {comment: "", rating: Number};
      this.getCakes();
      this.showRatingForm = false;
    });
  }

  newCake() {
    let observable = this._httpService.postNewCake(this.newInput);
    observable.subscribe(data => {
      console.log("Object posted to '/cakes' ", data);
      this.newInput = {title: "", url: ""};
      this.getCakes();
      this.showNewForm = false;
    });
  }

  removeCakeById(id: String) {
    let observable = this._httpService.deleteCake(id);
    observable.subscribe(data => {
      console.log("Object deleted from '/cakes:id' ", data);
    });
  }

}

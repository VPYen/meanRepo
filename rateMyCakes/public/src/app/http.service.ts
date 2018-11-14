import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) {}

  getOneFromService(id: String) {
    return this._http.get(`/cakes/${id}`);
  }

  getAllFromService() {
    return this._http.get("/cakes");
  }

  postNewCake(newCake: any) {
    return this._http.post("/cakes", newCake);
  }

  postNewRating(id: String, newRating: any) {
    return this._http.post(`/cakes/rating/${id}`, newRating);
  }

  deleteCake(id: String) {
    return this._http.delete(`/cakes/${id}`);
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { merge, race, EMPTY } from 'rxjs';
import { expand, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SwapiService {

  constructor(private http: HttpClient) { }

  loadPlanets() {
    //return this.http.get("http://swapi.dev/api/planets/");

    const pageOne = this.http.get("https://swapi.dev/api/planets/"); // Observable of an object

    // Pipe to pass pageOne to other functions (expand and tap in this example); it returns another observable
    return pageOne.pipe(
      tap(x => console.log("tap", x)),
      expand(
        page => {
          if ((page as any).next) {

            let correctUrl = (page as any).next.replace("http:", "https:");
            return this.http.get(correctUrl);

          } else {

            return EMPTY;
          }
        }
        // If there is a next page, make a request to it. If not, return {}
      )
    );


    // const pageTwo = this.http.get("http://swapi.dev/api/planets/?page=2");

    // return race(
    //   pageOne,
    //   pageTwo
    // );

    // return merge(
    //   pageOne,
    //   pageTwo
    // );
  };
}

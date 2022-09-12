import { Component, VERSION } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  name = 'Angular ' + VERSION.major;
  baseUrl = 'https://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient) {

  }

  rxjsMapTest() {
    const http$ : Observable<Address[]> = this.http.get<User[]>(this.baseUrl + '/users')
      .pipe(
        tap((users) => {
           console.log('HTTP request executed');
           console.log("Users:\n", users);
        }),
        // map(res => Object.values(res.address))
        map(users => users.map(u => u.address))
      );      

    http$  
      .subscribe(
        // addresses => console.log("Cities:\n", Object.values(addresses['city']))
        addresses => {
          console.log("Addresses:\n", addresses);
          console.log("Cites:\n", addresses.map(a => a.city));
        }
      );

   /*http$.pipe(
      map(addresses => addresses.map(a => a.city))
    )
    .subscribe(
      city => console.log("Cites:\n", city)
    );*/

    /*
    http$
    .subscribe(
      addresses => console.log("Cites:\n", addresses.map(a => a.city))
    );  
    */    

  }
}

export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  address: Address;
}

export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
}

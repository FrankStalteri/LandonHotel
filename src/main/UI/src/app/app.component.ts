import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {HttpClient, HttpResponse,HttpHeaders} from "@angular/common/http";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(private httpClient:HttpClient){}

  private baseURL:string='http://localhost:8080';

  private getUrl:string = this.baseURL + '/room/reservation/v1/';
  private postUrl:string = this.baseURL + '/room/reservation/v1';
  public submitted!:boolean;
  roomsearch! : FormGroup;
  rooms! : Room[];
  request!:ReserveRoomRequest;
  currentCheckInVal!:string;
  currentCheckOutVal!:string;
  welcomeMessageUS: string = '';
  welcomeMessageFr: string = '';
  convertedTimes: string = '';
  announcePresentation$!: Observable<string>

  ngOnInit(){
    this.roomsearch= new FormGroup({
      checkin: new FormControl(' '),
      checkout: new FormControl(' ')
    });

    this.fetchWelcomeMessageUS();
    this.fetchWelcomeMessageFr()
    this.fetchTimeConversion();
    this.announcePresentation$ = this.httpClient.get(this.baseURL + '/presentation', {responseType: 'text'} )


    const roomsearchValueChanges$ = this.roomsearch.valueChanges;

    roomsearchValueChanges$.subscribe(x => {
      this.currentCheckInVal = x.checkin;
      this.currentCheckOutVal = x.checkout;
    });
  }

  onSubmit({ value, valid }: { value: Roomsearch, valid: boolean }) {
    this.getAll().subscribe(
      rooms => {
        this.rooms = <Room[]>Object.values(rooms)[0];

        // Conversion rates (example values)
        const cadRate = 1.25; // 1 USD = 1.25 CAD
        const eurRate = 0.85; // 1 USD = 0.85 EUR

        this.rooms.forEach(room => {
          room.priceCAD = (parseFloat(room.price) * cadRate).toFixed(2);
          room.priceEUR = (parseFloat(room.price) * eurRate).toFixed(2);
        });
      },
      error => {
        console.error('Error fetching room data:', error);
      }
    );
  }
  reserveRoom(value:string){
    this.request = new ReserveRoomRequest(value, this.currentCheckInVal, this.currentCheckOutVal);

    this.createReservation(this.request);
  }
  createReservation(body:ReserveRoomRequest) {
    let bodyString = JSON.stringify(body); // Stringify payload
    let headers = new Headers({'Content-Type': 'application/json'});

    const options = {
      headers: new HttpHeaders().append('key', 'value'),

    }

    this.httpClient.post(this.postUrl, body, options)
      .subscribe(res => console.log(res));
  }

  getAll(): Observable<any> {


    return this.httpClient.get(this.baseURL + '/room/reservation/v1?checkin='+ this.currentCheckInVal + '&checkout='+this.currentCheckOutVal, {responseType: 'json'});
  }

  fetchWelcomeMessageUS() {
    this.httpClient.get<string>('http://localhost:8080/api/welcome-messageUS').subscribe(
      (message: string) => {
        this.welcomeMessageUS = message; // Store the fetched message
      },
      (error) => {
        console.error('Error fetching welcome message:', error);
      }
    );
  }

  fetchWelcomeMessageFr() {
    this.httpClient.get<string>('http://localhost:8080/api/welcome-messageFr').subscribe(
      (message: string) => {
        this.welcomeMessageFr = message; // Store the fetched message
      },
      (error) => {
        console.error('Error fetching welcome message:', error);
      }
    );
  }

  fetchTimeConversion() {
    this.httpClient.get('http://localhost:8080/api/TimeZone', { responseType: 'text' }).subscribe(
      (message: string) => {
        this.convertedTimes = message; // Store the fetched message
      },
      (error) => {
        console.error('Error fetching time conversion:', error);
      }
    );
  }

}

export interface Roomsearch{
  checkin:string;
  checkout:string;
}

export interface Room{
  id:string;
  roomNumber:string;
  price:string;
  priceCAD: string;
  priceEUR: string;
  links:string;

}
export class ReserveRoomRequest {
  roomId:string;
  checkin:string;
  checkout:string;

  constructor(roomId:string,
              checkin:string,
              checkout:string) {

    this.roomId = roomId;
    this.checkin = checkin;
    this.checkout = checkout;
  }
}

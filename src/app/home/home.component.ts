import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  timeslots = [{time :9},{time :10},{time :11},{time :12},{time :1},{time :2},{time :3},{time :4},{time :5}];
  selecteddate : any = new Date();
  bookedSlotData : any = [];

  constructor(private http : HttpClient) { }

  ngOnInit() {
    this.setDate();
    this.getselecteddata();
  }

  markbookedslot(){
    this.timeslots.map((item)=>{
      let edata;
      let idx = this.bookedSlotData.findIndex(elem => {
              edata = elem;
              return elem.time === item.time
          })
      if (idx !== -1){
        item["_id"]=edata["_id"];
        item["firstname"]=edata["firstname"];
        item["lastname"]=edata["lastname"];
        item["phonenumber"]=edata["phonenumber"];
        item["isbooked"] = true;
      }else{
        item["isbooked"] = false;
      }
      item["date"] = this.selecteddate;
    })
  }

  setDate(){
    let date = this.selecteddate.getDate();
    if(date<10){ date = '0'+date; }
    let month = this.selecteddate.getMonth();
    month++;
    if (month<10) { month='0'+month; }
    this.selecteddate = this.selecteddate.getFullYear()+'-'+month+'-'+date;
  }

  getselecteddata(){
    this.http.get('http://localhost:3000/bookedlist',{ params: {date : this.selecteddate} }).subscribe((res)=>{
      this.bookedSlotData=res;
      this.markbookedslot();
    },(err) => {
      console.log(err);
    });
  }

}

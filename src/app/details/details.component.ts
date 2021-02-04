import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router'
import { FormGroup, FormControl, Validators  } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  sub;
  timeslotid;
  selecteddate;
  isbooked;
  id;
  showdate;
  userForm = new FormGroup({
    firstname: new FormControl(''),
    lastname: new FormControl(''),
    phonenumber: new FormControl('')
  });

  constructor(private route : ActivatedRoute,
              private http : HttpClient,
              private router : Router) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
        this.timeslotid = params['time'];
        this.selecteddate = params['date'];
        this.showdate = new Date(this.selecteddate);
        this.showdate = this.showdate.toString().slice(4,10);
        this.isbooked = params['isbooked'];
        if(this.isbooked == "true"){
          this.id = params['_id'];
          this.userForm.controls['firstname'].setValue(params['firstname']);
          this.userForm.controls['lastname'].setValue(params['lastname']);
          this.userForm.controls['phonenumber'].setValue(params['phonenumber']);
        }
    });
  }

  onSubmit() {
    let data = this.userForm.value;
    if(this.isbooked == "true"){
      data._id = this.id;
      this.http.post('http://localhost:3000/booked',data).subscribe((res)=>{
        this.router.navigate(['/home']);
      },(err) => {
        // console.log(err);
      });
    }
    data.time = this.timeslotid;
    data.date = this.selecteddate;
    this.http.post('http://localhost:3000/book',data).subscribe((res)=>{
      this.router.navigate(['/home']);
    },(err) => {
      // console.log(err);
    });
  }

}

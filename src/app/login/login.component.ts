import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public username:any;
  public password:any;
  public type:any;
  public cid:any;


  constructor() {
    this.username = ""

    this.post ()

  }

  ngOnInit() {
  }

  onSubmit() {

  console.log(this.password);
  console.log(this.username);

  }
  post ()  {
    var url = 'https://prueba-admision-web.herokuapp.com/session';
    var data = {
      "username": "synergy",
      "password": "synergy123",
      "type": "V"
    };

    fetch(url, {
      method: 'POST', // or 'PUT'
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => {
      console.log(response)
      let cid = response.cid
      this.get(cid)
    } );

  }


  get(x){

    fetch(`https://prueba-admision-web.herokuapp.com/data?cid=${x}` )
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    console.log(myJson);
  });

  }






  //  logSubmit(event) {
  //   log.textContent = `Form Submitted! Time stamp: ${event.timeStamp}`;
  //   event.preventDefault();
  // }




}

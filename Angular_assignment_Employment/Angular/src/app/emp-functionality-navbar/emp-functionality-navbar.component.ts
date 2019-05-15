import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'

@Component({
  selector: 'app-emp-functionality-navbar',
  templateUrl: './emp-functionality-navbar.component.html',
  styleUrls: ['./emp-functionality-navbar.component.css']
})
export class EmpFunctionalityNavbarComponent implements OnInit {

  constructor(private _router:Router) { }

  ngOnInit() {
  }
  addEmployee()
  {
this._router.navigate(['/multiForm']);
  }

}

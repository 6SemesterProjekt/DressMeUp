import { Component, Input, OnInit } from '@angular/core';
import { Clothes } from 'src/app/interfaces/clothes';

@Component({
  selector: 'my-clothes-component',
  templateUrl: './my-clothes-component.component.html',
  styleUrls: ['./my-clothes-component.component.scss'],
})
export class MyClothesComponent implements OnInit {

  @Input() clothes : Clothes;

  constructor() { }

  ngOnInit() {}

}

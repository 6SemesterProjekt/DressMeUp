import { Component, OnInit, Input } from '@angular/core';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit {

  @Input() title : string;

  constructor(private router : Router) { }

  ngOnInit() {}

  onLogoClicked(){
    this.router.navigate(['/tabs/outfits']);
  }

}

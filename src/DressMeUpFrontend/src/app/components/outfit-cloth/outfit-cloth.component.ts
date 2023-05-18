import { Component, ViewChild, ElementRef, OnInit, AfterViewInit, NgZone, ViewChildren } from '@angular/core';
import { GestureController, IonCard, IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import * as Hammer from 'hammerjs';

@Component({
  selector: 'app-outfit-cloth',
  templateUrl: './outfit-cloth.component.html',
  styleUrls: ['./outfit-cloth.component.scss'],
})
export class OutfitClothComponent {

  @ViewChild('container', { static: true }) container: ElementRef;

  images: string[] = [
    '../../assets/Images/png/1-jacket.png',
    '../../assets/Images/png/2-jacket.png',
    '../../assets/Images/png/3-jacket.png'];

  currentImageIndex = 0;
  currentImageSrc: string = this.images[this.currentImageIndex];

  swipeLeft() {
    this.currentImageIndex = (this.currentImageIndex - 1 + this.images.length) % this.images.length;
    this.currentImageSrc = this.images[this.currentImageIndex];
  }

  swipeRight() {
    this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
    this.currentImageSrc = this.images[this.currentImageIndex];
  }
}


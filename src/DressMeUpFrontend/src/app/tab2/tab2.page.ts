import { AfterViewInit, Component } from '@angular/core';
import { OutfitsService } from '../services/outfits.service';
import { IOutfit } from '../interfaces/outfit';
import { OutfitComponent } from '../components/outfit/outfit.component';
import { Gesture, GestureController, GestureDetail } from '@ionic/angular';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements AfterViewInit {

  outfits: IOutfit[] = [];

  currentIndex = 0;
  imagePaths: string[] = [
    '../../assets/Images/png/1-jacket.png',
    '../../assets/Images/png/2-jacket.png',
    '../../assets/Images/png/3-jacket.png'];

  constructor(private outfitService: OutfitsService, private gestureCtrl: GestureController) {

    // The `true` above ensures that callbacks run inside NgZone.
  }



  ngAfterViewInit() {
    const gesture: Gesture = this.gestureCtrl.create({
      el: document.querySelector('.my-element'),
      gestureName: 'swipe',
      direction: 'x',
      threshold: 0,
      gesturePriority: 1,
      passive: false,
      canStart: () => true,
      onStart: () => { },
      onMove: (ev: GestureDetail) => this.onSwipeMove(ev),
      onEnd: (ev: GestureDetail) => this.onSwipeEnd(ev)
    });

    gesture.enable();
  }
  onSwipeMove(ev: GestureDetail) {
    // Implement the logic for handling the swipe gesture while moving
    if (ev.deltaX > 0) {
      // Swipe right
      this.onSwipeRight();
    } else {
      // Swipe left
      this.onSwipeLeft();
    }
  }

  onSwipeEnd(ev: GestureDetail) {
    // Implement any necessary cleanup or additional logic after the swipe gesture ends
  }


  onSwipeRight() {
    this.currentIndex = (this.currentIndex + 1) % this.imagePaths.length;
    console.log("currentIndex: " + this.currentIndex);
    console.log("We make the call for right image! (ideally)");
  }
  onSwipeLeft() {
    this.currentIndex = (this.currentIndex - 1 + this.imagePaths.length) % this.imagePaths.length;
    console.log("currentIndex: " + this.currentIndex);
    console.log("We make the call for left image! (ideally)");
  }


  async ngOnInit() {
    console.log('getting data')
    this.outfitService
      .getAllOutfits()
      .subscribe(
        data => this.outfits = data
      )
  }

  onOutfitCardTapped(outfit: IOutfit) {
    console.log(outfit)
  }

}

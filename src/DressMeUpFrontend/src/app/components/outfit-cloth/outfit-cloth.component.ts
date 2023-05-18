import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  QueryList,
  Renderer2,
  VERSION,
  ViewChild,
  ViewChildren,
} from "@angular/core";
import {
  GestureController,
  Gesture,
  GestureDetail,
  IonCard,
} from "@ionic/angular";

@Component({
  selector: "app-outfit-cloth",
  templateUrl: "./outfit-cloth.component.html",
  styleUrls: ["./outfit-cloth.component.scss"],
})
export class OutfitClothComponent implements AfterViewInit {
  @ViewChildren(IonCard, { read: ElementRef }) cards!: ElementRef;

  images: string[] = [
    "../../assets/Images/png/1-jacket.png",
    "../../assets/Images/png/2-jacket.png",
    "../../assets/Images/png/3-jacket.png",
  ];
  currentImage: string = this.images[0];
  gesture: Gesture;

  constructor(private gestureCtrl: GestureController) {}

  ngAfterViewInit() {
    this.createGesture();
  }

  createGesture() {
    this.gesture = this.gestureCtrl.create({
      el: document.querySelector(".container"),
      gestureName: "swipe",
      direction: "x",
      gesturePriority: 0,
      threshold: 5,
      onMove: (ev) => this.onSwipe(ev),
    });
    this.gesture.enable();
  }

  onSwipe(event: any) {
    const deltaX = event.deltaX;
    if (deltaX < -150) {
      this.previousImage();
    } else if (deltaX > 150) {
      this.nextImage();
    }
  }

  previousImage() {
    const currentIndex = this.images.indexOf(this.currentImage);
    const previousIndex =
      (currentIndex - 1 + this.images.length) % this.images.length;
    this.currentImage = this.images[previousIndex];
  }

  nextImage() {
    const currentIndex = this.images.indexOf(this.currentImage);
    const nextIndex = (currentIndex + 1) % this.images.length;
    this.currentImage = this.images[nextIndex];
  }
}

/* previousImage() {
    const currentIndex = this.images.indexOf(this.currentImage);
    const previousIndex =
      (currentIndex - 1 + this.images.length) % this.images.length;
    this.currentImage = this.images[previousIndex];

    console.log("currentIndex: " + this.currentImage);
    console.log("We make the call for left image! (ideally)");
  }

  nextImage() {
    const currentIndex = this.images.indexOf(this.currentImage);
    const nextIndex = (currentIndex + 1) % this.images.length;
    this.currentImage = this.images[nextIndex];
    console.log("currentIndex: " + this.currentImage);
    console.log("We make the call for right image! (ideally)");
  } */

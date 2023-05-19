import { Component, ViewChild, ElementRef, AfterViewInit } from "@angular/core";
import { GestureController } from "@ionic/angular";

@Component({
  selector: "app-outfit-cloth",
  templateUrl: "./outfit-cloth.component.html",
  styleUrls: ["./outfit-cloth.component.scss"],
})
export class OutfitClothComponent {
  @ViewChild("image", { static: true, read: ElementRef }) image: ElementRef;
  @ViewChild("leftArrow", { static: true, read: ElementRef })
  leftArrow: ElementRef;
  @ViewChild("rightArrow", { static: true, read: ElementRef })
  rightArrow: ElementRef;

  images: string[] = [
    "../../assets/Images/png/1-jacket.png",
    "../../assets/Images/png/2-jacket.png",
    "../../assets/Images/png/3-jacket.png",
  ];
  currentImageIndex: number = 0;
  isSwiping: boolean = false;

  constructor(private gestureCtrl: GestureController) {}

  ngAfterViewInit() {
    const gesture = this.gestureCtrl.create({
      el: this.image.nativeElement,
      gestureName: "swipe",
      onStart: () => {
        this.isSwiping = true;
      },
      onMove: (ev) => {
        // Handle swipe movement if needed
      },
      onEnd: (ev) => {
        this.isSwiping = false;
        if (ev.deltaX > 0) {
          this.loadPreviousImage();
        } else {
          this.loadNextImage();
        }
      },
    });
    gesture.enable(true);
  }

  loadPreviousImage() {
    if (!this.isSwiping) {
      this.currentImageIndex =
        (this.currentImageIndex - 1 + this.images.length) % this.images.length;
      this.reloadImage();
      console.log("currentIndex: " + this.currentImageIndex);
      console.log("We make the call for left image! (ideally)");
    }
  }

  loadNextImage() {
    if (!this.isSwiping) {
      this.currentImageIndex =
        (this.currentImageIndex + 1) % this.images.length;
      this.reloadImage();

      console.log("currentIndex: " + this.currentImageIndex);
      console.log("We make the call for right image! (ideally)");
    }
  }

  reloadImage() {
    const imageElement: HTMLImageElement = this.image.nativeElement;
    imageElement.src = this.images[this.currentImageIndex];
  }
}

/* previousImage() {
    const currentIndex = this.images.indexOf(this.currentImage);
    const previousIndex =
      (currentIndex - 1 + this.images.length) % this.images.length;
    this.currentImage = this.images[previousIndex];

    console.log("currentIndex: " + this.currentImageIndex);
    console.log("We make the call for left image! (ideally)");
  }

  nextImage() {
    const currentIndex = this.images.indexOf(this.currentImage);
    const nextIndex = (currentIndex + 1) % this.images.length;
    this.currentImage = this.images[nextIndex];
    console.log("currentIndex: " + this.currentImageIndex);
    console.log("We make the call for right image! (ideally)");
  } */

import {
  Component,
  ViewChild,
  ElementRef,
  Input,
  AfterViewInit,
} from "@angular/core";
import { GestureController } from "@ionic/angular";
import { resolve } from "dns";
import { Observable } from "rxjs";
import { IClothes } from "src/app/interfaces/clothes";

@Component({
  selector: "app-outfit-cloth",
  templateUrl: "./outfit-cloth.component.html",
  styleUrls: ["./outfit-cloth.component.scss"],
})
export class OutfitClothComponent implements AfterViewInit {
  @ViewChild("image", { static: true, read: ElementRef }) image: ElementRef;
  @ViewChild("leftArrow", { static: true, read: ElementRef })
  leftArrow: ElementRef;
  @ViewChild("rightArrow", { static: true, read: ElementRef })
  rightArrow: ElementRef;

  @Input() clothes: IClothes[];
  currentImageIndex: number = 0;
  isSwiping: boolean = false;

  constructor(private gestureCtrl: GestureController) { }

  ngAfterViewInit() {
    const gesture = this.gestureCtrl.create({
      el: this.image.nativeElement,
      gestureName: "swipe",
      onStart: () => {
        this.isSwiping = true;
      },
      onMove: (ev) => {
        // Handle swipe movement if needed
        if (!this.isSwiping) {
          return;
        }
        const imageElement: HTMLElement = this.image.nativeElement;
        imageElement.style.transform = `translateX(${ev.deltaX}px)`;
      },
      onEnd: (ev) => {
        this.isSwiping = false;
        if (ev.deltaX > 0) {
          this.loadPreviousImage();
        } else {
          this.loadNextImage();
        }

        // update the image position.
        const imageElement: HTMLElement = this.image.nativeElement;
        imageElement.style.transform = "";
      },
    });
    gesture.enable(true);
  }

  loadPreviousImage() {
    if (!this.isSwiping) {
      this.currentImageIndex =
        (this.currentImageIndex - 1 + this.clothes.length) % this.clothes.length;
      this.reloadImage();
      console.log("currentIndex: " + this.currentImageIndex);
      console.log("We make the call for left image! (ideally)");
    }
  }

  loadNextImage() {
    if (!this.isSwiping) {
      this.currentImageIndex =
        (this.currentImageIndex + 1) % this.clothes.length;
      this.reloadImage();

      console.log("currentIndex: " + this.currentImageIndex);
      console.log("We make the call for right image! (ideally)");
    }

  }

  reloadImage() {
    const imageElement: HTMLImageElement = this.image.nativeElement;
    imageElement.src = this.clothes[this.currentImageIndex].Image;
  }
}

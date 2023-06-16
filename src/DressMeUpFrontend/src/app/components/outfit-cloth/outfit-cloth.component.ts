import { Component, ViewChild, ElementRef, Input, AfterViewInit } from "@angular/core";
import { GestureController } from "@ionic/angular";
import { Subject } from "rxjs";
import { ClothesType, IClothes } from "src/app/interfaces/clothes";

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

  @Input("clickSubject") clickSubject: Subject<any>;

  @Input() clothes: IClothes[] = [];
  currentImageIndex: number = 0;
  isSwiping: boolean = false;

  childComponents: any[] = [
    { id: 1, image: "child1.jpg", selected: false },
    { id: 2, image: "child2.jpg", selected: false },
    { id: 3, image: "child3.jpg", selected: false },
    // Add more child components as needed
  ];
  constructor(private gestureCtrl: GestureController) { }
  ngAfterViewInit() {
    this.isSelected = false;
  }
  ngOnInit() {
    const cloth: IClothes = {
      Brand: "Nike",
      ClothesType: ClothesType.Accessoires,
      Seasons: [],
      Color: [],
      FilterTags: [],
      Fabric: [],
      Name: "Name",
      Image: "",
    };
    this.clothes.push(cloth);
    const gesture = this.gestureCtrl.create({
      el: this.image.nativeElement,
      gestureName: "swipe",
      onStart: () => {
        this.isSwiping = true;
      },
      onMove: (ev) => {
        // Handle swipe movement if needed
        if (!this.isSwiping || this.isSelected == true) {
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
    this.clickSubject.subscribe((e) => {
      console.log("Parent sends greetings");
      this.getRandomIndex();
    });
    this.getRandomIndex();
  }


  private pressTimer: ReturnType<typeof setTimeout>;
  isSelected: boolean = false;
  private lastTap: number = 0;

  startPressTimer() {
    const now = new Date().getTime();
    const doubleTapThreshold = 200; // Adjust the duration for the double-tap interval in milliseconds

    if (now - this.lastTap < doubleTapThreshold) {
      this.selectImage();
    }

    this.lastTap = now;

  }

  clearPressTimer() {
    clearTimeout(this.pressTimer);
  }

  selectImage() {
    if (this.isSwiping == false) {
      this.isSelected = !this.isSelected; // Toggle isSelected flag
    }
  }

  preventPopup(e: Event) {
    e.preventDefault();
  }

  getRandomIndex() {
    if (this.isSelected == false) {
      let max = this.clothes.length;
      this.currentImageIndex = Math.floor(Math.random() * max);
    }
  }

  loadPreviousImage() {
    if (!this.isSwiping && this.isSelected == false) {
      this.currentImageIndex =
        (this.currentImageIndex - 1 + this.clothes.length) %
        this.clothes.length;
      this.reloadImage();
      console.log("currentIndex: " + this.currentImageIndex);
      console.log("We make the call for left image! (ideally)");
    }
  }

  loadNextImage() {
    if (!this.isSwiping && this.isSelected == false) {
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
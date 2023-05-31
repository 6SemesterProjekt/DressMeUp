import { Component, ViewChild, ElementRef, Input } from "@angular/core";
import { GestureController } from "@ionic/angular";
import { Subject } from "rxjs";
import { ClothesType, IClothes } from "src/app/interfaces/clothes";

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

  @Input("clickSubject") clickSubject: Subject<any>;
  @Input() clothes: IClothes[] = [];

  currentImageIndex: number = 0;
  isSwiping: boolean = false;

  constructor(private gestureCtrl: GestureController) { }
  ngOnInit() {

    var image = document.getElementById("cloth-image-id");
    var touchStartTimestamp;
    var longPressDuration = 500; // Adjust the duration as needed (in milliseconds)
    var isLongPress = false;

    image.addEventListener("contextmenu", function (event) {
      event.preventDefault(); // Prevent the default context menu from appearing
    });

    image.addEventListener("mousedown", function (event) {
      if (event.button === 2) { // Check if it's a right click
        event.preventDefault(); // Prevent the default context menu from appearing
      }

      touchStartTimestamp = new Date().getTime();
      isLongPress = false;
    });

    image.addEventListener("touchstart", function (event) {
      if (event.touches.length > 1) { // Check if it's a multi-touch event
        event.preventDefault(); // Prevent the default context menu from appearing
      }

      touchStartTimestamp = new Date().getTime();
      isLongPress = false;
    });

    image.addEventListener("mouseup", function (event) {
      var touchEndTimestamp = new Date().getTime();
      var pressDuration = touchEndTimestamp - touchStartTimestamp;

      if (pressDuration >= longPressDuration && !isLongPress) {
        event.preventDefault(); // Prevent the default context menu from appearing
        isLongPress = true;
      }
    });

    image.addEventListener("touchend", function (event) {
      var touchEndTimestamp = new Date().getTime();
      var pressDuration = touchEndTimestamp - touchStartTimestamp;

      if (pressDuration >= longPressDuration && !isLongPress) {
        event.preventDefault(); // Prevent the default context menu from appearing
        isLongPress = true;
      }
    });

    document.addEventListener("mousemove", function (event) {
      if (isLongPress && !isWithinImage(event)) {
        event.preventDefault(); // Prevent the default behavior when holding outside the image
      }
    });

    document.addEventListener("touchmove", function (event) {
      if (isLongPress && !isWithinImage(event)) {
        event.preventDefault(); // Prevent the default behavior when holding outside the image
      }
    });

    function isWithinImage(event) {
      var rect = image.getBoundingClientRect();
      var x = event.clientX || event.touches[0].clientX;
      var y = event.clientY || event.touches[0].clientY;

      return (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom);
    }




    // Makes a templete of interface ICloth, and push it to the array.
    // This is made because there is an error, if the array is empty
    // when the data are fetched from the service.
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

    // Create a gesture from gestureController, and sets the functionalities
    const gesture = this.gestureCtrl.create({
      el: this.image.nativeElement,
      gestureName: "swipe",
      onStart: () => {
        // Sets the bool property to be true
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

  startPressTimer() {
    this.pressTimer = setTimeout(() => {
      this.selectImage();
    }, 500); // Adjust the duration as needed for your long press threshold
  }

  clearPressTimer() {
    clearTimeout(this.pressTimer);
  }

  selectImage() {
    if (this.isSwiping == false) {
      this.isSelected = !this.isSelected; // Toggle isSelected flag
    }
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

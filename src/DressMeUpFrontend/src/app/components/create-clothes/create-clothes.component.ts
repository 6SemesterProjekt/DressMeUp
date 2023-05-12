import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { Clothes } from 'src/app/interfaces/clothes';
import { ClothesService } from 'src/app/services/clothes.service';
import { PhotoService, UserPhoto } from 'src/app/services/photo.service';

@Component({
  selector: 'app-create-clothes',
  templateUrl: './create-clothes.component.html',
  styleUrls: ['./create-clothes.component.scss'],
})
export class CreateClothesComponent implements OnInit {
  @Output() formSubmit = new EventEmitter();

  postForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private modalController: ModalController,
    public toastController: ToastController,
    private clothesService: ClothesService,
    public photoService: PhotoService) {

    this.postForm = this.formBuilder.group({
      clothesType: ['', Validators.required],
      color: ['', Validators.required],
      fabric: ['', Validators.required],
      seasons: ['', Validators.required],
      filterTags: ['', Validators.required],
      brand: ['', [Validators.required, Validators.minLength(2)]],
      image: ['', Validators.required],
      name: ['', Validators.required],
    });
  }



  /*   "clothesType": 1, 
    "color": "ffffff",
    "fabric": "uld",
    "seasons": "Vinter",
    "filterTags": "T-shirt",
    "brand": "Nike",
    "image": "img.png",
    "name": "sorte sko" */

  ngOnInit() { }

  onSubmit() {
    if (this.postForm.valid) {
      const newCloth: Clothes = {
        ClothesType: this.postForm.value.clothesType,
        Color: this.postForm.value.color,
        Fabric: this.postForm.value.fabric,
        Seasons: this.postForm.value.seasons,
        FilterTags: this.postForm.value.filterTags,
        Brand: this.postForm.value.brand,
        Image: this.postForm.value.image,
        Name: this.postForm.value.name,
      };


      this.clothesService.createNewItem(newCloth).subscribe((i) => {
        if (i) {
          this.modalController.dismiss(this.postForm.value, 'confirm');
          this.presentToast();
          console.log(newCloth);
        }
      });
    }


  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Tøj oprettet!',
      duration: 3000, // milliseconds
      position: 'top', // 'top', 'middle', or 'bottom'
    });
    toast.present();
  }


  addPhotoToGallery() {
    this.photoService.addNewToGallery();
  }
}

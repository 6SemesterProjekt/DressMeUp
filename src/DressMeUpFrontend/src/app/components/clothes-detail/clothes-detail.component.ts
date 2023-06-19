import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { IClothes } from 'src/app/interfaces/clothes';
import { DeleteClothModalPageComponent } from '../delete-cloth-modal-page/delete-cloth-modal-page.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ClothesService } from 'src/app/services/clothes.service';

@Component({
  selector: 'app-clothes-detail',
  templateUrl: './clothes-detail.component.html',
  styleUrls: ['./clothes-detail.component.scss'],
})
export class ClothesDetailComponent implements OnInit {

  @Input() clothes: IClothes = null;

  constructor(
    private modalController: ModalController,
    private toastController: ToastController,
    private clothesService: ClothesService,
    private router: Router
  ) { }

  ngOnInit() {
    // Retrieve the cloth ID from the route parameters and fetch the cloth from the service
    console.log(this.clothes);
    //this.clothesService.getClothesById(clothId).subscribe(response => this.cloth = response);
  }

  async deleteCloth() {
    const modal = await this.modalController.create({
      component: DeleteClothModalPageComponent,
      cssClass: 'delete-clothes-modal',
      componentProps: {
        cloth: this.clothes,
      },
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();
    if (data && data.deleted) {
      // Delete the cloth from the service and navigate back to the main page
      try {
        this.closeModal(true);
        //this.router.navigate(['/tabs/clothes']);

        await this.ShowToast();

        // Navigate back to the main page or any other desired page
        // this.router.navigate(["/"]);
      } catch (error) {
        console.log("Failed to delete cloth", error);
      }
    }



  }

  async ShowToast() {
    const toast = await this.toastController.create({
      message: "Cloth deleted successfully",
      duration: 2000,
      position: "top",
      color: "success",
    });

    toast.present();
  }

  closeModal(deleted) {
    this.modalController.dismiss({ clothDeleted: deleted });
  }
}

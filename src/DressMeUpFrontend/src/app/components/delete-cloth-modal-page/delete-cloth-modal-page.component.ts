import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IClothes } from 'src/app/interfaces/clothes';
import { ClothesService } from 'src/app/services/clothes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-cloth-modal-page',
  templateUrl: './delete-cloth-modal-page.component.html',
  styleUrls: ['./delete-cloth-modal-page.component.scss'],
})
export class DeleteClothModalPageComponent implements OnInit {

  @Input() cloth: IClothes;

  constructor(private modalController: ModalController, private clothesService: ClothesService, private router: Router) { }
  ngOnInit(): void {
    //throw new Error('Method not implemented.');
  }

  async deleteCloth() {
    try {
      // Call the deleteCloth() method of the service passing the cloth object
      await this.clothesService.deleteCloth(this.cloth.Id).subscribe(response => console.log(response));
      await this.modalController.dismiss({ deleted: true });
    } catch (error) {
      // Handle the error if the deletion fails
      console.log("Failed to delete cloth", error);
    }



  }

  dismissModal() {
    this.modalController.dismiss();
  }

}

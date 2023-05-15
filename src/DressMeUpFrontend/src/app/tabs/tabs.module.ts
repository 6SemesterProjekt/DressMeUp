import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TabsPageRoutingModule } from './tabs-routing.module';

import { TabsPage } from './tabs.page';

import { NgIconsModule } from '@ng-icons/core';
import { matCheckroom } from '@ng-icons/material-icons/baseline';
import { matCheckroomOutline } from '@ng-icons/material-icons/outline';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule,
    NgIconsModule.withIcons({ matCheckroom, matCheckroomOutline })
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}

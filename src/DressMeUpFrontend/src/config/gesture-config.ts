import { HammerGestureConfig } from '@angular/platform-browser';
import * as Hammer from 'hammerjs';

export class GestureConfig extends HammerGestureConfig {
    override = {
        swipe: { direction: Hammer.DIRECTION_HORIZONTAL },
    };
}

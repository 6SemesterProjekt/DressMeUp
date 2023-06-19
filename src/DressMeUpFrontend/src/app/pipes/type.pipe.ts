import { Pipe, PipeTransform } from '@angular/core';
import { ClothesType } from '../interfaces/clothes';

@Pipe({
  name: 'type'
})
export class TypePipe implements PipeTransform {
  transform(value: ClothesType, ...args: unknown[]): string {
    switch (value) {
      case ClothesType.Accessoires:
        return 'Accessories';
      case ClothesType.Overdele:
        return 'Overdele';
      case ClothesType.Overtøj:
        return 'Overtøj';
      case ClothesType.Sko:
        return 'Sko';
      case ClothesType.Underdele:
        return 'Underdele';
      default:
        return 'unknown';
    }
  }
}

import { Directive, HostListener, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[mask]',
})
export class MaskDirective {
  @Input('mask') name!: string;

  constructor(public ngControl: NgControl) {}

  @HostListener('ngModelChange', ['$event'])
  onModelChange(event: Event) {
    this.onInputChange(event, false);
  }

  @HostListener('keydown.backspace', ['$event'])
  keydownBackspace(event: any) {
    this.onInputChange(event.target!.value, true);
  }

  onInputChange(event: any, backspace: boolean): void {
    debugger;
    let newVal = event.replace(/\D/g, '');
    if (this.name === 'dateOfBirth') {
      if (backspace && newVal.length <= 5) {
        newVal = newVal.substring(0, newVal.length - 1);
      }
      if (newVal.length === 0) {
        newVal = '';
      } else if (newVal.length <= 2) {
        newVal = newVal.replace(/^(\d{0,2})/, '$1/');
      } else if (newVal.length <= 5) {
        newVal = newVal.replace(/^(\d{0,2})(\d{0,2})/, '$1/$2/');
      } else if (newVal.length <= 8) {
        newVal = newVal.replace(/^(\d{0,2})(\d{0,2})(\d{0,4})/, '$1/$2/$3');
      } else {
        newVal = newVal.substring(0, 8);
        newVal = newVal.replace(/^(\d{0,2})(\d{0,2})(\d{0,4})/, '$1/$2/$3');
      }
    }
    if (this.name === 'phone') {
      if (backspace && newVal.length <= 6) {
        newVal = newVal.substring(0, newVal.length - 1);
      }
      if (newVal.length === 0) {
        newVal = '';
      } else if (newVal.length <= 3) {
        newVal = newVal.replace(/^(\d{0,3})/, '$1-');
      } else if (newVal.length <= 6) {
        newVal = newVal.replace(/^(\d{0,3})(\d{0,3})/, '$1-$2');
      } else if (newVal.length <= 10) {
        newVal = newVal.replace(/^(\d{0,3})(\d{0,3})(\d{0,4})/, '$1-$2-$3');
      } else {
        newVal = newVal.substring(0, 10);
        newVal = newVal.replace(/^(\d{0,3})(\d{0,3})(\d{0,4})/, '$1-$2-$3');
      }
    }
    if (this.name === 'creditcard') {
      newVal = newVal.substring(0, 16);
    }
    this.ngControl.valueAccessor!.writeValue(newVal);
  }
}

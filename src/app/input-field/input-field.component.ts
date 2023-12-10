import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.scss']
})
export class InputFieldComponent {
@Input() control!:any;
@Input() type:any;
@Input() placeholder:any;
@Input() label:any;
@Input() validation:any;
@Input() validationStructure:any;
@Input() name:any;
}

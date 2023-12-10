import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-select-field',
  templateUrl: './select-field.component.html',
  styleUrls: ['./select-field.component.scss']
})
export class SelectFieldComponent {
@Input() categorys:any;
@Input() control!:any;
@Input() label:any;
@Input() validation:any;
@Input() validationStructure:any;
}

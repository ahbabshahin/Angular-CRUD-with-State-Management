import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if (!value) return null;
    if (!args) return value;

    args = args.toLowerCase();

    let res = value.filter((item:any) =>{
      return JSON.stringify(item).toLowerCase().includes(args);
    })
    if(!res)
      return 'No result found';
    return res;
  }
}

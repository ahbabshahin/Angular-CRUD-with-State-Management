import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit {
  @Input() currentPage: number = 1;
  @Input() total: number = 0;
  @Input() limit: number = 20;
  @Output() changePage = new EventEmitter<number>();

  pages: number[] = [];
  tot: number = 0;
  constructor(private _product: ProductService) {}

  ngOnInit(): void {
    this._product.page.subscribe((page) =>{
      this.tot = Number(page);
      const pageCount = Math.ceil(this.tot / this.limit);
      this.pages = this.range(1, pageCount);
    })
  }

  range(start: number, end: number) {
    return [...Array(end).keys()].map((index) => index + start);
  }
}

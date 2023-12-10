import { NgModule, Component, Input, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ProductService } from '../service/product.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription, catchError, isEmpty, pipe, throwError } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { addDataStart, editDataStart } from '../product/state/product.actions';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss'],
})
export class FormsComponent implements OnInit {
  form!: FormGroup;
  validationStructure: any;
  @Input() allProduct: any;
  @Input() productList: any;
  receiveData!: Subscription;
  check: any;
  update = false;
  id!: number;
  categorys: any = [];
  subs!: Subscription;
  submitted: any = false;
  maxRating = 5;
  ratings: any = [1, 2, 3, 4, 5];
  selectedStar: number = 0;
  prevSelection = 0;
  service_list: any = [];

  service_lists = [
    {
      id: 1,
      name: 'Additional',
      service_type: [
        { id: 1, type_name: 'Banquet' },
        { id: 2, type_name: 'Bar Dining' },
        { id: 3, type_name: 'Bar/Lounge' },
        { id: 4, type_name: 'Beer' },
        { id: 5, type_name: 'Coctails' },
      ],
    },
    {
      id: 2,
      name: 'Dining style',
      service_type: [
        { id: 6, type_name: 'Casual Elegant' },
        { id: 7, type_name: 'Casual Dining' },
        { id: 8, type_name: 'Casual Smart' },
        { id: 9, type_name: 'Family Style' },
        { id: 10, type_name: 'Fine Dining' },
      ],
    },

    {
      id: 3,
      name: 'Dress Code',
      service_type: [
        { id: 11, type_name: 'Smart Casual' },
        { id: 12, type_name: 'Casual' },
        { id: 13, type_name: 'Smart' },
        { id: 14, type_name: 'Business Casual' },
        { id: 15, type_name: 'Formal' },
      ],
    },
    {
      id: 4,
      name: 'Entertainment',
      service_type: [{ id: 16, type_name: 'Dj & Live music' }],
    },
    {
      id: 5,
      name: 'Brand',
      service_type: [
        { id: 17, type_name: 'Aviko' },
        { id: 18, type_name: 'Aero' },
        { id: 19, type_name: 'Fedex' },
        { id: 16, type_name: 'KFC' },
        { id: 20, type_name: 'Burger King' },
      ],
    },
  ];

  tag = [
    { id: 1, name: 'mens_clothing' },
    { id: 2, name: 'womens_clothing' },
    { id: 3, name: 'jeans' },
    { id: 4, name: 'tops' },
    { id: 5, name: 'others' },
  ];
  files!: File;
  fileUpload = { status: '', message: '', filePath: '' };
  formData = new FormData();
  progress: number = 0;
  errorHandler: any;
  // upload: UploadResponse = new UploadResponse();
  constructor(
    private _fb: FormBuilder,
    public _product: ProductService,
    private toastr: ToastrService,
    private store: Store<AppState>
  ) {
    // console.log(this.service_list);
    this.form = this._fb.group({
      title: [
        'Lorem ipsum dolor sit amet consectetuer adipiscin',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(50),
          Validators.pattern('^[a-zA-z0-9]+[ ]*[a-zA-z0-9 ]*'),
        ],
      ],
      description: [
        'Lorem ipsum dolor sit amet consectetuer adipiscin ',
        [
          Validators.required,
          Validators.minLength(50),
          Validators.maxLength(90),
        ],
      ],
      price: [
        '123',
        [Validators.required, Validators.pattern('^[1-9][0-9]*$')],
      ],
      discountPercentage: [
        '1.0',
        [Validators.required, Validators.pattern('[0-9]+[.][0-9]+$')],
      ],
      rating: ['4', [Validators.required]],
      stock: ['123', [Validators.required, Validators.pattern('^[0-9]*$')]],
      brand: [
        'Lorem ipsum dolor sit amet consectetuer adipiscin',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(50),
        ],
      ],
      category: ['Smartphone', [Validators.required]],
      tags: new FormArray([]),
      services: new FormArray([]),
    });
    // this.form.get('thumbnail')?.setValue('');
    this.setControl();
    console.log(this.form);
  }

  get tagControl() {
    return this.form.get('tags') as FormArray;
  }

  get servicesControl() {
    return this.form.get('services') as FormArray;
  }

  serviceTypeControl(i: number) {
    return this.servicesControl.controls[i].get('service_type') as FormArray;
  }

  ngOnInit(): void {
    this.errorHandler = this._product.getError();
    this.validationStructure = this._product.getValidationStructure();
    this.getCategory();
    // console.log(this.service_list[0].service_type[0].type_name);

    // this.initialForm();
    this.valueInitialization();
    // console.log(this.service_list);

    this.receiveData = this._product.editData().subscribe(
      (data) => {
        if (data) {
          this.id = data.id;
          this.form.patchValue({
            title: data.title,
            description: data.description,
            price: data.price,
            discountPercentage: data.discountPercentage,
            rating: data.rating,
            stock: data.stock,
            brand: data.brand,
            category: data.category,
          });
          this.selectedStar = data.rating;
          this.update = true;
        }
      },
      (error: Error) => {
        console.log(error);
      }
    );
  }

  valueInitialization() {
    this.service_lists.forEach((item: any, i: number) => {
      this.service_list[i] = item;
      item.visible = true;
      // console.log(item);

      item.service_type.forEach((data: any, j: number) => {
        data.value = false;
      });
    });
  }

  onSubmit(e: any) {
    if (this.form.valid) {
      if (this.update == true) {
        const data = {
          id: this.form.value.id,
          body: JSON.stringify({
            title: this.form.value.title,
            description: this.form.value.description,
            price: this.form.value.price,
            discountPercentage: this.form.value.discountPercentage,
            rating: this.form.value.rating,
            stock: this.form.value.stock,
            brand: this.form.value.brand,
            category: this.form.value.category,
            tags: this.form.value.tags,
          }),
        };
        this.store.dispatch(editDataStart({ id: this.id, product: data.body }));
        this.form.patchValue({
          title: '',
          description: '',
          price: '',
          discountPercentage: '',
          rating: '',
          stock: '',
          brand: '',
          category: '',
        });
        this.update = false;
        this.toastr.success('Product Been updated');
        this.selectedStar = 0;
        this.reset();
        // this.subs = this._product.updateData(this.id, data.body).subscribe(
        //   (data) => {
        //     let index = this.allProduct.findIndex((item: any) => {
        //       return item.id === data.id;
        //     });

        //     this.allProduct.splice(index, 1, data);
        //     if (this.productList) {
        //       let index = this.productList.findIndex((item: any) => {
        //         return item.id === data.id;
        //       });

        //       this.productList.splice(index, 1, data);
        //     }
        //     this.update = false;

        //     this.toastr.success('Product Been updated');
        //     this.selectedStar = 0;
        //     this.reset();
        //   },
        //   (error) => {
        //     this.errorHandler.forEach((err: any) => {
        //       if (err.status === error) {
        //         this.toastr.error(err.message);
        //       }
        //     });
        //     console.log(error);
        //   }
        // );
      } else {
        let id: any = [];
        for (let i = 0; i < this.form.value.tags.length; i++) {
          if (this.form.value.tags[i].value == true) {
            id.push(this.form.value.tags[i].id);
          }
        }

        // console.log(this.form.value.services);
        let service = this.form.value.services;

        service.forEach((service: any) => {
          let service_type: any = [];
          service.service_type.forEach((item: any, i: number) => {
            if (item.value == true) service_type.push(item);
          });

          service.service_type = service_type;
          // console.log(service.service_type);
        });
        let services: any = [];
        service.forEach((service: any) => {
          let type = service.service_type.length;
          // console.log(type);
          if (type !== 0) {
            services.push(service);
          }
        });

        const data = {
          body: JSON.stringify({
            title: this.form.value.title,
            description: this.form.value.description,
            price: this.form.value.price,
            discountPercentage: this.form.value.discountPercentage,
            rating: this.form.value.rating,
            stock: this.form.value.stock,
            brand: this.form.value.brand,
            category: this.form.value.category,
            tags: id,
            services: services,
          }),
        };

        console.log(JSON.parse(data.body));
        this.store.dispatch(addDataStart({ product: data.body }));
        this.toastr.success('Product Been added');
        this.selectedStar = 0;
        this.reset();

        // this.fileUpload = this.form.value.img;
        // this.subs = this._product
        //   .postData(data.body)
        //   .pipe(
        //     catchError((err) => {throw(err)})
        //   )
        //   .subscribe(
        //     (data) => {
        //       // console.log(data);
        //       this.progress = this._product.progress;
        //       this.allProduct.push(data);
        //       this.toastr.success('Product Been added');
        //       this.selectedStar = 0;
        //       // e.target.reset();
        //       // this.setControl();
        //       // console.log(data);

        //       // this.fileUpload = data;
        //       // console.log(this.fileUpload);

        //       this.reset();
        //     },
        //     (error) => {
        //       this.errorHandler.forEach((err:any) =>{
        //         if(err.status === error){
        //           this.toastr.error(err.message);
        //         }
        //       })
        //       console.log(error);
        //     }
        //   );
      }
    }
  }

  getCategory() {
    this._product.getCategory().subscribe(
      (data: any) => {
        this.categorys = data;
      },
      (error: Error) => {
        console.log(error);
      }
    );
  }

  reset() {
    this.form.reset();
    this.update = false;
    this.selectedStar = 0;
    this.resetControl();
    console.log(this.form);
    this.setControl();
    this.visible = true;
    this.list = false;
    this._product.progress = 0;
    this.valueInitialization();
  }

  handleMouseEnter(i: number) {
    this.selectedStar = i + 1;
  }

  handleMouseLeave() {
    if (this.prevSelection !== 0) {
      this.selectedStar = this.prevSelection;
    } else {
      this.selectedStar = 0;
    }
  }

  rating(i: number) {
    this.selectedStar = i + 1;
    this.prevSelection = this.selectedStar;
    this.form.patchValue({
      rating: this.selectedStar,
    });
  }

  setControl() {
    for (let i = 0; i < this.tag.length; i++) {
      // this.tagControl.push(new FormControl(false));

      // this.tagControl.push(
      //   new FormControl({
      //     id: this.tag[i].id,
      //     name: this.tag[i].name,
      //     select: false,
      //   })
      // );
      let control = this._fb.group({
        id: this.tag[i].id,
        name: this.tag[i].name,
        value: false,
      });
      this.tagControl.push(control);
      // console.log();
    }
  }

  resetControl() {
    this.tagControl.clear();
    this.servicesControl.clear();
  }
  ind = -1;
  index: any = [];

  initialize() {
    this.ind += 1;
    let index = {
      id: this.ind,
      value: true,
    };
    this.index.push(index);
    // console.log(this.index);
  }

  remove(i: number, id: number) {
    // console.log(id);

    this.serviceTypeControl(i).clear();
    let index = {
      id: -1,
      value: false,
    };
    this.index.splice(i, 1, index);
    //  console.log(this.index);

    this.service_lists.forEach((service: any, i: number) => {
      if (service.id == id) this.service_list.push(service);
    });

    //  this.valueInitialization();
  }

  handleChange(e: any, data: any) {
    // console.log(data.service_type);

    let val = e.target;
    // let control;
    // console.log(val.id);

    for (let i = 0; i < data.service_type.length; i++) {
      if (data.service_type[i].id == val.id) {
        if (val.checked) data.service_type[i].value = true;
        else data.service_type[i].value = false;
        // console.log(data.service_type[i]);
      }
    }

    // if (val.checked) {
    //   this.serviceGroup = this._fb.group({
    //     id: val.id,
    //     type_name: val.value,
    //     value: val.checked,
    //   });
    //   // this.formGroup.push(this.serviceGroup);
    //   // this.servicesControl.push(control);
    // } else {
    //   this.formGroup.forEach((item: any, i: number) => {
    //     console.log(item.controls.id.value);

    //     if (item.controls.id.value == val.id) {
    //       console.log('hey');

    //       this.formGroup.splice(i, 1);
    //     }
    //   });
    // }

    // console.log(this.formGroup);
  }
  visible: boolean = true;
  list: boolean = false;

  addToForm(data: any) {
    this.list = true;
    data.visible = false;

    let val = data.service_type;

    // console.log(this.form);

    let formGroup;
    let service: FormArray<any> = new FormArray<any>([]);

    for (let i = 0; i < val.length; i++) {
      let item = this._fb.group({
        id: val[i].id,
        type_name: val[i].type_name,
        value: val[i].value,
      });
      service.push(item);
    }

    formGroup = this._fb.group({
      id: data.id,
      name: data.name,
      service_type: service,
    });

    // console.log(formGroup);

    this.service_list.forEach((item: any, i: number) => {
      if (item.id == data.id) {
        this.service_list.splice(i, 1);
      }
    });

    this.servicesControl.push(formGroup);
    // console.log(this.servicesControl);

    // this.servicesControl.controls.forEach((item: any, i: number) => {
    //   item.controls.forEach((data: any, j: number) => {
    //     console.log(data.controls.service_type.value.type_name);
    //   });

    // });
  }

  get title() {
    return this.form.get('title');
  }
  get description() {
    return this.form.get('description');
  }
  get discountPercentage() {
    return this.form.get('discountPercentage');
  }
  get price() {
    return this.form.get('price');
  }
  get stock() {
    return this.form.get('stock');
  }
  get brand() {
    return this.form.get('brand');
  }
  get category() {
    return this.form.get('category');
  }
  get tags() {
    return this.form.get('tags');
  }
  get rate() {
    return this.form.get('rating');
  }

  ngOnDestroy(): void {
    this._product.unsubscribe(this.subs);
  }
}

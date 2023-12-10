import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UploadService } from '../upload.service';
import { Observable, ReplaySubject } from 'rxjs';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent {
  form!: FormGroup;
  fileName: string = '';
  base64Output: any = '';
  constructor(private _fb: FormBuilder, private _upload: UploadService) {}
  fileUpload = {
    status: '',
    message: '',
    filePath: '',
  };
  text: string = '';
  ngOnInit(): void {
    this.form = this._fb.group({
      thumbnail: [undefined, Validators.required],
    });
  }
  value!: any;
  onChange(e: any) {
    // this.base64Output = new TextEncoder().encode(e.target.files[0]);
    // console.log(this.base64Output);

    // this.convertFile(e.target.files[0]).subscribe((base64) => {
    //   this.base64Output = base64;
    //   console.log(this.base64Output);
    // });

    // if(this.base64Output){
    const file = e.target.files[0];
    this.value = file;
    console.log(this.value);
    // this.form.get('thumbnail')?.value.setValue(file);

    console.log(this.form.value.thumbnail);
    // }
  }

  onSubmit() {
    let formData = new FormData();
    // console.log(this.base64Output);
    // console.log(this.form.value.thumbnail);
    // console.log(this.value);

    formData.append('file', this.value);
    // console.log(formData);

    // for (const value of formData) {
    //   console.log(value);
    // }

    this._upload.upload(formData).subscribe(
      (res) => {
        // console.log(res.file);

        this.fileUpload = res;
        console.log(res.filename);
        if (res.location !== undefined) {
          this.fileName = res.location;
        }
        this.reset();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  reset() {
    this.form.reset();
  }

  convertFile(file: File): Observable<string> {
    const result = new ReplaySubject<string>(1);
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = (event) =>
      result.next(btoa(String(event.target?.result?.toString())));
    return result;
  }

  onClick() {
    // console.log(this.base64Output);
    //  const tob = atob(this.base64Output).split('').map((data) =>{
    //     data.charCodeAt(0)
    //   })
    //   console.log(tob);

    // const split = new Uint8Array()

    // const encode = new TextEncoder().encode("asd");
    const decode = new TextDecoder().decode(this.base64Output);

    // console.log(encode);
    console.log(decode);
    // const tob = atob(this.base64Output).split('').map((data) =>{
    //       data.charCodeAt(0)
    //     })

    // console.log(tob);

    const file = new Blob([this.base64Output], { type: 'jpg' });
    console.log(file);

    const url = URL.createObjectURL(file);
    let name = 'jpg';
    let link = document.createElement('a');
    link.download = name;
    link.href = url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

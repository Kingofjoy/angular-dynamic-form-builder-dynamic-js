import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  SimpleChanges
} from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormArray,
  FormBuilder
} from '@angular/forms';
import { getData } from '../app.component';

@Component({
  selector: 'dynamic-form-builder',
  template: `
    <form
      (ngSubmit)="onSubmit.emit(this.form.value)"
      [formGroup]="form"
      class="form-horizontal"
    >
      <div *ngFor="let field of fields">
        <field-builder [field]="field" [form]="form"></field-builder>
      </div>
      <div class="form-row"></div>
      <div class="form-group row">
        <div class="col-md-3"></div>
        <div class="col-md-9">
          <button
            type="submit"
            [disabled]="!form.valid"
            class="btn btn-primary"
          >
            Save
          </button>
          <!-- <strong>Saved all values</strong> -->
        </div>
      </div>
    </form>
  `
})
export class DynamicFormBuilderComponent implements OnInit {
  @Output() onSubmit = new EventEmitter();
  @Input() fields: any[] = [];
  @Input() DataInputUpdates: any[] = [];

  @Output() private onFormGroupChange = new EventEmitter<any>();

  // @Input()
  // get frmHandle() {
  //   return this.form;
  // }

  // @Output() frmHandleChange = new EventEmitter();
  // set frmHandle(val) {
  //   this.form = val;
  //   this.frmHandleChange.emit(this.form);
  // }

  form: FormGroup;
  allDatas: any;
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    let fieldsCtrls = {};
    this.allDatas = getData();
    for (let f of this.fields) {
      if (f.type != 'array') {
        fieldsCtrls[f.name] = new FormControl(
          this.allDatas[f.name] || '',
          Validators.required
        );
      } else {
        fieldsCtrls[f.name] = new FormArray([]);
        this.createItem(f, fieldsCtrls);
      }
    }
    this.form = new FormGroup(fieldsCtrls);

    console.log('controls', this.form.controls);

    this.onFormGroupChange.emit(this.form);
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    if (changes.DataInputUpdates) {
      for (let upd of this.DataInputUpdates) {
        if (this.form.controls[upd.fieldName] != null) {
          if (this.form.controls[upd.fieldName].value != upd.fieldValue) {
            this.form.controls[upd.fieldName].setValue(upd.fieldValue);
          }
        }
      }
    }
  }

  createItem(f, fieldsCtrls) {
    console.log('myTest', fieldsCtrls);
    let test = this.allDatas[f.name].map((r: any) =>
      fieldsCtrls[f.name].push(this.fb.group(r))
    );

    return test;
  }
}

import { HttpClient } from "@angular/common/http";
import { Component, Input, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { ConfigService } from "../../config.service";

@Component({
  selector: "arraybox",
  template: `
    <div [formGroup]="form">
      <div formArrayName="{{ field.name }}">
        <div
          *ngFor="let obj of form.get('users')['controls']; index as idx"
          [formGroupName]="idx"
        >
          <input
            attr.type="text"
            class="form-control"
            placeholder="userName"
            id="userName"
            name="userName"
            formControlName="userName"
          />
          <input
            attr.type="number"
            class="form-control"
            placeholder="userEmail"
            id="userEmail"
            name="userEmail"
            formControlName="userEmail"
          />
        </div>
      </div>
    </div>
  `
})
export class ArrayBoxComponent implements OnInit {
  @Input() field: any = {};
  @Input() form: FormGroup;
  arrayFileds: any = [];

  get isValid() {
    return this.form.controls[this.field.name].valid;
  }
  get isDirty() {
    return this.form.controls[this.field.name].dirty;
  }

  constructor(private config: ConfigService) {}

  ngOnInit(): void {
    this.arrayFileds = this.config.getData(this.field.structure);
    console.log(this.arrayFileds);
  }
}

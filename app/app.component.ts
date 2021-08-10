import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ScriptService } from './script.service';

// declare the javascript function here
declare function mDynProcessAppAssertion(message): any;

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public form: FormGroup;
  public dynform: FormGroup;
  unsubcribe: any;
  public fields: any[] = [
    {
      type: 'text',
      name: 'firstName',
      label: 'First Name',
      required: true
    },
    {
      type: 'text',
      name: 'lastName',
      label: 'Last Name',
      required: true
    },
    {
      type: 'text',
      name: 'email',
      label: 'Email',
      required: true
    },
    {
      type: 'text',
      name: 'description',
      label: 'Description',
      required: true,
      multiLine: true
    },
    {
      type: 'dropdown',
      name: 'country',
      label: 'Country',
      value: 'in',
      required: true,
      options: [{ value: 'in', label: 'India' }, { value: 'us', label: 'USA' }]
    },
    {
      type: 'array',
      name: 'users',
      label: 'Users',
      structure: 'users.json'
    }
  ];

  constructor(private script: ScriptService) {
    this.form = new FormGroup({
      fields: new FormControl(JSON.stringify(this.fields))
    });
    this.unsubcribe = this.form.valueChanges.subscribe(update => {
      console.log('valueChanges');
      console.log(update);
      this.fields = JSON.parse(update.fields);
    });
  }

  onUpload(e) {
    console.log(e);
  }

  getFields() {
    return this.fields;
  }

  ngDistroy() {
    this.unsubcribe();
  }
  ngAfterViewInit() {
    console.log('ngAfterViewInit Start');
    this.script
      .load('A12AS21')
      .then(data => {
        console.log('script loaded ', data);
      })
      .catch(error => console.log(error));
    console.log('ngAfterViewInit Done');
  }

  public formUpdates: any[] = [];

  processData() {
    //console.log(this.formCheck);

    if (this.formCheck['controls'] != null) {
      if (this.formCheck['controls']['firstName'].value == 'Vincent') {
        console.log('AppAssert Required');
        let data: any[] = [];
        data.push({ fieldName: 'lastName', fieldValue: 'Raj' });
        this.formUpdates = data;
      } else {
        console.log('AppAssert Revert Required');
        let data: any[] = [];
        data.push({ fieldName: 'lastName', fieldValue: null });
        this.formUpdates = data;
      }
    }

    mDynProcessAppAssertion('hai');
  }

  formCheck: any = '';
  public onFormGroupChangeEvent(_event) {
    this.formCheck = _event;
    console.error(_event, this.formCheck['controls']);

    this.formCheck.controls['firstName'].valueChanges.subscribe(value => {
      //this.processData();
    });

    //this.processData();
  }
}

export function getData() {
  return {
    firstName: null,
    lastName: null,
    email: 'test@test.com',
    description: 'Test Test Test',
    country: 'us',
    users: [
      {
        userName: 'Second test',
        userEmail: 'secondEmail@test.com'
      },
      {
        userName: 'Third test',
        userEmail: 'thirdEmail@test.com'
      }
    ]
  };
}

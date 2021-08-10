import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import data from './users.json';

@Injectable()
export class ConfigService {
  constructor(private http: HttpClient) {}

  getData(structure) {
    console.log(structure);
    return null;
  }
}

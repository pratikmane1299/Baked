import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICategory } from '../../category';

@Injectable({
  providedIn: 'root'
})


export class CategoryService {

  category:ICategory[];

  baseURL="https://sneakiest-sky.000webhostapp.com/api/";

  constructor(private http: HttpClient) {
  }

  getAllCategories(){
    return this.http.get(this.baseURL+"read-categories");
  }
}

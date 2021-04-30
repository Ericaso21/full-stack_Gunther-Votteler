import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URI } from 'src/environments/environment';
import { Films } from '../interfaces/films';

@Injectable({
  providedIn: 'root'
})
export class FilmsService {
  private API_URI = API_URI.url;
  constructor(private http: HttpClient) { }

  getFilms(token: any) {
    let headers = new HttpHeaders({ 'x-token': token });
    return this.http.get(`${this.API_URI}/films/list`, { 'headers': headers });
  }

  getCategories(token: any) {
    let headers = new HttpHeaders({ 'x-token': token });
    return this.http.get(`${this.API_URI}/categories/list`, { 'headers': headers });
  }

  saveFilms(movie: Films) {
    return this.http.post(`${this.API_URI}/films/create`, movie);
  }

  getCategory(token: any, id: string) {
    let headers = new HttpHeaders({ 'x-token': token });
    return this.http.get(`${this.API_URI}/films/getCategory/${id}`, { 'headers': headers });
  }
}

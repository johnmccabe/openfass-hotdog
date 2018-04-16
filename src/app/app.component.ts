import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { animate, style, transition, trigger } from '@angular/animations';
import * as _ from 'lodash';

@Component({
  selector: 'nhda-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('fade', [
      transition(':enter', [
        style({ opacity: '0' }),
        animate('1s cubic-bezier(.19,1,.22,1)', style({ opacity: '1' }))
      ]),
      transition(':leave', [
        animate('1s cubic-bezier(.19,1,.22,1)', style({ opacity: '0' }))
      ])
    ])
  ]
})
export class AppComponent implements OnInit {

  @ViewChild('fileInput') fileInput: ElementRef;
  uploading: boolean = false;
  apiResponses: ApiResponse[] = [];

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
  }

  handleFileUpload(files: FileList) {
    this.uploading = true;
    this.http.post<ApiResponse[]>(environment.apiBaseUri, files.item(0))
      .subscribe(x => {
        this.uploading = false;
        this.apiResponses = _.sortBy(x, ['score', 'name']);

      }, err => this.uploading = false);
  }

}


export interface ApiResponse {
  name: string;
  score: number;
}

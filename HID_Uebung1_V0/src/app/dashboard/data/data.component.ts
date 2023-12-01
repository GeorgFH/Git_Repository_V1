import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BackendService } from 'src/app/shared/backend.service';
import { CHILDREN_PER_PAGE } from 'src/app/shared/constants';
import { StoreService } from 'src/app/shared/store.service';
import { PageEvent } from '@angular/material/paginator';




@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss'], 
  
})
export class DataComponent implements OnInit {

  constructor(public storeService: StoreService, private backendService: BackendService) {}
  @Input() currentPage!: number;
  @Output() selectPageEvent = new EventEmitter<number>();
  public page: number = 0;
  public childrenPerPage: number = CHILDREN_PER_PAGE;

  ngOnInit(): void {
    this.backendService.getChildren(this.currentPage);
  }

  getAge(birthDate: string) {
    var today = new Date();
    var birthDateTimestamp = new Date(birthDate);
    var age = today.getFullYear() - birthDateTimestamp.getFullYear();
    var m = today.getMonth() - birthDateTimestamp.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDateTimestamp.getDate())) {
        age--;
    }
    return age;
  }

  selectPage(i: any) {
    let currentPage = i;
    this.selectPageEvent.emit(currentPage)
    this.backendService.getChildren(currentPage);
  }
  
  public returnAllPages() {
    return Math.ceil(this.storeService.childrenTotalCount / this.childrenPerPage)
  }

  public returnAllChildren() {
    return Math.ceil(this.storeService.childrenTotalCount)
  }

  public cancelRegistration(childId: string) {
    this.backendService.deleteChildData(childId, this.currentPage);
  }

  pageChanged(event: PageEvent) {
    let currentPage = event.pageIndex + 1; // Paginator-Index beginnt bei 0, deshalb +1
    this.selectPageEvent.emit(currentPage);
    this.backendService.getChildren(this.currentPage);
  }
}



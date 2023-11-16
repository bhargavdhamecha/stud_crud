import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { SharedService } from '../shared/shared.service';
import { studentDetail } from '../models/student.interface';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent {
  data: any  = [];
  dataSource: any;
  displayedColumns = ['roll_id', 'name', 'age', 'stream', "extra"];
  updateListing: boolean = false;
  matDialogRef!: MatDialogRef<ModalComponent>;

  constructor(private shared: SharedService, private matDialog: MatDialog){ }

  ngOnInit(){
    this.getStudents();       
   }
 
  addStudent() {
    this.matDialogRef = this.matDialog.open(ModalComponent, {
      disableClose: false
    });

    this.matDialogRef.afterClosed().subscribe(result => {
      if(result){
        this.getStudents();
      };
    });
  }

 
   getStudents(){
     this.shared.getStudents().subscribe( (response) => {
      this.data = [];
       response.body.forEach((res: any) => {
         this.data.push(<studentDetail>JSON.parse(JSON.stringify(res)));
       });
     })
     this.dataSource = this.data;
   }
 
   deleteRecord(roll_id: number){
    this.shared.deleteStudent(roll_id).subscribe({
      next: (res:any)=>{
        if(res?.body?.isDeleted){
          this.getStudents();
        }
      },
      error: (err:any)=>{
        console.log(err);
      }
    });
  }

   editRecord(e: any){
    this.matDialogRef = this.matDialog.open(ModalComponent, {
      disableClose: false,
      data: {
        detail: e
      }
    });

    this.matDialogRef.afterClosed().subscribe(result => {
      if(result){
        this.getStudents();
      };
    });
   }

}

import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from "@angular/material/dialog";
import { SharedService } from '../shared/shared.service';
import { studentDetail } from '../models/student.interface';
import { ListingComponent } from '../listing/listing.component';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  listingRef!: ListingComponent;
  isUpdate:boolean = false;
  inputData: any;
  studentData!: FormGroup;

  constructor(private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) data: any, private dialogRef: MatDialogRef<ModalComponent> , 
    private shared: SharedService, private fb:FormBuilder) {
      if(data){
        this.inputData = data.detail;
        this.isUpdate = true;
      }
    }
   
  ngOnInit(){
    this.studentData = this.fb.group({
      name: ['', Validators.required],
      age: ['', Validators.required],
      roll_id: ['', Validators.required],
      stream: ['', Validators.required],
    });
    this.setFormValues();
  }

  setFormValues() {
    if(this.inputData){
      this.studentData.setValue({
        name: this.inputData.name,
        age: this.inputData.age,
        roll_id: this.inputData.roll_id,
        stream: this.inputData.stream,
      });
      this.studentData.get('roll_id')?.disable();
    }
  }
   
  openDialog(): void {
    this.dialogRef = this.dialog.open(ModalComponent, {
      width: '250px',
    });
  }

  onSave() { 
    this.studentData.get('roll_id')?.enable();
    let params = <studentDetail>JSON.parse(JSON.stringify(this.studentData.value));
    if(this.isUpdate){
      this.shared.editStudent(params);
    }
    else{
      this.shared.addNewStudent(params);
    }
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConstant } from '../constants/app.constant';
import { studentDetail } from '../models/student.interface';
import { apiConstant } from '../constants/api.constant';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private updateListing: boolean = false;

  constructor(private http:HttpClient) { }

  getStudents() : Observable<any>{
    return this.http.get(AppConstant.API_DOMAIN + apiConstant.GET_ALL_STUDENT);
  }

  addNewStudent(studentDetail: studentDetail): any {
    this.http.post(AppConstant.API_DOMAIN + apiConstant.ADD_NEW_STUDENT, studentDetail)
      .subscribe({
        next: (res: any) => {
          if(res?.body?.affectedRows){
            this.updateListing = true;
          }
          console.log(res as studentDetail[]);
        },
        error: (err: any) => {
          console.log(err);

        }
      });
  }

  deleteStudent(roll_id: number) :any{
    const options: any = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: { "roll_id": roll_id },
    };
    return this.http.delete(AppConstant.API_DOMAIN + apiConstant.DELETE_STUDENT, options)
   
  }

  editStudent(studentDetail: studentDetail){  
    const updateUrl = AppConstant.API_DOMAIN + apiConstant.UPDATE_STUDENT;
    this.http.put(updateUrl, studentDetail)
    .subscribe({
      next: (res: any) => {
      },
      error: (err: any) => {
        console.log(err);

      }
    });
  }

}

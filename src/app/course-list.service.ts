import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Courses } from './course';

@Injectable({
  providedIn: 'root'
})
export class CourseListService {

  private apiUrl = "http://localhost:3000/courses";

  constructor(private http:HttpClient) { }

  getCourses():Observable<Courses[]>{
    return this.http.get<Courses[]>(this.apiUrl);
  }


  saveCourses(student: Courses): Observable<Courses>{
        return this.http.post<Courses>(this.apiUrl, student);
    }
}

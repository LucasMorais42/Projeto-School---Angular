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


  save(course: Courses): Observable<Courses>{
        return this.http.post<Courses>(this.apiUrl, course);
    }

  delete(course:Courses): Observable<void>{
      return this.http.delete<void>(`${this.apiUrl}/${course.id}`);
    }
  
    update(course: Courses) : Observable<Courses> {
      return this.http.put<Courses>(`${this.apiUrl}/${course.id}`,course);
    }  
}

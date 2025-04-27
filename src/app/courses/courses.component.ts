import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CourseListService } from '../course-list.service';
import { Courses } from '../course';

@Component({
  selector: 'app-courses',
  standalone: false,
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent implements OnInit{

  Course: Courses[]=[];
  formGroupCourses : FormGroup;

  constructor(private listaCursos:CourseListService, private formBuilder: FormBuilder){
    
    this.formGroupCourses = formBuilder.group({
      id: [''],
      name:[''],
      price:[''],
      active: [true],
      promotion: [false]
    })
  }


  ngOnInit():void{
    this.listaCursos.getCourses().subscribe({
      next: json => this.Course=json
  })
}

  save(){
      this.listaCursos.saveCourses(this.formGroupCourses.value).subscribe({
          next: json =>{
            this.Course.push(json);
            this.formGroupCourses.reset();
          }
      })
  }
}

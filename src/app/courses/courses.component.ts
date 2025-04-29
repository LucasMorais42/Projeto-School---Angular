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
  isEditing: boolean = false;

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
    this.loadCourses();
}

  loadCourses(){
    this.listaCursos.getCourses().subscribe({
    next: json => this.Course=json
    })
  }

  save(){
      this.listaCursos.save(this.formGroupCourses.value).subscribe({
          next: json =>{
            this.Course.push(json);
            this.formGroupCourses.reset();
          }
      })
  }

  delete(course: Courses) {
      this.listaCursos.delete(course).subscribe(
        {
          next: () => this.loadCourses()
        }
      )
    }
  
    onClickUpdate(course: Courses) {
        this.isEditing = true;
        this.formGroupCourses.setValue(course);
    }
  
    update() {
        this.listaCursos.update(this.formGroupCourses.value).subscribe(
          {
            next: () => {
              this.loadCourses();
              this.clear();
            } 
          }
        )
    }
  
    clear() {
      this.isEditing=false;
      this.formGroupCourses.reset();
    }
}

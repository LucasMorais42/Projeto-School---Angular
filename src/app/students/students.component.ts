import { Component, OnInit } from '@angular/core';
import { ListaEstudantesService } from '../lista-estudantes.service';
import { Student } from '../student';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-students',
  standalone: false,
  templateUrl: './students.component.html',
  styleUrl: './students.component.css'
})

/*O implements OnInit significa asssim que o componente for implementado, eu irei capturar o momento
de inicialização com o OnInit, nesse método OnInit eu posso fazer algo
é tipo, "quando o component for inicializado, irei fazer algo usando o método OnInit (que pega essa inicialização"*/
export class StudentsComponent implements OnInit {

  //array que salvará os dados da API em um array do tipo Student.
  students: Student[]=[];
  formGroupStudent : FormGroup;
  isEditing: boolean = false;

  /*injeta o serviço aqui, no caso é como se eu fosse obrigar a usar o serviço ListaEstudantesService,
  e salvo essse serviço numa variável chamada listaEstudantes*/
  //Tanto "ListaEstudantesService e FormBuilder sao dependencias injetadas no nosso projeto"
  //Private formBuilder: FormBuilder -> injeta a dependencia para poder usar o formBuilder no component
  constructor(private listaEstudantes:ListaEstudantesService, private formBuilder: FormBuilder){
    
    //aqui estamos inicializando direto o formGroup, aqui diz como ele sera construido na hora que o component for chamado
    this.formGroupStudent = formBuilder.group({
      /*aqui eu estou listando oq tera no meu objeto "FormGroupStudent", basicamente esta falando que eu terei 3 arrays
      iniciados como vazio, e importante estar alinhado com o objeto STUDENT.TS*/
      id: [''],
      name:[''],
      course:['']
    })
  }

  //função que faz algo na hora que é inicializado o componente
  ngOnInit():void{
    //como a API é um OBSERVABLE, aqui tem que ser um SUBSCRIBE!
    this.loadStudents();
      //next significa que deu certo com a API, nesse caso os dados da API (json) são atribuidos a lista students
}

  loadStudents(){
    this.listaEstudantes.getAll().subscribe({
      next: json => this.students=json
    })
  }

  save(){
    /*ao chamar o metodo save, vai chamar o serviço listaEstudantes, no metodo saveStudent
      vai passar o valor que esta no FORMGROUPSTUDENT (ou seja, os valores que eu deixei la nos
      inputs do form, apos isso vamos chamar a funcao assincrona do RXJS (subscribe)*/
      this.listaEstudantes.save(this.formGroupStudent.value).subscribe({

          //o next significa que deu certo na requisiçao com a API JSON
          next: json =>{
            /*se der certo com a api (ou seja next: json), vamos dar um push (adicionar) no array students
            e resetara (limpar) o formulario*/
            this.students.push(json);
            this.formGroupStudent.reset();
          }
      })
  }

  delete(student: Student) {
    this.listaEstudantes.delete(student).subscribe(
      {
        next: () => this.loadStudents()
      }
    )
  }

  onClickUpdate(student: Student) {
      this.isEditing = true;
      this.formGroupStudent.setValue(student);
  }

  update() {
      this.listaEstudantes.update(this.formGroupStudent.value).subscribe(
        {
          next: () => {
            this.loadStudents();
            this.clear();
          } 
        }
      )
  }

  clear() {
    this.isEditing=false;
    this.formGroupStudent.reset();
  }
}

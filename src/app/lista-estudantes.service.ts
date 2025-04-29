import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from './student';

@Injectable({
  providedIn: 'root'
})
export class ListaEstudantesService {

  private apiUrl = "http://localhost:3000/students";

  constructor(private http:HttpClient) { }
  
  //O método getStudents irá pegar um Observável (resposta da API), irá pegar um tipo array de Estudantes
  getAll():Observable<Student[]>{
    //retorna uma resposta da API, pega os elementos da API e retorna em um array do tipo Estudantes
    return this.http.get<Student[]>(this.apiUrl);
  }

  /*Metodo para salvar um estudante no json server, ele recebe um objeto Student que vem la do formGroup
  recebe um Observable <Student>, que e uma resposta da API, esse estudante da API tem o ID,
  que e gerado pelo proprio JSON SERVER*/
  save(student: Student): Observable<Student>{
     /*retorna uma requisiçao http, com o metodo POST (de enviar dados pro banco de dados)
     passa como parametros do metodo post a API, o objeto student do FormGroup e espera uma resposta do
     tipo STUDENT*/
      return this.http.post<Student>(this.apiUrl, student);
  }

  delete(student:Student): Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/${student.id}`);
  }

  update(student: Student) : Observable<Student> {
    return this.http.put<Student>(`${this.apiUrl}/${student.id}`,student);
  }
}

import { TestBed } from '@angular/core/testing';

import { ListaEstudantesService } from './lista-estudantes.service';

describe('ListaEstudantesService', () => {
  let service: ListaEstudantesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListaEstudantesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

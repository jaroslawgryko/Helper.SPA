/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { JednostkaListaComponent } from './jednostka-lista.component';

describe('JednostkaListaComponent', () => {
  let component: JednostkaListaComponent;
  let fixture: ComponentFixture<JednostkaListaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JednostkaListaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JednostkaListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

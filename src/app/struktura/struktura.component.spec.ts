/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { StrukturaComponent } from './struktura.component';

describe('StrukturaComponent', () => {
  let component: StrukturaComponent;
  let fixture: ComponentFixture<StrukturaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StrukturaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StrukturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RwaComponent } from './rwa.component';

describe('RwaComponent', () => {
  let component: RwaComponent;
  let fixture: ComponentFixture<RwaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RwaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RwaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

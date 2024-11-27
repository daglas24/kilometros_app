import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Crud1Page } from './crud1.page';

describe('Crud1Page', () => {
  let component: Crud1Page;
  let fixture: ComponentFixture<Crud1Page>;

  beforeEach(() => {
    fixture = TestBed.createComponent(Crud1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

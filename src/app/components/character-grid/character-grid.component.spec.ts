import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterGridComponent } from './character-grid.component';

describe('CharacterGridComponent', () => {
  let component: CharacterGridComponent;
  let fixture: ComponentFixture<CharacterGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CharacterGridComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharacterGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

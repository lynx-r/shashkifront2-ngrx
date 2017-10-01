import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardComponent } from './board.component';
import { FormsModule } from '@angular/forms';
import { SquareComponent } from './square/square.component';
import { DraughtComponent } from './draught/draught.component';

describe('BoardComponent', () => {
  let component: BoardComponent;
  let fixture: ComponentFixture<BoardComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [BoardComponent, SquareComponent, DraughtComponent],
        imports: [FormsModule],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

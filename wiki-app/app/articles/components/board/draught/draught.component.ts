import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Draught } from '../../../models/draught';
import { Square } from '../../../models/square';
import { Article } from '../../../models/article';
import { Move } from '../../../models/move';
import { Subscription } from 'rxjs/Subscription';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'draught',
  template: `
    <div class="draught-container fit">
      <div #draughtRef
           [ngStyle]="{'color': draught?.black ? 'black' : 'white'}"
           [ngClass]="{
       'beaten' : draught?.beaten,
     'highlight': draught?.highlighted,
     'draught': !draught?.queen,
     'draught-queen': draught?.queen}"
           (click)="onDraughtClick()">
        <md-icon *ngIf="draught?.queen">spa</md-icon>
      </div>
    </div>
  `,
  styleUrls: ['./draught.component.css'],
})
export class DraughtComponent implements OnInit, OnDestroy {
  @ViewChild('draughtRef') draughtRef: ElementRef;
  @Input() draught: Draught;
  @Input() playsBlack: boolean;
  private allowedSquares: Square[];
  private beatenPos: Square[];
  private size: number;
  editMode: boolean;
  article: Article;
  private moveToSubscription: Subscription;

  constructor() {}

  ngOnInit() {
    // if (this.square) {
    // this.draught = this.square.draught;
    // берем 80% от размера клетки
    // this.size = this.square.size - this.square.size / 10 * 2;
    // if (this.draught.highlighted) {
    //   this.highlightAllowedFor(this.square);
    // }
    // }
    // this.moveToSubscription = this.boardService.moveToSquareEvent.subscribe(
    //   (target: Move) => {
    //     this.moveDraughtTo(target);
    //   }
    // );
    // this.boardService.observableEditMode().subscribe(mode => {
    //   if (mode) {
    //     this.highlightAllowedFor(null);
    //     this.draught.highlighted = false;
    //   }
    // });
  }

  ngOnDestroy() {
    // this.moveToSubscription.unsubscribe();
  }

  onDraughtClick() {
    // this.draught.toggleState();
    if (!this.editMode && this.playsBlack == this.draught.black) {
      // this.highlightAllowedFor(this.square);
    }
  }

  private highlightAllowedFor(square: Square) {
    const config = {
      selectedSquare: square,
    };
    // this.boardService.highlightAllowedFor(config, highlighted => {
    //   if (square) {
    //     square.draught.highlighted = true;
    //   }
    //   this.beatenPos = highlighted.beaten;
    //   this.allowedSquares = <Square[]>highlighted.allowed;
    // });
  }

  private moveDraughtTo(moveTo: Move) {
    let targetSquare = moveTo.targetSquare;
    // if (
    //   (targetSquare.occupied && targetSquare.draught.beaten) ||
    //   !this.allowedSquares ||
    //   (!moveTo.undoMove &&
    //     !Utils.containsSquare(this.allowedSquares, targetSquare)) ||
    //   !this.draught.highlighted ||
    //   !targetSquare.main ||
    //   targetSquare == this.square
    // ) {
    //   return;
    // }
    const config = {
      // boardId: this.article.ac-board.id,
      allowed: this.allowedSquares,
      beaten: this.beatenPos,
      // selectedSquare: this.square,
      draughtRefElement: this.draughtRef.nativeElement,
      targetSquare: targetSquare,
    };
    if (moveTo.undoMove) {
      // this.moveDraughtToTween(moveTo.moveDist, targetSquare);
      return;
    }
    let move = {
      moveDist: { queen: false, v: -60, h: 60 },
      selectedSquare: { v: 5, h: 4, main: true, highlighted: false, size: 60 },
      targetSquare: { v: 4, h: 5, main: true, highlighted: false, size: 60 },
    };
    // this.moveDraughtToTween(move, targetSquare, this.draughtRef.nativeElement);
    let animParams = {
      draughtRefElement: this.draughtRef.nativeElement,
    };
  }

  // private moveDraughtToTween(move, targetSquare: Square, target?: any) {
  //   target = target || this.draughtRef.nativeElement;
  //   TweenLite.to(target, .3, {
  //     css: {x: `${move.h}px`, y: `${move.v}px`},
  //     ease: Linear.easeNone,
  //     onComplete: () => {
  //       this.boardService.beatDraughts(this.beatenPos);
  //       this.boardService.moveDraught(this.square, this.draught, targetSquare, move.queen);
  //       this.allowedSquares = [];
  //       this.beatenPos = [];
  //       this.boardService.resetHighlight();
  //     }
  //   });
  // }
}

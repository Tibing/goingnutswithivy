import { Component, EventEmitter, Input, Output } from '@angular/core';

import { AutoUnsubscribe } from './auto-unsubscribe';
import { interval } from 'rxjs';
import { Connect } from './connect';
import { increment } from './counter.actions';

@AutoUnsubscribe
@Component({
  selector: 'app-test',
  template: `
    test
  `,
})
export class TestComponent {
  subscription1$ = interval().subscribe();
  subscription2$ = interval().subscribe();
}

@Connect({
  inputs: { counter: 'count' },
  outputs: { increment },
})
@Component({
  selector: 'app-root',
  template: `
    {{counter}}
    <button (click)="increment.emit()">Increase</button>
  `,
})
export class AppComponent {
  @Input() counter;
  @Output() increment = new EventEmitter();
}

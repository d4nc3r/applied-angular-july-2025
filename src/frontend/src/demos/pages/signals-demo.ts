import {
  Component,
  ChangeDetectionStrategy,
  signal,
  computed,
  effect,
} from '@angular/core';

@Component({
  selector: 'app-demos-signals',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <h2>Signals Demos</h2>
    <div>
      <p>Your Score: {{ score() }}</p>
      <button (click)="takeStroke()" class="btn btn-primary">
        Take a Stroke
      </button>

      @if (underPar()) {
        <div class="badge badge-success">You are doing good</div>
      } @else {
        <div class="badge badge-error">You are over par :(</div>
      }

      <button
        [disabled]="score() === 0"
        (click)="score.set(0)"
        class="btn btn-info"
      >
        Reset
      </button>
      <div>Tick: {{ tick() }}</div>
    </div>
  `,
  styles: ``,
})
export class SignalsDemo {
  score = signal(0);
  tick = signal(0);
  par = signal(3);
  underPar = computed(() => this.score() <= this.par());

  takeStroke() {
    this.score.update((s) => s + 1);
  }

  constructor() {
    const intervalId = setInterval(() => this.tick.update((t) => t + 1), 1000);
    // effects must run in an injection context in angular
    // injection context in a component is the constructor
    // meant to do something when a value changes (can be used for things like timers)
    effect((onCleanup) => {
      const currentScore = this.score();

      if (currentScore > 8) {
        console.log(`go home, you're drunk.`);
      }

      onCleanup(() => console.log('clean up', intervalId));
    });
  }
}

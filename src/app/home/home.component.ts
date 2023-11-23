import { Component, HostListener } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  snake: any[] = [];
  food: any = {};
  gridSize: number = 19;
  interval: any;
  running: boolean = false;
  direction: string = 'right';
  gameSpeed: number = 200;
  score: number = 0;

  ngOnInit() {
    this.startGame();
  }

  startGame() {
    this.snake = [
      { x: 100, y: 200 },
      { x: 80, y: 200 },
      { x: 60, y: 200 }
    ];
    this.food = this.generateFood();
    this.running = true;
    this.interval = setInterval(() => {
      this.moveSnake();
    }, this.gameSpeed);
  }

  generateFood(): { x: number; y: number; } {
  let x: number, y: number;
  do {
    x = Math.floor(Math.random() * (this.gridSize - 1)) * 20;
    y = Math.floor(Math.random() * (this.gridSize - 1)) * 20;
  } while (this.snake.some(segment => segment.x === x && segment.y === y));
  return { x, y };
  }


  moveSnake() {
    let newHead = { ...this.snake[0] };
    if (this.direction === 'right') {
      newHead.x += 20;
    } else if (this.direction === 'left') {
      newHead.x -= 20;
    } else if (this.direction === 'up') {
      newHead.y -= 20;
    } else if (this.direction === 'down') {
      newHead.y += 20;
    }

    if (this.checkCollision(newHead)) {
      this.gameOver();
      return;
    }

    if (newHead.x === this.food.x && newHead.y === this.food.y) {
      this.score += 10;
      this.food = this.generateFood();
      this.increaseSpeed();
    } else {
      this.snake.pop();
    }

    this.snake.unshift(newHead);
  }

  increaseSpeed() {
    if (this.gameSpeed > 30) {
      this.gameSpeed -= 5;
      clearInterval(this.interval);
      this.interval = setInterval(() => {
        this.moveSnake();
      }, this.gameSpeed);
    }
  }

  checkCollision(head: any) {
    return (
      head.x < 0 ||
      head.y < 0 ||
      head.x >= this.gridSize * 20 ||
      head.y >= this.gridSize * 20 ||
      this.snake.some(segment => segment.x === head.x && segment.y === head.y)
    );
  }

  gameOver() {
    this.running = false;
    clearInterval(this.interval);
    alert('Game Over!');
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (!this.running) return;
    const key = event.key;
    const allowedMoves = {
      ArrowUp: 'up',
      ArrowDown: 'down',
      ArrowLeft: 'left',
      ArrowRight: 'right'
    };

    const move = allowedMoves[key as keyof typeof allowedMoves];
    if (move && this.isValidMove(move)) {
      this.direction = move;
    }
  }

  isValidMove(move: string) {
    if (this.direction === 'up' && move === 'down') return false;
    if (this.direction === 'down' && move === 'up') return false;
    if (this.direction === 'left' && move === 'right') return false;
    if (this.direction === 'right' && move === 'left') return false;
    return true;
  }
}

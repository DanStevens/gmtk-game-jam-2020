export class GameState {

  _lives = 3;
  _score = 0;

  _catsReturnedinARow = 0;

  get catsReturnedinARow() {
    return this._catsReturnedinARow;
  }

  set catsReturnedinARow(newValue) {
    // If there are more than 5 returned in a row then add a life
    if (newValue > 5) {
      this.gainLife();
      this._catsReturnedinARow = 0;
    } else {
      this._catsReturnedinARow = newValue;
    }
  }

  get lives() {
    return this._lives;
  }

  get score() {
    return this._score;
  }

  loseLife() {
    // Reset cats returned
    this.catsReturnedinARow = 0;
    this._lives--;
  }

  gainLife() {
    this._lives++;
  }

  increaseScore(amount: number) {
    // Increase cats returned
    this.catsReturnedinARow++;
    this._score += amount;
  }

}

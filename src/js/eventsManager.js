export default class EventsManager {
  constructor(gameManager) {
    this.gameManager = gameManager;
    this.newGame = null;
  }

  init() {
    this.gameManager.startGame();

    // this.addOnCellClickListner();
  }
}

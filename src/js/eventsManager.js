export default class EventsManager {
  constructor(gameManager) {
    this.gameManager = gameManager;

    this.button = document.querySelector('.button'); // кнопка новая игра
    this.miss = document.querySelector('.miss'); // сообщ вы проиграли
    this.wins = document.querySelector('.wins'); // сообщ вы победили
    this.modal = document.querySelector('.modal');

    this.countWins = 0;
    this.countMiss = 0;
    this.countShow = this.gameManager.countShow;

    this.containerWins = document.querySelector('.control_wins span');
    this.containerMiss = document.querySelector('.control_miss span');
    // this.containerShow = document.querySelector('.control_show  span');

    // this.intGob = this.gameManager.intervalGenerateGoblin(this.interval);
  }

  init() { // стартовать игру
    this.gameManager.startGame();
    this.clickItem(); // следим за кликами

    // this.eventShowGoblin(); // считаем появления гоблина
    this.button.addEventListener('click', this.onClickNewGame());
    // событие кнопки работает, но только сбрасывает счетчики
  }

  clickItem() { // проверяет попал или нет
    const field = document.getElementsByTagName('td'); // массив всех ячеек
    for (let i = 0; i < field.length; i += 1) {
      field[i].addEventListener('click', () => { // следим за кликами по ячейкам
        if (field[i].classList.contains('goblin')) { // если в ячейке стоял гоблин
          this.countWins += 1; // добавить в очкам попадания
          this.containerWins.textContent = this.countWins;// !! изменить счетчик на экране
          field[i].className = 'board-item';
        } else { // гоблина не было
          this.countMiss += 1; // добавить к промахам
          this.containerMiss.textContent = this.countMiss;// !! изменить счетчик на экране
        }
        this.countsControl(this.countShow, this.countMiss, this.countWins);
        // контроль счетчиков после каждого клика
      });
    }
  }

  // eventShowGoblin() {
  // this.intGob.addEventListener('call', () => {
  // this.countShow += 1;
  // this.containerShow.textContent = this.countShow;
  // this.countsControl(this.countShow, this.countMiss, this.countWins);
  // });
  // если была вызвана intervalGenerateGoblin(interval) то  this.countShow += 1;

  // контроль счетчиков после каждого вызова
  // }

  showModal() { // показывает всплывающее окно
    this.modal.classList.remove('hidden');
    this.button.classList.remove('hidden');// показываем кнопк

    this.gameManager.stopGenerateGoblin();// перестаем генерить гоблина
  }

  closeModal() { // скрываем все элементы всплывающего окна
    this.modal.classList.add('hidden');

    this.button.classList.add('hidden');

    if (!this.miss.classList.contains('hidden')) {
      this.miss.classList.add('hidden');
    }
    if (!this.wins.classList.contains('hidden')) {
      this.wins.classList.add('hidden');
    }
  }

  onClickNewGame() { // нажата новая игра
    this.button.addEventListener('click', () => {
      this.resetCounts();
      this.closeModal(); // закрыть всплывающее окно
      this.button.removeEventListener('click', this.onClickNewGame);
      this.gameManager.clearBoard();
      this.init(); // стартовать игру
    });
  }

  countsControl(countShow, countMiss, countWins) { // контроль счетчиков
    if ((countShow - countWins) > 5 || countMiss >= 5) {
      this.showModal(); // показываем всплывающее окно
      this.miss.classList.remove('hidden');// показываем вы проиграли
    }
    if (countWins >= 10) {
      this.showModal(); // показываем всплывающее окно
      this.wins.classList.remove('hidden');// показываем вы победили
    }
  }

  resetCounts() {
    this.countMiss = 0;
    this.countWins = 0;
    this.gameManager.countShow = 0;
    this.containerWins.textContent = this.countWins;
    this.containerMiss.textContent = this.countMiss;
    this.gameManager.containerShow.textContent = this.gameManager.countShow;
  }
}

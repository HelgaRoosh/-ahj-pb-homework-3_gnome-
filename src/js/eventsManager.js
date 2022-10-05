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
  }

  init() { // стартовать игру
    this.gameManager.startGame();
    this.clickItem(); // следим за кликами
    this.eventShowGoblin(); // считаем появления гоблина
  }

  clickItem() { // проверяет попал или нет
    const field = document.getElementsByTagName('td'); // массив всех ячеек
    for (let i = 0; i < field.length; i += 1) {
      field[i].addEventListener('click', () => { // следим за кликами по ячейкам
        if (field[i].classList.contains('goblin')) { // если в ячейке стоял гоблин
          this.countWins += 1; // добавить в очкам попадания
          // !! изменить счетчик на экране
        } else { // гоблина не было
          this.countMiss += 1; // добавить к промахам
          // !! изменить счетчик на экране
        }
        this.countsControl(this.countShow, this.countMiss, this.countWins);
        // контроль счетчиков после каждого клика
      });
    };
  }

  eventShowGoblin() {
    // если была вызвана intervalGenerateGoblin(interval) то  this.countShow += 1;

    // !! изменить счетчик на экране
    this.countsControl(this.countShow, this.countMiss, this.countWins);
    // контроль счетчиков после каждого вызова
  }

  showModal() { // показывает всплывающее окно
    this.modal.classList.remove('hidden');
    this.button.addEventListener('click', this.onClickNewGame); // следим за событием нажатия новая игра
  }

  closeModal() { // скрываем все элементы всплывающего окна
    if (!this.button.classList.contains('hidden')) { // если не содержит свойство скрыт
      this.button.classList.add('hidden'); // то добавить скрыт
    }
    this.button.removeEventListener('click', this.onClickNewGame); // не следим больше за кнопкой

    if (!this.miss.classList.contains('hidden')) {
      this.miss.classList.add('hidden');
    }

    if (!this.wins.classList.contains('hidden')) {
      this.wins.classList.add('hidden');
    }
    if (!this.modal.classList.contains('hidden')) {
      this.modal.classList.add('hidden');
    }
  }

  onClickNewGame() { // нажата новая игра
    this.closeModal(); // закрыть всплывающее окно
    this.gameManager.clearAll(); // очистить поле от гоблина
    this.init(); // стартовать игру
  }

  countsControl(countShow, countMiss, countWins) { // контроль счетчиков
    if ((countShow - countWins) > 5 || countMiss >= 5) {
      this.showModal(); // показываем всплывающее окно
      this.miss.classList.remove('hidden');// показываем вы проиграли
      this.button.classList.remove('hidden');// показываем кнопку
      this.countMiss = 0;
      this.countWins = 0;
      this.countShow = 0;
    }
    if (countWins >= 10) {
      this.showModal(); // показываем всплывающее окно
      this.wins.classList.remove('hidden');// показываем вы победили
      this.button.classList.remove('hidden');// показываем кнопку
      this.countMiss = 0;
      this.countWins = 0;
      this.countShow = 0;
    }
  }
}

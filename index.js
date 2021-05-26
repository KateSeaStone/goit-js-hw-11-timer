
class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.refs = this.createRefs(selector);
    this.targetDate = targetDate;
  }

  createRefs(selector) {
    const selectorRef = document.querySelector(selector);
    return {
      days: selectorRef.querySelector('span[data-value="days"]'),
      hours: selectorRef.querySelector('span[data-value="hours"]'),
      mins: selectorRef.querySelector('span[data-value="mins"]'),
      secs: selectorRef.querySelector('span[data-value="secs"]'),
    }
  }

  startTimer() {
    setInterval(() => {
      const currenttTime = Date.now();
      const deltaTime = this.targetDate - currenttTime;
      const time = this.getTimerComponents(deltaTime);

      this.updateTimerface(time);

    }, 1000)
  }

  updateTimerface({ days, hours, mins, secs }) {
    this.refs.days.textContent = days;
    this.refs.hours.textContent = hours;
    this.refs.mins.textContent = mins;
    this.refs.secs.textContent = secs;
  }

  getTimerComponents(time) {
    /*
     * Оставшиеся дни: делим значение UTC на 1000 * 60 * 60 * 24, количество
     * миллисекунд в одном дне (миллисекунды * секунды * минуты * часы)
     */
    const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));

    /*
     * Оставшиеся часы: получаем остаток от предыдущего расчета с помощью оператора
     * остатка % и делим его на количество миллисекунд в одном часе
     * (1000 * 60 * 60 = миллисекунды * минуты * секунды)
     */
    const hours = this.pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));

    /*
     * Оставшиеся минуты: получаем оставшиеся минуты и делим их на количество
     * миллисекунд в одной минуте (1000 * 60 = миллисекунды * секунды)
     */
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));

    /*
     * Оставшиеся секунды: получаем оставшиеся секунды и делим их на количество
     * миллисекунд в одной секунде (1000)
     */
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

    return { days, hours, mins, secs };
  }


  pad(value) {
    //проверка для дней (может состоять из более 2 цифр)
    return String(value).padStart(2, '0');
  }
}


const timer = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('Jun 12, 2021'),
});



timer.startTimer();









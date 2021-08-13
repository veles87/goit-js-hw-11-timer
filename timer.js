class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.selector = selector;
    this.targetDate = targetDate;
    this.refs = {
      days: document.querySelector('span[data-value="days"]'),
      hours: document.querySelector('span[data-value="hours"]'),
      mins: document.querySelector('span[data-value="mins"]'),
      secs: document.querySelector('span[data-value="secs"]'),
    };
    this.intervalId = null;
  }

  start() {
    const startDate = this.targetDate.getTime();
    this.intervalId = setInterval(() => {
      const currentDate = Date.now();
      const deltaDate = startDate - currentDate;
      if (deltaDate <= 0) {
        clearInterval(this.intervalId);
      }
      this.getTimeComponents(deltaDate);
    }, 1000);
  }

  getTimeComponents(time) {
    const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = this.pad(
      Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    );
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));
    this.updateTimer(days, hours, mins, secs);
  }

  pad(value) {
    return String(value).padStart(2, '0');
  }

  updateTimer(days, hours, mins, secs) {
    this.refs.days.textContent = `${days}`;
    this.refs.hours.textContent = `${hours}`;
    this.refs.mins.textContent = `${mins}`;
    this.refs.secs.textContent = `${secs}`;
  }
}

const timer = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('Jun 13, 2022'),
});

timer.start();
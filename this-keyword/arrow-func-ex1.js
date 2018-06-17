const counter = {
  count: 0,
  increase() {
    setInterval(function () {
      console.log(++this.count);
    }, 1000);
  }
}
counter.increase();
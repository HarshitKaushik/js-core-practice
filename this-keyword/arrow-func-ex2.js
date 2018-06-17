const counter = {
  count: 0,
  increase() {
    setInterval(() => {
      console.log(++this.count);
    }, 1000);
  },
};
counter.increase();
for (var i = 0; i < 100; i++) {
  (function 클로저(j) {
    setTimeout(function (i) {
      console.log(j);
    }, j * 1000);
  })(i);
}

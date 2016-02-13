(function() {
  var game = {
    highlights: {
      'sq1': "#F00",
      'sq2': "#0F0",
      'sq3': "#00F",
      'sq4': "#FF0",
    },
    normal: {
      'sq1': "#C00",
      'sq2': "#0C0",
      'sq3': "#00C",
      'sq4': "#CC0",
    },
    running: false,
    strict: false,
    toggleRunning: function() {
      if (this.running) {

      } else {

      }
      this.resetGame();
      this.running = !this.running;
    },
    resetGame: function() {},
    clickQuadrant: function(id) {
      console.log('clicked ' + id);
      // audio1.currentTime = 0;
      // audio1.play();
      // color = tlHighlight;
      $("#" + id).css("background-color", this.highlights[id]);

    },
  };
  var tlHighlight = "#F00";
  var trHighlight = "#0F0";
  var blHighlight = "#00F";
  var brHighlight = "#FF0";

  // audioX.play();
  var audio1 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
  var audio2 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
  var audio3 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
  var audio4 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');
  $(".quadrant").click(function(e) {
    var id = e.currentTarget.getAttribute('id');
    game.clickQuadrant(id);
  });
  $("#switch").click(function(e) {
    $("#switch-position").css('left', '28px');
  });
})();
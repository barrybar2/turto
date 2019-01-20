var app = new Vue({
  el: "#root",
  data: {
    tiles: settings,
    directions: ["north", "east", "south", "west"],
    direction: "",
    currentLocation: [],
    instructions: instructions
  },
  methods: {
    rotateTurtle: function() {
      let currentIndex, newIndex;
      //get the current index direction
      currentIndex = this.directions.indexOf(this.direction);
      // what is the next direction :
      newIndex = currentIndex === 3 ? 0 : currentIndex + 1;
      // set the new direction
      this.direction = this.directions[newIndex];
      return this.directions[newIndex];
    },
    moveTurtle: function() {
      //get current location of turtle and set the new location based on that

      if (this.direction === "north") {
        this.currentLocation[1]--;
      } else if (this.direction === "east") {
        this.currentLocation[0]++;
      } else if (this.direction === "south") {
        this.currentLocation[1]++;
      } else if (this.direction === "west") {
        this.currentLocation[0]--;
      }
      return this.currentLocation;
    },
    processData: function(arr) {
      // run the moves every 1 second.
      let timer = 0;
      for (let i = 0; i < arr.length; i++) {
        var me = this;
        var process = function() {
          me.removeTurtle();
          if (arr[i] === "r") {
            me.rotateTurtle();
            me.updateTurtle();
          } else if (arr[i] === "m") {
            me.moveTurtle();
            me.updateTurtle();
          }
        };
        window.setTimeout(process, timer);
        timer += 600;
      }
    },
    // when the page has mounted, set the current Location aray.
    findTurtleLocation: function() {
      for (let i = 0; i < this.tiles.length; i++) {
        for (let j = 0; j < this.tiles[i].length; j++) {
          if (this.tiles[i][j].includes("turtle")) {
            Vue.set(this.currentLocation, 0, j);
            Vue.set(this.currentLocation, 1, i);
            this.direction = this.tiles[i][j].substr(
              7,
              this.tiles[i][j].length
            );
          }
        }
      }
    },
    tileValidated: function(x, y) {
      // Even if you have inputted more steps, still complete if user reaches exit
      if (x === -1 || y === -1) {
        alert("oops you fell off Flat Earth");
        location.reload();
      }
      const tile = this.tiles[y][x];
      if (tile === "exit") {
        alert("congrats, you are doing great!");
        location.reload();
      } else if (tile === "bomb") {
        alert("oops you exploded :(");
        location.reload();
      } else if (x > this.tiles[x].length || y > this.tiles[x].length) {
        alert("oops you fell off flat earth");
        location.reload();
      }
      return true;
    },
    removeTurtle: function() {
      const x = this.currentLocation[0],
        y = this.currentLocation[1];
      Vue.set(this.tiles[y], x, "");
    },
    updateTurtle: function() {
      const x = this.currentLocation[0],
        y = this.currentLocation[1];
      if (this.tileValidated(x, y)) {
        Vue.set(this.tiles[y], x, "turtle " + this.direction);
      }
    }
  },
  mounted: function() {
    this.findTurtleLocation();
  }
});

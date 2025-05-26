export class Circle {
  constructor(options) {
    this.points = [];
    this.resolution = (options.resolution || 1);
    this.x = (options.x || 0);
    this.y = (options.y || 0);
    this.r = (options.r || 0);
    this.start = (options.start || 0);
    this.end = (options.end || 60);
    this.rotate = (options.rotate || 180);
    for (var i = this.start; i < this.end; i += this.resolution) {
      var tmp = {
        x: this.x + Math.cos((i * Math.PI) / this.rotate) * this.r,
        y: this.y + Math.sin((i * Math.PI) / this.rotate) * this.r,
      };
      this.points.push(tmp);
    }
  }
  toPolyLine() {
    var sin = "";
    for (var point of this.points) {
      sin += `${point.x},${point.y} `;
    }
    return sin;
  }
  round() {
    for (var point of this.points) {
      point.x = Math.round(point.x);
      point.y = Math.round(point.y);
    }
  }
  toCanvas(context) {
    var i = 0;
    for (var point of this.points) {
      if (i == 0) {
        context.moveTo(point.x, point.y);
        i++;
      } else {
        context.lineTo(point.x, point.y);
        i++;
      }
    }
  }
  toJSON(replace, space) {
    return JSON.stringify(this.points);
  }
}

class Shape {
  constructor(x, y, options) {
    this.x = x;
    this.y = y;
    this.options = options;
  }

  draw(ctx) {
    // To be overridden by subclasses
  }

  contains(x, y) {
    // To be overridden by subclasses
  }

  move(dx, dy) {
    this.x += dx;
    this.y += dy;
  }
}

export default Shape;

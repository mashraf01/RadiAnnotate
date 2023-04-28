import Shape from "./shape.js";

class Highlight extends Shape {
  constructor(x, y, width, height, options) {
    super(x, y, options);
    this.width = width;
    this.height = height;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = this.options.highlightColor;
    ctx.globalAlpha = this.options.highlightOpacity;
    ctx.fill();
    ctx.globalAlpha = 1;
  }

  contains(x, y) {
    return (
      x >= this.x &&
      x <= this.x + this.width &&
      y >= this.y &&
      y <= this.y + this.height
    );
  }

  resize(x, y) {
    this.width = x - this.x;
    this.height = y - this.y;
  }
}

export default Highlight;

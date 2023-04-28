import Shape from "./shape";

class Square extends Shape {
  constructor(x, y, size, options) {
    super(x, y, options);
    this.size = size;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.rect(
      this.x - this.size / 2,
      this.y - this.size / 2,
      this.size,
      this.size
    );
    ctx.strokeStyle = this.options.strokeColor;
    ctx.lineWidth = this.options.strokeWidth;
    ctx.stroke();
  }

  contains(x, y) {
    return (
      x >= this.x - this.size / 2 &&
      x <= this.x + this.size / 2 &&
      y >= this.y - this.size / 2 &&
      y <= this.y + this.size / 2
    );
  }
}

export default Square;

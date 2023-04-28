import Shape from "./shape.js";

class Text extends Shape {
  constructor(x, y, text, options) {
    super(x, y, options);
    this.text = text;
    this.metrics = null;
  }

  draw(ctx) {
    ctx.font = `${this.options.fontSize}px ${this.options.fontFamily}`;
    ctx.fillStyle = this.options.fontColor;
    ctx.textBaseline = "top";
    this.metrics = ctx.measureText(this.text);
    ctx.fillText(this.text, this.x, this.y);
  }

  contains(x, y) {
    if (!this.metrics) {
      return false;
    }

    const width = this.metrics.width;
    const height = parseInt(this.options.fontSize, 10);

    return (
      x >= this.x && x <= this.x + width && y >= this.y && y <= this.y + height
    );
  }
}

export default Text;

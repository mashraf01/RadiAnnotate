import Shape from "./shape";

class Arrow extends Shape {
  constructor(x1, y1, x2, y2, options) {
    super(x1, y1, options);
    this.x2 = x2;
    this.y2 = y2;
  }

  draw(ctx) {
    const headLength = 10;
    const headWidth = 7;
    const dx = this.x2 - this.x;
    const dy = this.y2 - this.y;
    const angle = Math.atan2(dy, dx);

    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x2, this.y2);
    ctx.strokeStyle = this.options.strokeColor;
    ctx.lineWidth = this.options.strokeWidth;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(this.x2, this.y2);
    ctx.lineTo(
      this.x2 - headLength * Math.cos(angle - Math.PI / 6),
      this.y2 - headLength * Math.sin(angle - Math.PI / 6)
    );
    ctx.lineTo(
      this.x2 - headLength * Math.cos(angle + Math.PI / 6),
      this.y2 - headLength * Math.sin(angle + Math.PI / 6)
    );
    ctx.lineTo(this.x2, this.y2);
    ctx.fillStyle = this.options.strokeColor;
    ctx.fill();
  }

  contains(x, y) {
    // This is a simplified hit test for arrows that only checks if the point
    // is close to the line segment. A more precise implementation would also
    // consider the arrowhead.
    const dx = this.x2 - this.x;
    const dy = this.y2 - this.y;
    const length = Math.sqrt(dx * dx + dy * dy);
    const tolerance = 5;

    const crossProduct = Math.abs((y - this.y) * dx - (x - this.x) * dy);
    const distanceToLine = crossProduct / length;

    if (distanceToLine > tolerance) {
      return false;
    }

    const dotProduct = (x - this.x) * dx + (y - this.y) * dy;
    if (dotProduct < 0 || dotProduct > length * length) {
      return false;
    }

    return true;
  }
}

export default Arrow;

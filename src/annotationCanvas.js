import Circle from "./shapes/circle.js";
import Square from "./shapes/square.js";
import Arrow from "./shapes/arrow.js";
import Text from "./shapes/text.js";
import Highlight from "./shapes/highlight.js";

class AnnotationCanvas {
  constructor(canvas, options) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.options = options || {};

    this.annotations = [];
    this.currentAnnotation = null;
    this.isDrawing = false;
    this.selectedTool = 'circle'; // Default tool

    this.initListeners();
  }

  initListeners() {
    this.canvas.addEventListener('mousedown', (event) => {
      const rect = this.canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
  
      const selectedAnnotation = this.getSelectedAnnotation(x, y);
  
      if (selectedAnnotation) {
        this.currentAnnotation = selectedAnnotation;
        this.isDrawing = false;
      } else {
        this.currentAnnotation = this.createAnnotation(x, y);
        this.isDrawing = true;
      }
    }); // <-- This closing brace was missing
  
    this.canvas.addEventListener('mousemove', (event) => {
      if (!this.currentAnnotation) return;
  
      const rect = this.canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
  
      if (this.isDrawing) {
        this.updateAnnotation(x, y);
      } else {
        this.currentAnnotation.move(x - this.currentAnnotation.x, y - this.currentAnnotation.y);
      }
  
      this.draw();
    });
  
    this.canvas.addEventListener('mouseup', () => {
      this.currentAnnotation = null;
      this.isDrawing = false;
    });
  }
  
createAnnotation(x, y) {
  let annotation;
  const options = {
    strokeColor: this.options.strokeColor || '#000',
    strokeWidth: this.options.strokeWidth || 2,
    fontSize: this.options.fontSize || 14,
    fontFamily: this.options.fontFamily || 'Arial',
    fontColor: this.options.fontColor || '#000',
    highlightColor: this.options.highlightColor || 'rgba(255, 255, 0, 0.5)',
    highlightOpacity: this.options.highlightOpacity || 0.5,
  };

  switch (this.selectedTool) {
    case 'circle':
      annotation = new Circle(x, y, 0, options);
      break;
    case 'square':
      annotation = new Square(x, y, 0, options);
      break;
    case 'arrow':
      annotation = new Arrow(x, y, x, y, options);
      break;
    case 'text':
      const text = prompt('Enter the text:', '');
      if (text === null || text.trim() === '') return;
      annotation = new Text(x, y, text, options);
      break;
    case 'highlight':
      annotation = new Highlight(x, y, 0, 0, options);
      break;
    default:
      return;
  }

  this.annotations.push(annotation);
  return annotation;
}

updateAnnotation(x, y) {
  if (!this.currentAnnotation) return;

  switch (this.selectedTool) {
    case 'circle':
      this.currentAnnotation.radius = Math.sqrt(Math.pow(x - this.currentAnnotation.x, 2) + Math.pow(y - this.currentAnnotation.y, 2));
      break;
    case 'square':
      this.currentAnnotation.width = x - this.currentAnnotation.x;
      this.currentAnnotation.height = y - this.currentAnnotation.y;
      break;
    case 'arrow':
      this.currentAnnotation.endX = x;
      this.currentAnnotation.endY = y;
      break;
    case 'highlight':
      this.currentAnnotation.resize(x, y);
      break;
    default:
      break;
  }
}

deleteAnnotation(index) {
  if (index >= 0 && index < this.annotations.length) {
    this.annotations.splice(index, 1);
    this.draw();
  }
}

getSelectedAnnotation(x, y) {
  for (let i = this.annotations.length - 1; i >= 0; i--) {
    const annotation = this.annotations[i];
    if (annotation.contains(x, y)) {
      return annotation;
    }
  }
  return null;
}

draw() {
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

  for (const annotation of this.annotations) {
    annotation.draw(this.ctx);
  }
}

save() {
  return this.canvas.toDataURL('image/png');
}}

// Add this line at the end of your annotationCanvas.js file
export default AnnotationCanvas;

import Utility from './utility.class.js';
import Tool from './tools.js';
import Fill from './fill.js';


export default class Paint {

    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.context = canvas.getContext('2d');

    }

    // Setter functions
    // To current active tool
    set activeTool(tool) {
        this.tool = tool;
    }

    // To set current selected color
    set selectedColor(color) {
        this.color = color;
        this.context.fillStyle = this.color;
        this.context.strokeStyle = this.color;
    }

    // To set shapes and pencel stroke size
    set lineWidth(lineWidth) {
        this._lineWidth = lineWidth;

    }

    // To set brush stroke size
    /*set brushSize(brushSize) {
        this._brushSize = brushSize;
    }*/

    init() {
        
        this.canvas.onmousedown = (e) => this.onMouseDown(e);
    }

    onMouseDown(e) {        
        this.savedImage = this.context.getImageData(0, 0, this.context.canvas.width, this.context.canvas.height);

               
        this.canvas.onmousemove = (e) => this.onMouseMove(e);
        document.onmouseup = (e) => this.onMouseUp(e);
        this.startPos = Utility.getMouseCoordsOnCanvas(this.canvas, e);

        if (this.tool == Tool.TOOL_PENCIL) {
            this.context.beginPath();
            this.context.moveTo(this.startPos.x, this.startPos.y);
        }else if(this.tool == Tool.TOOL_ERASER){
            this.context.clearRect(this.startPos.x,this.startPos.y,this._lineWidth,this._lineWidth);
        }
    }

    onMouseMove(e) {
        this.currentPos = Utility.getMouseCoordsOnCanvas(this.canvas, e);

        switch (this.tool) {
            case Tool.TOOL_LINE:
            case Tool.TOOL_RECTANGLE:
            case Tool.TOOL_CIRCLE:
                this.drawShape();
                break;
            case Tool.TOOL_PENCIL:
                this.drawFreeLine(this._lineWidth);
                break;
            case Tool.TOOL_ERASER:
                this.context.clearRect(this.currentPos.x,this.currentPos.y,this._lineWidth,this._lineWidth);
                break;
            default:
                break;
        }
    }

    onMouseUp(e) {
        
        this.canvas.onmousemove = null;
        document.onmouseup = null;
    }

    drawShape() {
        this.context.putImageData(this.savedImage, 0, 0);
        this.context.beginPath();
        this.context.lineWidth = this._lineWidth;

        if (Tool.TOOL_LINE == this.tool) {

            this.context.moveTo(this.startPos.x, this.startPos.y);
            this.context.lineTo(this.currentPos.x, this.currentPos.y);

        } else if (Tool.TOOL_RECTANGLE == this.tool) {

            this.context.rect(this.startPos.x, this.startPos.y, this.currentPos.x - this.startPos.x, this.currentPos.y - this.startPos.y);

        } else if (Tool.TOOL_CIRCLE == this.tool) {

            let distance = Utility.calcradius(this.startPos, this.currentPos);
            this.context.arc(this.startPos.x, this.startPos.y, distance, 0, 2 * Math.PI, false);

        } 
        this.context.stroke();
    }

    drawFreeLine(lineWidth) {
        this.context.lineWidth = lineWidth;
        this.context.lineTo(this.currentPos.x, this.currentPos.y);
        this.context.lineCap = 'round';
        this.context.lineJoin = 'round';
        this.context.stroke();
    }



    
}
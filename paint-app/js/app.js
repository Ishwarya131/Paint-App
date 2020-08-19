import Paint from './painttt.js';
import Tool from './tools.js';

let paint  = new Paint("canvas");

// Set defaults
paint.activeTool = Tool.TOOL_LINE;
paint.lineWidth = '1';
//paint.brushSize = '4';
paint.selectedColor = '#000000';

// initialize paint
paint.init();



document.querySelectorAll("[data-tool]").forEach(
    (el) => {
        el.addEventListener("click", (e) => {
            document.querySelector("[data-tool].active").classList.toggle("active");
            el.classList.toggle("active");
            let selectedTool = el.getAttribute("data-tool");
            paint.activeTool = selectedTool;

            switch(selectedTool){
                case Tool.TOOL_LINE:
                case Tool.TOOL_RECTANGLE:
                case Tool.TOOL_CIRCLE:
                case Tool.TOOL_PENCIL:
                case Tool.TOOL_ERASER:
                    document.querySelector(".group.pencil").style.display = "block";
                   // document.querySelector(".group.brush").style.display = "none";
                    break;
               /* case Tool.TOOL_BRUSH:
                    document.querySelector(".group.pencil").style.display = "none";
                    document.querySelector(".group.brush").style.display = "block";
                    break;*/
                default:
                    document.querySelector(".group.pencil").style.display = "none";
                  //  document.querySelector(".group.brush").style.display = "none";
            }

        });
    }
);

document.querySelectorAll("[data-line-width]").forEach(
    (el) => {
        el.addEventListener("click", (e) =>{
            document.querySelector("[data-line-width].active").classList.toggle("active");
            el.classList.toggle("active");

            paint.lineWidth = el.getAttribute("data-line-width");
        });
    }
);


document.querySelectorAll("[data-color]").forEach(
    (el) => {
        el.addEventListener("click", (e) =>{
            document.querySelector("[data-color].active").classList.toggle("active");
            el.classList.toggle("active");

            paint.selectedColor = el.getAttribute("data-color");
        });
    }
);


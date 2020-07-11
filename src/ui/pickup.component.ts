export class PickupComponent {
    
    private canvas: HTMLCanvasElement;
    
    public height: number = 0;
    
    constructor() {
        setInterval(() => this.createPerson(), 10000);
    }
    
    public create(): HTMLCanvasElement {
        let canvas = document.createElement('pickupCanvas') as HTMLCanvasElement;
        canvas.innerHTML = '<canvas id="pickupCanvas" width="800" height="50" style="border:1px solid #d3d3d3; display: block; margin: auto;">';
        canvas.height = 50;
        canvas.width = 800;
        return canvas;
    }
    
    createPerson() {
        var canvas = document.getElementById("pickupCanvas") as HTMLCanvasElement;
        var context = canvas.getContext("2d");
        let image = new Image();
        image.src = '../assets/images/player.png';
        image.onload = () => {
            context.drawImage(image, 0, this.height);
            if (this.height <= 30) {
                this.height += 5;
            } else {
                this.height -= 5
            }
        };
        
        return image;
    }
    
    movePersonAcrossTheScreen() {
        
    }  
}
class Mouse{
    constructor(){
        this.domMouse = document.querySelector(".mouse");
        this.icons = document.querySelectorAll(".icon i");
        document.addEventListener("mousemove",(e)=>{
            this.domMouse.style.display = "block"
            this.domMouse.style.left = `${e.clientX}px`;
            this.domMouse.style.top = `${e.clientY}px`;
        })

        this.icons.forEach(icon=>{
            icon.addEventListener("mousemove",function(){
                this.classList.add("fa-bounce")
            })
            icon.addEventListener("mouseleave",function(){
                this.classList.remove("fa-bounce");
            })
        })
    }
}

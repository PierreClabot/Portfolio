class Hub{
    constructor(){
        this.domMain = document.querySelector(".hub");
        this.contact = document.querySelector(".title.contact");
        this.projets = document.querySelector(".title.projets")
        this.about = document.querySelector(".title.about")

        this.contact.addEventListener("click",(e)=>{
            var contact = new Contact();
            console.log("HERE");
        })
    }


}
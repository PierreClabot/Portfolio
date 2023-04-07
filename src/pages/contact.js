class Contact{
    constructor(){

        this.domMain = document.querySelector(".hub");
        this.contact = document.querySelector(".title.contact");
        this.displayPopUp();

        this.popUp = document.querySelectorAll(".popUp");

        this.iconSend = document.querySelector(".iconSend");
        this.letter = document.querySelector(".letter");
        this.papier = document.querySelector(".papier");
        this.topLetter = document.querySelector(".top");
        this.iconSend.addEventListener("click",(e)=>{
            this.sendForm();
        })
    }

    displayPopUp(){
        let popUp   =   `<div class="popUp contact">
                            <div class="letter">
                                <div class="top"></div>
                                <div class="papier">
                                    <label for="email" class="label-email">Email :</label>
                                    <input type=text placeholder="email" id="email">
                                    <label for="message" class="label-message">Votre message :</label>
                                    <textarea type=text placeholder="Message" id="message"></textarea>
                                    <div class="icon iconSend"><i class="fa-regular fa-paper-plane" style="color: #dcb208;"></i></div>
                                </div>
                            </div>
                        </div>`
        this.domMain.innerHTML += popUp;
    }

    sendForm(){
        let verif = this.verifForm();
        if(verif)
        {
            // envoyer mail
            this.papier.style.animation = "closeLetter 2s 0s forwards";
            this.papier.querySelectorAll("*").forEach(elem=>{
                elem.style.display = "none"
            });
            this.topLetter.style.animation = "topCloseLetter 1s 1s forwards";
            this.letter.style.animation = "upLetter 2s 0s forwards, fadeOutLetter 1s 2s forwards"
            setTimeout(()=>{
                this.letter.remove();
                this.confirm();
            },3000)
        }
    }

    verifForm(){
        return true;
    }

    confirm(){
        document.querySelector(".popUp").innerHTML = "<div class=info><div class=message>Message envoyé</div><div class=close>X</div></div>"
        document.querySelector(".close").addEventListener("click",(e)=>{
            this.closeContact();
        })
    }

    closeContact(){
        document.querySelector(".popUp.contact").remove();
        new Hub();
    }
}
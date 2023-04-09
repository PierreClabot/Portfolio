class Contact{
    constructor(){
        this.initEmailJS();
        this.domMain = document.querySelector(".hub");
        this.contact = document.querySelector(".title.contact");
        this.displayPopUp();

        this.popUp = document.querySelector(".popUp");

        this.iconSend = document.querySelector(".iconSend");
        this.letter = document.querySelector(".letter");
        this.papier = document.querySelector(".papier");
        this.topLetter = document.querySelector(".top");
        this.iconSend.addEventListener("click",(e)=>{
            this.sendForm();
        })
        document.querySelector(".close").addEventListener("click",(e)=>{
            this.closeContact();
        })
        this.minSizeMessage = 20;
        this.this = this;
        this.messageConfirmation = "Message envoyé"
    }

    displayPopUp(){
        let popUp   =   `<div class="popUp contact">
                            <div class=close><i class="fa-sharp fa-regular fa-circle-xmark" style="color: #dcb208;"></i></div>
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
        this.inputEmail = document.querySelector("#email");
        this.inputMessage = document.querySelector("#message");
        setTimeout(()=>{

            this.inputEmail.addEventListener("keydown",this.verifEmail.bind(this.this));
            this.inputEmail.addEventListener("focusout",this.verifEmail.bind(this.this));

            this.inputMessage.addEventListener("keydown",this.verifMessage.bind(this.this));
            this.inputMessage.addEventListener("focusout",this.verifMessage.bind(this.this));

        },1000)
        
    }

    async sendForm(){
        let verif = this.verifForm();
        if(verif)
        {
            // envoyer mail
            let saisieEmail = this.inputEmail.value;
            let saisieMessage = this.inputEmail.value;

            let formulaire = {
                email : saisieEmail,
                message : saisieMessage
            }
            var objContact = this.this;
            objContact.animWaitEmail();
            await emailjs.send("service_vaxpzel","template_428r6mf",formulaire).then(function(res){// service_vaxpzel

                objContact.closeSpinner();
                objContact.animCloseLetter();

            }).catch((error)=>{
                objContact.messageConfirmation = "Une erreur est survenue, veuillez ressayer."
                objContact.closeSpinner();
                objContact.animCloseLetter();
                objContact.confirm();
            })
            
        }
    }

    verifForm(){
        let verifEmail = this.verifEmail();
        let verifMessage = this.verifMessage();

        if(verifEmail && verifMessage)
        {
            return true;
        }
        return false;
    }

    verifEmail(){
        let regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        let verifEmail = this.inputEmail.value.match(regex);
        if(!verifEmail) // mail invalide, on affiche l'erreur et on sort
        {
            // console.log("ERREUR");
            let erreur = "<div class='erreur erreurMail'>Votre email n'est pas valide.</div>"
            if(!document.querySelector(".erreurMail")) // on vérifie que l'erreur ne soit pas déjà affichée
            {
                this.inputEmail.insertAdjacentHTML('afterend',erreur);
            }
            return false;
        } // mail valide -> On supprime l'erreur si elle était affiché 
        if(document.querySelector(".erreurMail")){
            document.querySelector(".erreurMail").remove();
        }
        return verifEmail;
    }

    verifMessage(){
        let verifMessage = this.inputMessage.value.length >= this.minSizeMessage
        if(!verifMessage){
            let erreur = `<div class='erreur erreurMessage' >Votre message doit comporter au minimum ${this.minSizeMessage} caractères.</div>`;

            if(!document.querySelector(".erreurMessage")) // on vérifie que l'erreur ne soit pas déjà affichée
            {
                this.inputMessage.insertAdjacentHTML('afterend',erreur);
            }
            return false;
        }
        if(document.querySelector(".erreurMessage")){
            document.querySelector(".erreurMessage").remove();
        }
        return verifMessage;
    }
    confirm(){
        document.querySelector(".popUp").innerHTML = `<div class=info><div class=message>${this.messageConfirmation}</div><div class=close><i class="fa-sharp fa-regular fa-circle-xmark" style="color: #dcb208;"></i></div></div>`;
        document.querySelector(".close").addEventListener("click",(e)=>{
            this.closeContact();
        })
    }

    closeContact(){
        document.querySelector(".popUp.contact").remove();
        new Hub();
    }

    animWaitEmail(){
        console.log("animWaitEMail")
        let affichage = `<div class='container-spinner'>
                            <div class="lds-spinner">
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                        </div>`

            this.popUp.innerHTML += affichage;
    }
    closeSpinner(){
        document.querySelector(".container-spinner").remove();
    }

    animCloseLetter(){
        // animation close letter
        this.papier.style.animation = "closeLetter 2s 0s forwards";
        this.papier.querySelectorAll("*").forEach(elem=>{
            elem.style.display = "none"
        });
        this.topLetter.style.transform = "rotateX(180deg)"
        this.topLetter.style.animation = "topCloseLetter 1s 1.5s forwards";
        this.letter.style.animation = "upLetter 2s 0s forwards, fadeOutLetter 1s 2s forwards"
        setTimeout(()=>{
            this.letter.remove();
            this.confirm();
        },3000)
    }
    initEmailJS()
    {
        emailjs.init("ZKolT_B9IgaWCtg8O");
    }
}
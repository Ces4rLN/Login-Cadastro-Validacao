class Validator{
    constructor(){
        this.validations = [
            'data-required',
            'data-min-length',
            'data-max-length',
            'data-email-validate',
            'data-only-letters',
            'data-equal', 
            'data-password-validate',           
        ]
    }

    // iniciar a validação em todos os campos

    validate(form){

        // resgata todas as validações
        let currentValidations = document.querySelectorAll('form .error-validation')

        if(currentValidations.length > 0){

            this.cleanValidations(currentValidations);
        }

        //pegar inputs
        let inputs = form.getElementsByTagName('input')

        // transformo uma HTMLCollection -> array
        let inputsArray = [...inputs]

         //loop nos inputs e validação mediante ao que for encontrado
        inputsArray.forEach(function(input) {

            // loop em todas as validações
            for(let i = 0; this.validations.length > i; i++){
                //verifica se a validação atual existe no input
                if(input.getAttribute(this.validations[i]) != null){
                    
                    // limpnado a string para virar um método
                    let method = this.validations[i].replace('data-','').replace('-', '');

                    // valor do input
                    let value = input.getAttribute(this.validations[i])

                    // invocar o método
                    this[method](input, value);
                }
            }
        }, this)
    }

    // verifica se um input tem um número mínimo de caracteres
    minlength(input, minValue){
        
        let inputLength = input.value.length;

        let errorMessage = `O campo precisa ter pelo menos ${minValue} caracteres`

        if(inputLength < minValue){
            this.printMessage(input,errorMessage)
        }
    }

    // verifica se o input passou do limite de caracter
    maxlength(input, maxValue){
        let inputLength = input.value.length;

        let errorMessage = `O campo precisa ter menos que ${maxValue} caracteres`

        if(inputLength > maxValue){
            this.printMessage(input,errorMessage)
        }
    }

    // valida emails
    emailvalidate(input){

        // email@email.com 
        let re = /\S+@\S+\.\S+/;

        let email = input.value; 
        let errorMessage = `Digite um email no padrão seunome@email.com`;

        if(!re.test(email)){
            this.printMessage(input,errorMessage);
        }
    }

    // valida se o campo só usa letras
    onlyletters(input){
        let re = /^[A-Za-z]+$/;

        let inputValue = input.value;

        let errorMessage = `Este campo não aceita números nem caracteres especiais`

        if(!re.test(inputValue)){
            this.printMessage(input,errorMessage)
        }
    }
    
     // método para imprimir mensagens de erro na tela
    printMessage(input, msg){

        // quantidade de erros
        let errorsQty = input.parentNode.querySelector('.error-validation')

        if(errorsQty === null){

            let template = document.querySelector('.error-validation').cloneNode(true);

            template.textContent = msg;

            let inputParent = input.parentNode;

            template.classList.remove('template');

            inputParent.appendChild(template);
        }
       
    }

    // verifica se o input é requerido
    required(input){
        let inputValue = input.value;

        if(inputValue === ''){
            let errorMessage = `Este campo é obrigatorio`;
            this.printMessage(input,errorMessage)
        }
    }

    //verifica se dois campos são iguais
    equal(input, inputName){
        let inputToCompare = document.getElementsByName(inputName)[0];

        let errorMessage = `Esse campo precisa ser igual a senha`

        if(input.value != inputToCompare.value){
            this.printMessage(input, errorMessage)
        }
    }

    // valida o campo de senha
    passwordvalidate(input){

        // explodir string em um array
        let charArr = input.value.split("");

        let uppercases = 0;
        let numbers = 0;

        for(let i = 0; charArr.length > i; i++){
            if(charArr[i] === charArr [i].toUpperCase() && isNaN(parseInt(charArr[i]))){
                uppercases++;
            } else if(!isNaN(parseInt(charArr[i]))){
                numbers++;
            }
        }

        if(uppercases === 0 || numbers === 0){
            let errorMessage = `Senha precisa de um caracter maiúsculo e um número`
            this.printMessage(input, errorMessage)
        }

    }

    // limpa as validações da tela
    cleanValidations(validations){
        validations.forEach(el => el.remove());
    }
}

let form = document.getElementById("register-form")
let submit = document.getElementById("btn-submit")

let validator = new Validator();

// Evento para validação
submit.addEventListener('click', function(e){

    e.preventDefault();

    validator.validate(form);
});
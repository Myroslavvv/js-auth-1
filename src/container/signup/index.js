import{Form} from '../../script/form'

class SignupForm extends Form {
    FIELD_NAME = {
        EMAIL: 'email',
        PASSWORD: 'password',
        PASSWORD_AGAIN: 'passwordAgain',
        ROLE: 'role',
        IS_CONFIRM: 'isConfirm',
    }

    FIELD_ERROR = {
        IS_EMPTY: 'Введіть значення в поле',
        IS_BIG: 'Дуже довге значення, приберіть зайве',
        EMAIL: 'Веедіть коректне значення email адреси',
        PASSWORD: 'Пароль повинен складатися з не менше ніж 8 символів,включаючи хоча б одну цифру,малу та велику літеру',
        PASSWORD_AGAIN: 'Ваш другий пароль не збігається з першим',
        NOT_CONFIRM: 'Ви не погоджуєтесь з правилами',
        ROLE: 'ВИ не обрали роль',
    }
    
    validate = (name, value) => {
        return true
    }
    
    submit = () => {
        console.log(this.value)
    }

    // static value = {}

    // static validate = (name, value) => {
     //     return true
    // }

    // static submit = () => {
    //     console.log(this.value)
    // }

    // static change = (name, value) => {
    //     console.log(name, value)
    //     if(this.validate(name, value)) this.value[name] = value
    // }
}

window.signupForm = new SignupForm();
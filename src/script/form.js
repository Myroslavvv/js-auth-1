export class Form{
    FIELD_NAME = {}
    FIELD_ERROR = {}

    value = {}
    error = {}

    change = (name, value) => {
        console.log(name, value)
        // if(this.validate(name, value)) this.value[name] = value
    }
}


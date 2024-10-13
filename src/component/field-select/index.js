class FieldSelect {
    static toggle = (target) => {
        const options = target.nextElementSibling

        options.toggleAttribute('active')
    }
}
window.fieldSelect = FieldSelect;




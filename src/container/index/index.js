document.addEventListener('DOMContentLoaded', () => {
    if(window.session) {
        const {user} = window.session

        if(user.isConfirm) {
            location.assign('/home')
        } else {
            location.assign('/signup-confirm')
        }
    } else {
        sessionStorage.clear();  // очистка сесії
        location.assign('/signup');
    }
}) 
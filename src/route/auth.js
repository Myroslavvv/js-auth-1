// Підключаємо роутер до бек-енду
const express = require('express')
const router = express.Router()

const { User } = require('../class/user')

//======================================

router.get('/signup', function (req, res) {
    // res.render генерує нам HTML сторінку
  
    // ↙️ cюди вводимо назву файлу з сontainer
    return res.render('signup', {
      // вказуємо назву контейнера
      name: 'signup',
      // вказуємо назву компонентів
      component: ['back-button','field','field-password'],
  
      // вказуємо назву сторінки
      title: 'Signup page',
      // ... сюди можна далі продовжувати додавати потрібні технічні дані, які будуть використовуватися в layout
  
      // вказуємо дані,
      data: {
        role: [
            {value: User.USER_ROLE.USER, text: 'КОристувач'},
            {
                value: User.USER_ROLE.ADMIN,
                text: 'Адміністратор',
            },
            {
                value: User.USER_ROLE.DEVELOPER,
                text: 'Розробник',
            },
        ],
      },
    })
    // ↑↑ сюди вводимо JSON дані
  })
module.exports = router

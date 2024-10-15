// Підключаємо роутер до бек-енду
const express = require('express')
const router = express.Router()

const { User } = require('../class/user')

User.create({
  email: 'test@mail.com',
  password: 123,
  role: 1,
})

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

  router.post('/signup', function(req, res) {
    const{email, password, role} = req.body

    console.log(req.body)

    if(!email || !password || !role) {
      return res.status(400).json({
        message: "Помилка. Обов*язкові поля відсутні",
      })
    }

    try{
      User.create({email, password, role})

      return res.status(200).json({
        message: "Користувач успішно зареєстрований",
      })
    } catch(err) {
      return res.status(400).json({
        message: "Помилка створення користувача",
      })
    }
  })
module.exports = router
 
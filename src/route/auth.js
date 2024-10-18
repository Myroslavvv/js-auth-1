// Підключаємо роутер до бек-енду
const express = require('express')
const router = express.Router()

const { User } = require('../class/user')
const { Confirm } = require('../class/confirm')

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
    component: ['back-button', 'field', 'field-password'],

    // вказуємо назву сторінки
    title: 'Signup page',
    // ... сюди можна далі продовжувати додавати потрібні технічні дані, які будуть використовуватися в layout

    // вказуємо дані,
    data: {
      role: [
        { value: User.USER_ROLE.USER, text: 'КОристувач' },
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

router.post('/signup', function (req, res) {
  const { email, password } = req.body

  console.log(req.body)

  if (!email || !password) {
    return res.status(400).json({
      message: 'Помилка. Обов*язкові поля відсутні',
    })
  }

  try {
    const user = User.getByMail(email) 
    if(user) {
      return res.status(400).json({
        message: 'Помилка. Такий користувач уже існує',
      })
    }

    User.create({ email, password })

    return res.status(200).json({
      message: 'Користувач успішно зареєстрований',
    })
  } catch (err) {
    return res.status(400).json({
      message: 'Помилка створення користувача',
    })
  }
})

//======================================

router.get('/recovery', function (req, res) {
  // res.render генерує нам HTML сторінку

  // ↙️ cюди вводимо назву файлу з сontainer
  return res.render('recovery', {
    // вказуємо назву контейнера
    name: 'recovery',
    // вказуємо назву компонентів
    component: ['back-button', 'field'],

    // вказуємо назву сторінки
    title: 'Recovery page',
    // ... сюди можна далі продовжувати додавати потрібні технічні дані, які будуть використовуватися в layout

    // вказуємо дані,
    data: {},
  })
  // ↑↑ сюди вводимо JSON дані
})

router.post('/recovery', function (req, res) {
  const { email } = req.body
  console.log(email)

  if (!email) {
    return res.status(400).json({
      message: 'Помилка. Обов*язкові поля відсутні',
    })
  }

  try {
    const user = User.getByMail(email)
      if(!user) {
        return res.status(400).json({
          message: "Користувач з таким email не існує",
      })
    }

    Confirm.create(email)
      return res.status(200).json({
        message: 'Код для відновлення відправлений',
      })
  } catch (err) {
    return res.status(400).json({
      message: err.message,
    })
  }
})

//======================================

router.get('/recovery-confirm', function (req, res) {
	// res.render генерує нам HTML сторінку
  
	// ↙️ cюди вводимо назву файлу з сontainer
	return res.render('recovery-confirm', {
	  // вказуємо назву контейнера
	  name: 'recovery-confirm',
	  // вказуємо назву компонентів
	  component: ['back-button', 'field', 'field-password'],
  
	  // вказуємо назву сторінки
	  title: 'Recovery confirm page',
	  // ... сюди можна далі продовжувати додавати потрібні технічні дані, які будуть використовуватися в layout
  
	  // вказуємо дані,
	  data: {},
	})
	// ↑↑ сюди вводимо JSON дані
  })


  router.post('/recovery-confirm', function (req, res) {
	const { password, code } = req.body
	console.log(password, code)

  if (!code || !password) {
    return res.status(400).json({
      message: 'Помилка. Обов*язкові поля відсутні',
    })
  }

  try {
    const email = Confirm.getData(Number(code))

    if(!email) {
      return res.status(400).json({
        message: 'Код не існує',
      })
    }

    const user = User.getByMail(email)

    if(!user) {
      return res.status(400).json({
        message: 'Користувач з таким email не існує',
      })
    }

    user.password = password
    console.log(user)

    return res.status(200).json({
      message: 'Пароль змінено',
    })

  } catch (err) {
    return res.status(400).json({
      message: err.message,
    })
  }
})

//======================================

module.exports = router

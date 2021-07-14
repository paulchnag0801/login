const express = require('express')
const router = express.Router()
const passport = require('passport')
const Account = require('../../models/accounts.js')

router.get('/', (req, res) => {
  return res.redirect('/login')
})

router.get('/login', (req, res) => {
  return res.render('login')
})

router.post('/login', (req, res) => {
  return Account.findOne({ email: req.body.email })
    .lean()
    .then((user) => {
      if (!user) {
        const alert = '該 email 尚未註冊'
        return res.render('login', { alert })
      }
      if (user.password !== req.body.password) {
        const alert = '您輸入的密碼有誤'
        return res.render('login', { alert })
      }
      return res.redirect(`/welcome/${user._id}`)
    })
})

router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
  })
)

router.get('/register', (req, res) => {
  return res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  // 檢查使用者是否已經註冊
  Account.findOne({ email }).then((user) => {
    // 如果已經註冊：退回原本畫面
    if (user) {
      console.log('User already exists.')
      res.render('register', {
        name,
        email,
        password,
        confirmPassword,
      })
    } else {
      // 如果還沒註冊：寫入資料庫
      return Account.create({
        name,
        email,
        password,
      })
        .then(() => res.redirect('/'))
        .catch((err) => console.log(err))
    }
  })
})

router.get('/welcome/:id', (req, res) => {
  const id = req.params.id
  return Account.findById(id)
    .lean()
    .then((user) => {
      res.render('welcome', { user })
    })
})

router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

module.exports = router

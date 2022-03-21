const express = require('express')
const Account = require('./accounts-model')
const {
  checkAccountId, 
  checkAccountNameUnique,
  checkAccountPayload
} = require('./accounts-middleware')
const router = express.Router()

router.get('/',async (req, res, next) => {
  try {
    const data = await Account.getAll()
    res.json(data)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const data = await Account.getById(req.params.id)
    res.json(data)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const data = await Account.create(req.body)
    res.status(201).json(data)
  } catch (err) {
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const data = await Account.updateById(req.params.id, req.body)
    res.json(data)
  } catch (err) {
    next(err)
  }
});

router.delete('/:id', (req, res, next) => {
  Account.deleteById(req.params.id)
  .then( rows => {
    if (rows) {
      res.json('it was deleted')
    } else {
      next({status: 404 , message: 'could not delete'})
    }
  })
  .catch(next)
})

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500). json({
    message: err.message,
    stack: err.stack
  })
})

module.exports = router;

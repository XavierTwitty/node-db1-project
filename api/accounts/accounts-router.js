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

router.get('/:id', checkAccountId, async (req, res, next) => {
  try {
    const data = await Account.getById(req.params.id)
    res.json(data)
  } catch (err) {
    next(err)
  }
})

router.post('/',checkAccountNameUnique,checkAccountPayload, async (req, res, next) => {
  try {
    const data = await Account.create(req.body)
    res.status(201).json(data)
  } catch (err) {
    next(err)
  }
})

router.put('/:id',checkAccountNameUnique, checkAccountPayload, async (req, res, next) => {
  try {
    const data = await Account.updateById(req.params.id, req.body)
    res.json(data)
  } catch (err) {
    next(err)
  }
});

router.delete('/:id', checkAccountId, (req, res, next) => {
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


module.exports = router;

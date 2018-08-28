var router = require('express').Router();

router.get('/', function(req, res) {
    res.json({ status : 'success', message: 'ok' });   
});

module.exports = router;

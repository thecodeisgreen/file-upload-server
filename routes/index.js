var express = require('express');
var router = express.Router();
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })
var path = require('path')

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/info', function(req, res) {
  console.log('info')
  res.send({status: "doing good thanks!"})
})

router.post('/file/upload', upload.single('file'), function (req, res, next) {
  res.send({
    id: req.file.filename,
    url: `${process.env.PUBLIC_HOST}/file/${req.file.filename}`
  })
})

router.get('/file/:id', function (req, res, next) {
  var options = {
    root: path.join(process.env.ROOT_DIR, 'uploads'),
    dotfiles: 'deny',
    headers: {
      'x-timestamp': Date.now(),
      'x-sent': true
    }
  }

  var fileName = req.params.id
  res.sendFile(fileName, options, function (err) {
    if (err) {
      next(err)
    }
  })
})

module.exports = router;

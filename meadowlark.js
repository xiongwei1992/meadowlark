var express = require('express');
var handlebars = require('express3-handlebars')
        .create({defaultLayout: 'main'});
var app = express();

app.engine('handlebars', handlebars.engine);

app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/plublic'));

app.get('/', function (req, res) {
    res.render('home'); 
})

app.get('/about', function (req, res) {
    res.type('text/plain');
    res.send('About Meadowlark Travel');
})

// 404 catch-all 处理器（中间件）
app.use(function (req, res) {
    res.status(404);
    res.render('404'); 
})

// 500 错误处理器（中间件）
app.use(function (err, req, res, next) {
    console.log(err.stack);
    res.status(500);
    res.render('500'); 
})


var server = app.listen(app.get('port'), function () {
    console.log('express started on  http://10.255.204.109:' + app.get('port') , server.address());
})
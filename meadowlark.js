var express = require('express');
var handlebars = require('express3-handlebars')
        .create({defaultLayout: 'main'});
var app = express();

app.engine('handlebars', handlebars.engine);

app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'));

app.use(function(req, res, next) {
    res.locals.showTests = app.get('env') !== 'production' && 
        req.query.test === '1';
    next();
});

app.get('/', function (req, res) {
    res.render('home'); 
});

app.get('/about', function (req, res) {    
    res.render('about', {
        fortune: require('./lib/fortune')(),
        pageTestScript: '/qa/tests-about.js'
    });
});

app.get('/tours/hood-river', function(req, res){
    res.render('tours/hood-river');
});

app.get('/tours/request-group-rate', function(req, res){
    res.render('tours/request-group-rate');
});

// 404 catch-all 处理器（中间件）
app.use(function (req, res) {
    res.status(404);
    res.render('404'); 
});

// 500 错误处理器（中间件）
app.use(function (err, req, res, next) {
    console.log(err.stack);
    res.status(500);
    res.render('500'); 
});


var server = app.listen(app.get('port'), function () {
    console.log('express started on  http://10.255.204.109:' + app.get('port') , server.address());
});
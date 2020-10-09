const {app} = require ('./src/server');
app.listen(app.get('port'), () =>{
    console.log('server on port ', app.get('port'));
});
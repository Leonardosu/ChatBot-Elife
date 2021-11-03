module.exports = function (app) {

    app.get('/admin', function (req, res) {
        app.app.controllers.admin.listarNoticias(app, req, res);
    });

    app.get('/adiciona_formulario', function (req, res) {
        app.app.controllers.admin.adiciona_formulario(app, req, res);
    });

    app.post('/noticias/salvar', function (req, res) {
        app.app.controllers.admin.noticias_salvar(app, req, res);
    });
    
    app.delete('/noticias/deletar', function (req, res) {
        app.app.controllers.admin.noticias_deletar(app, req, res);
    });

};
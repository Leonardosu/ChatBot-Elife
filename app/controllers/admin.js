module.exports.listarNoticias = function (app, req, res) {
    var connection = app.config.dbConnection();
    var noticiasModel = new app.app.models.NoticiasDAO(connection);

    noticiasModel.getNoticias(function (erro, result) {
        res.render("./admin/admin", { validacao: {}, noticias: result, noticia: {} });
    });
}

module.exports.adiciona_formulario = function (app, req, res) {

    var connection = app.config.dbConnection();
    var noticiasModel = new app.app.models.NoticiasDAO(connection);

    noticiasModel.getNoticias(function (erro, result) {
        res.render("./admin/form_add_noticia", { validacao: {}, noticias: result, noticia: {} });
    });
}

module.exports.noticias_salvar = function (app, req, res) {
    var noticia = req.body;

    req.assert('titulo', 'Título é obrigatório').notEmpty();
    req.assert('descricao', 'Descrição é obrigatório').notEmpty();
    req.assert('link_imagem', 'Link da imagem é obrigatório').notEmpty();
    req.assert('link', 'Link da noticia é obrigatório').notEmpty();


    var erros = req.validationErrors();
    var connection = app.config.dbConnection();
    var noticiasModel = new app.app.models.NoticiasDAO(connection);

    var noticiasCarregadas = {};
    noticiasModel.getNoticias(function (erro, result) {
        noticiasCarregadas = result;
    });

    if (erros) {
        res.render("./admin/form_add_noticia", { validacao: erros, noticias: noticiasCarregadas, noticia: noticia });
        return;
    }


    noticiasModel.salvarNoticia(noticia, function (erro, result) {
        res.redirect('/noticias');
    });
}

module.exports.noticias_deletar = function (app, req, res) {

    var connection = app.config.dbConnection();
    var noticiasModel = new app.app.models.NoticiasDAO(connection);
    var id_noticia = req.query;

    noticiasModel.deletarNoticia(id_noticia, function (erro, result) {
        res.render("/admin", { noticia: result });        
    });
}
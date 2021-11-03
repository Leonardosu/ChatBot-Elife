function NoticiasDAO(connection) {
    this._connection = connection;
}

NoticiasDAO.prototype.getNoticias = function(callback){
	this._connection.query('select * from noticias order by data_criacao desc', callback);
}

NoticiasDAO.prototype.getNoticia = function (id_noticia, callback) {
    this._connection.query('select * from noticias where id_noticia = ' + id_noticia.id_noticia, callback);
};

NoticiasDAO.prototype.salvarNoticia = function(noticia, callback){
	this._connection.query('insert into noticias set ? ', noticia, callback)
}

NoticiasDAO.prototype.deletarNoticia = function (id_noticia, callback) {
    this._connection.query('delete from noticias where id_noticia = ' + id_noticia.id_noticia, callback);
};

NoticiasDAO.prototype.get10UltimasNoticias = function (callback) {
    this._connection.query('select * from noticias order by data_criacao desc limit 10', callback);
}

NoticiasDAO.prototype.getNoticiasByTema = function (tema, callback) {
    this._connection.query('select * from noticias where tema = ' + tema.tema + 'order by data_criacao desc', callback);
}

module.exports = function () {
    return NoticiasDAO;
}
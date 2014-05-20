/**
 * Created by dramos on 06/12/13.
 */
Constants = {

    header: {
        json: 'application/json'
    },

    server: {
        port: '6600'
    },

    error: {
        generic: {error:'Ocorreu um erro durante o processamento'},
        fileNotExists: {error:'Arquivo não existe!'}
    },

    /*
     *  @see: http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html
     */
    http: {
        ok:         {cod:200, msg:'OK'},
        noContent:  {cod:204, msg:'No Content'},
        notFound:   {cod:404, msg:'Not Found'},
        internalError:   {cod:500, msg:'Erro interno'}
    }

}

module.exports = Constants;




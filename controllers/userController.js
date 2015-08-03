var users = { admin: {id:1, username:'admin', password:'123' },
              user: {id:2, username:'user', password:'123'}
            };


exports.autenticar = function(login, password, callback){
    if(users[login]){
        if(password === users[login].password){
          callback(null, users[login]);
        } else{ callback(new Error('Password incorrecto')); }
    } else { callback( new Error('No existe el usuario')); }
};

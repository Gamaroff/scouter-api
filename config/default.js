module.exports = {
    App       : {
        mode        : 'dev',
        port        : 3010,
        secure_token: '5a2614a4-0534-45b0-8792-0c1e6c275085',
        //uploads: './uploads'
        token_auth  : 'eyJ0eXAiOiJFV1QiLCJhbGciOiJIUzI1NiJ9.eyJhcHAiOiJpbnZpcm9odWIiLCJpYXQiOjE0MDMwOTgyMTZ9.ykcR_nYCnD1x3_-7wzoI0IBru53NZhGgrMa849eRFXE'
    },
    ScouterDb  : {
        db  : 'scouter',
        host: '127.0.0.1',
        port: 27017
    },
    Redis     : {
        host    : '127.0.0.1',
        password: null,
        port    : '6379',
        secret  : '1234567-eo6I-0987654322'
    },
    Logging   : {
        exception: 'logs/exception',
        error    : 'logs/error',
        warn     : 'logs/warn',
        info     : 'logs/info'
    },
    Email     : {
        from: 'xxxx',
        user: "xxxx",
        pass: "xxxx"
    },
};
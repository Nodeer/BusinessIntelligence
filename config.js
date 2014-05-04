module.exports = {
    hash: {
        salt: process.env.SALT || 'sdajklskaisd9ia09jdskadosakodk32op3o40-rifdsjf;dks;sdkidsu43poi2eoidsjklsakdsai9302'
    },
    mongodb: {
        connectionString: process.env.CUSTOMCONNSTR_EV1 || 'mongodb://localhost/dev'
    }
};
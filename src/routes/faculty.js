const service = require('../services/faculty')

const routes = [
    {
        method: 'GET',
        url: '/fakultas-prodi',
        handler: service.getFakultasProdi
    },
    {
        method: 'GET',
        url: '/fakultas',
        handler: service.getFakultas
    },
    {
        method: 'GET',
        url: '/:nama_fakultas/prodi',
        handler: service.getDetailProdiFakultas
    },
    {
        method: 'GET',
        url: '/prodi',
        handler: service.getProdi
    },
    {
        method: 'GET',
        url: '/:kode_prodi',
        handler: service.getDetailProdi
    },
]

module.exports = routes
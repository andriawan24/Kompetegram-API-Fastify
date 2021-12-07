const Faculty = require('../models/faculty')

const getFakultasProdi = async (req, res, next) => {
    try {
        // let faculties = await Faculty.find({}, { _id: 0, fakultas: 1, kode: 1, prodi: 1 }).sort({'fakultas': 1})
        let agg = [
            {
                $group: {
                    _id: { 'nama_fakultas': "$fakultas" },
                    list_prodi: {
                        '$push': {
                            kode_prodi: "$kode",
                            nama_prodi: "$prodi"
                        }
                    }
                }
            },
            {
                $project: { _id: 0, nama_fakultas: "$_id.nama_fakultas", list_prodi: 0, list_prodi: "$list_prodi"}
            },
            {
                $sort: { nama_fakultas: 1 }
            }
        ]

        let faculties = await Faculty.aggregate(agg)

        console.log("Result", faculties)

        return res.code(200).send({
            'data': {
                "universitas": "Universitas Pendidikan Indonesia",
                "list_fakultas": faculties
            }
        })
    } catch (error) {
        return res.code(500).send({
            'status': 'error',
            'message': error
        })
    }
}

const getFakultas = async (req, res, next) => {
    try {
        let agg = [
            {
                "$group": {
                    _id: {
                        'fakultas': '$fakultas'
                    }
                }
            },
            {
                "$project": {
                    _id: 0,
                    nama_fakultas: "$_id.fakultas"
                }
            },
            {
                '$sort': {
                    nama_fakultas: 1
                }
            }
        ]
        let fakultas = await Faculty.aggregate(agg)

        return res.code(200).send({
            'data': fakultas
        })
    } catch (error) {
        return res.code(500).send({
            'status': 'error',
            'message': error
        })
    }
}

const getDetailProdiFakultas = async (req, res, next) => {
    try {
        if (!req.params.nama_fakultas) {
            res.send({
                'status': 'error',
                'message': 'Page not found'
            })
        }

        // let faculties = await Faculty.find({}, { _id: 0, fakultas: 1, kode: 1, prodi: 1 }).sort({'fakultas': 1})
        let agg = [
            {
                $group: {
                    _id: { 'nama_fakultas': "$fakultas" },
                    list_prodi: {
                        '$push': {
                            kode_prodi: "$kode",
                            nama_prodi: "$prodi"
                        }
                    }
                }
            },
            {
                $project: { _id: 0, nama_fakultas: "$_id.nama_fakultas", list_prodi: 0, list_prodi: "$list_prodi"}
            },
            {
                $sort: { nama_fakultas: 1 }
            },
            {
                $match: { nama_fakultas: req.params.nama_fakultas.toUpperCase() }
            },
        ]

        let faculties = await Faculty.aggregate(agg)

        console.log("Result", faculties)

        if (faculties.length == 0) {
            return res.code(200).send({
                "errors": {
                    'status': '404',
                    'title': 'Tidak ditemukan',
                    'message': 'Prodi dari fakultas bersangkutan tidak ditemukan'
                }
            })
        }

        return res.code(200).send({
            'data': faculties[0]
        })
    } catch (error) {
        return res.code(500).send({
            'status': 'error',
            'message': error
        })
    }
}

const getProdi = async (req, res, next) => {
    try {
        let agg = [
            {
                "$group": {
                    _id: {
                        'nama_prodi': '$prodi',
                        'kode_prodi': '$kode'
                    }
                }
            },
            {
                "$project": {
                    _id: 0,
                    kode: '$_id.kode_prodi',
                    prodi: '$_id.nama_prodi',
                }
            },
            {
                '$sort': {
                    prodi: 1
                }
            }
        ]
        let fakultas = await Faculty.aggregate(agg)

        return res.code(200).send({
            'data': fakultas
        })
    } catch (error) {
        return res.code(500).send({
            'status': 'error',
            'message': error
        })
    }
}

const getDetailProdi = async (req, res, next) => {
    try {
        let agg = [
            {
                "$group": {
                    _id: {
                        'nama_prodi': '$prodi',
                        'kode_prodi': '$kode',
                        'nama_fakultas': '$fakultas'
                    }
                }
            },
            {
                "$project": {
                    _id: 0,
                    kode: '$_id.kode_prodi',
                    prodi: '$_id.nama_prodi',
                    nama_fakultas: '$_id.nama_fakultas'
                }
            },
            {
                '$sort': {
                    prodi: 1
                }
            },
            {
                "$match": {
                    kode: req.params.kode_prodi.toUpperCase()
                }
            }
        ]
        let prodi = await Faculty.aggregate(agg)

        if (prodi.length == 0) {
            return res.code(200).send({
                "errors": {
                    'status': '404',
                    'title': 'Tidak ditemukan',
                    'message': 'Prodi tidak ditemukan'
                }
            })
        }

        return res.code(200).send({
            'data': prodi[0]
        })
    } catch (error) {
        return res.code(500).send({
            'status': 'error',
            'message': error
        })
    }
}

module.exports = {
    getFakultasProdi: getFakultasProdi,
    getFakultas: getFakultas,
    getDetailProdiFakultas: getDetailProdiFakultas,
    getProdi: getProdi,
    getDetailProdi: getDetailProdi
}
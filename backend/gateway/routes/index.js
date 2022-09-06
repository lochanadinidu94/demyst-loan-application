const express = require('express')
const router = express.Router()
const axios = require('axios')
const registry = require('./docker-registry.json')

router.all('/:apiName/:path', async (req, res, next) => {
    const services = registry.services[req.params.apiName]
    const enable = services.enable
    if (enable) {
        const url = services.url;
        if (url) {
            axios({
                method: req.method,
                url: url + '/' + req.params.path,
                data: req.body
            }).then((response) => {
                res.status(200).json(response.data)
            }).catch(err => {
                next(err);
            })
        }
    } else {
        res.status(404).send(`Not found: ${req.params.apiName}`)
    }
});

module.exports = router
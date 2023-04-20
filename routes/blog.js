const express = require('express');
const router = express.Router();
const blogModel = require('../Schemas/schema').blogModel;

router.get('/', async (req, res) => {
    const blogs = await blogModel.find({});
    if (!blogs) return res.json({ status: 'failed' })
    
    return res.json({ status: 'success', data: blogs });
})

module.exports = router;

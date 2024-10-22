const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

// @route GET /api/items
// @desc Get all items
router.get('/', async (req, res) => {
    const items = await Item.find();
    res.json(items);
});

// @route POST /api/items
// @desc Create a new item
router.post('/', async (req, res) => { 
    const newItem = new Item({
        name: req.body.name
    });
    const savedItem = await newItem.save();
    res.json(savedItem);
});

// @route PUT /api/items/:id
// @desc  Update an item
router.put('/:id', async (req, res) => {
    const updateItem = await Item.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true });
    res.json(updateItem);
});

// @route DELETE /api/items/:id
// @desc  Update an item
router.delete('/:id', async (req, res) => { 
    await Item.findByIdAndDelete(req.params.id);
    res.json({ message: 'Item deleted' });
});

module.exports = router;


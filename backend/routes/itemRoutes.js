const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

// @route GET /api/items
// @desc Get all items
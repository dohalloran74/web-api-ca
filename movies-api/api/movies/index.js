import asyncHandler from 'express-async-handler';
import { getMovies } from '../tmdb-api';
import express from 'express';

const router = express.Router();

// movie routes to be added

router.get('/discover', asyncHandler(async(req, res) => {
    const discoverMovies = await getMovies();
    res.status(200).json(discoverMovies);
}));


export default router;
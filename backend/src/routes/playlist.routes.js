import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { addProblemToPlaylist, createPlayList, deletePlayList, ensurePlaylistOwner, getPlayListAllDetails, getPlayListDetails, removeProblemFromPlaylist } from "../controllers/playlist.controller.js";
import { createPlaylistValidator, validateRequest } from "../validators/index.js";

const playlistRoutes = express.Router();

playlistRoutes.get("/", authMiddleware, getPlayListAllDetails)

playlistRoutes.get("/:playlistId", authMiddleware, getPlayListDetails)

playlistRoutes.post("/create-playlist", authMiddleware, createPlaylistValidator(), validateRequest, createPlayList)



playlistRoutes.post('/:playlistId/add-problem', authMiddleware, ensurePlaylistOwner, addProblemToPlaylist)

playlistRoutes.delete("/:playlistId", authMiddleware, ensurePlaylistOwner, deletePlayList)

playlistRoutes.delete("/:playlistId/remove-problem", authMiddleware, ensurePlaylistOwner, removeProblemFromPlaylist)


export default playlistRoutes;
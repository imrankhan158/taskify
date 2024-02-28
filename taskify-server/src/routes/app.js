import express from "express";
import {
  createBoard,
  createCard,
  createOrganization,
  createTodoList,
  createWorkspace,
  getOrganization,
  getWorkspace,
  getBoards,
  getTodoLists,
} from "../controlller/app.js";
import { verifyToken } from "../middlewares/auth.js";

const appRoutes = express.Router();

appRoutes.post("/", verifyToken, createOrganization);
appRoutes.get("/", verifyToken, getOrganization);
appRoutes.post("/workspace", verifyToken, createWorkspace);
appRoutes.get("/workspace/boards", verifyToken, getBoards);
appRoutes.post("/board", verifyToken, createBoard);
appRoutes.get("/board/todo-lists", verifyToken, getTodoLists);
appRoutes.post("/todo-list", verifyToken, createTodoList);
appRoutes.post("/card", verifyToken, createCard);

export default appRoutes;

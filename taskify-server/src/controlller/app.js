import { Board } from "../models/app/board.js";
import { Card } from "../models/app/card.js";
import { Organization } from "../models/app/organization.js";
import { TodoList } from "../models/app/todoList.js";
import { Workspace } from "../models/app/workspace.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { UserRole } from "../utils/constants.js";

export const createOrganization = asyncHandler(async (req, res) => {
  const organization = await Organization.create({
    ...req.body,
    createdBy: req.user,
  });
  const createdOrganization = await Organization.findById(organization._id);
  if (!createdOrganization) {
    throw new ApiError(500, "Something went wrong while creating organization");
  }
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { organization: organization },
        "Created Organization successfully"
      )
    );
});

export const getOrganization = asyncHandler(async (req, res) => {
  const user = req.user;
  const organization = await Organization.findOne({
    createdBy: user._id,
  }).select("_id name createdAt");
  const workspaces = await Workspace.find({
    organization: organization._id,
  }).select("_id avatar name slug organization");
  const boardList = await Board.find({
    workspace: { $in: workspaces.map((workspace) => workspace._id) },
  }).select("_id name workspace imageUrl");

  const updatedWorkspaces = workspaces.map((workspace) => {
    const workspaceBoards = boardList.filter(
      (board) => board.workspace.toString() === workspace._id.toString()
    );
    const ws = workspace._doc;
    return { ...ws, boards: workspaceBoards };
  });

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        organization: {
          _id: organization._id,
          name: organization.name,
          createdAt: organization.createdAt,
          workspaces: updatedWorkspaces,
        },
      },
      "Fetch Organization successfully"
    )
  );
});

export const createWorkspace = asyncHandler(async (req, res) => {
  const { name, slug, orgId } = req.body;
  const organization = await Organization.findById(orgId);
  const workspace = await Workspace.create({
    name,
    slug,
    organization,
    users: [{ user: req.user, role: UserRole.ADMIN }],
    createdBy: req.user,
  });
  const createdWorkspace = await Workspace.findById(workspace._id);
  if (!createdWorkspace) {
    throw new ApiError(500, "Something went wrong while creating workspace");
  }
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { createdWorkspace: createdWorkspace },
        "Created Workspace successfully"
      )
    );
});
export const getWorkspace = asyncHandler(async (req, res) => {});

export const createBoard = asyncHandler(async (req, res) => {
  const { workspaceId, name } = req.body;
  const workspace = await Workspace.findById(workspaceId);
  const board = await Board.create({
    name,
    workspace,
    createdBy: req.user,
  });
  const createdBoard = await Board.findById(board._id);
  if (!createdBoard) {
    throw new ApiError(500, "Something went wrong while creating board");
  }
  return res.status(200).json(
    new ApiResponse(
      200,
      {
        createdBoard: {
          name: name,
          imageUrl: createdBoard.imageUrl,
          _id: createdBoard._id,
          workspace: workspaceId,
        },
      },
      "Created Board successfully"
    )
  );
});

export const getBoards = asyncHandler(async (req, res) => {
  const { workspaceId } = req.query;
  const boardList = await Board.find({ workspace: workspaceId });
  return res.status(200).json(
    new ApiResponse(
      200,
      {
        boardList,
      },
      "Fetch Board List successfully"
    )
  );
});

export const createTodoList = asyncHandler(async (req, res) => {
  const { boardId, name } = req.body;
  const board = await Board.findById(boardId);
  const todoList = await TodoList.create({
    name,
    board,
    createdBy: req.user,
  });
  const createdTodoList = await TodoList.findById(todoList._id);
  if (!createdTodoList) {
    throw new ApiError(500, "Something went wrong while creating todo list");
  }
  return res.status(200).json(
    new ApiResponse(
      200,
      {
        createdBoard: {
          name: name,
          imageUrl: createBoard.imageUrl,
          _id: createBoard._id,
        },
      },
      "Created TodoList successfully"
    )
  );
});
export const getTodoLists = asyncHandler(async (req, res) => {
  const { boardId } = req.query;
  const todoLists = await TodoList.find({ board: boardId }).populate(
    "cards",
    "name description sequence _id"
  );
  return res.status(200).json(
    new ApiResponse(
      200,
      {
        todoLists,
      },
      "Fetch Todo Lists successfully"
    )
  );
});

export const createCard = asyncHandler(async (req, res) => {
  const { todoListId, name, description, sequence } = req.body;
  const todoList = await TodoList.findById(todoListId);
  const card = await Card.create({
    name,
    description,
    todoList,
    sequence,
    createdBy: req.user,
  });
  const createdCard = await Card.findById(card._id);
  if (!createdCard) {
    throw new ApiError(500, "Something went wrong while creating card");
  }
  await TodoList.findByIdAndUpdate(
    {
      _id: todoListId,
    },
    {
      $push: {
        cards: createdCard,
      },
    },
    { new: true }
  );
  return res.status(200).json(
    new ApiResponse(
      200,
      {
        createdCard: {
          name: createdCard.name,
          description: createdCard.description,
          todoListId: todoListId,
          sequence: createdCard.sequence,
          _id: createdCard._id,
        },
      },
      "Created Card successfully"
    )
  );
});
export const getCard = asyncHandler(async (req, res) => {});

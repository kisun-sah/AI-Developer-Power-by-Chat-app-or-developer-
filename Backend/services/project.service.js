import projectModel from "../models/project.model.js";
import mongoose from "mongoose";

export const createProject = async ({ name, userId }) => {
  if (!name) {
    throw new Error("Name is required");
  }
  if (!userId) {
    throw new Error("UserId is required");
  }

  let project;
  try {
    project = await projectModel.create({
      name,
      users: [userId],
    });
  } catch (error) {
    if (error.code === 11000) {
      throw new Error("Project name already exists");
    }
    throw error;
  }

  return project;
};

export const getAllProjectByUserId = async ({ userId }) => {
  if (!userId) {
    throw new Error("UserId is required");
  }

  const allUserProjects = await projectModel.find({
    users: userId,
  });

  return allUserProjects;
};

export const addUsersToProject = async ({ projectId, users, userId }) => {
  if (!projectId) {
    throw new Error("projectId is required");
  }

  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    throw new Error("Invalid projectId");
  }

  if (!users) {
    throw new Error("users are required");
  }

  if (
    !Array.isArray(users) ||
    users.some((userId) => !mongoose.Types.ObjectId.isValid(userId))
  ) {
    throw new Error("Invalid userId(s) in users array");
  }

  if (!userId) {
    throw new Error("userId is required");
  }

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new Error("Invalid userId");
  }

  const project = await projectModel.findOne({
    _id: projectId,
    users: userId,
  });

  console.log(project);

  if (!project) {
    throw new Error("User not belong to this project");
  }

  const updatedProject = await projectModel.findOneAndUpdate(
    {
      _id: projectId,
    },
    {
      $addToSet: {
        users: {
          $each: users,
        },
      },
    },
    {
      new: true,
    }
  );

  return updatedProject;
};

export const getProjectById = async ({ projectId }) => {
  if (!projectId) {
    throw new Error("projectId is required");
  }

  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    throw new Error("Invalid projectId");
  }

  const project = await projectModel
    .findOne({
      _id: projectId,
    })
    .populate("users");

  return project;
};

export const updateFileTree = async ({ projectId, fileTree }) => {
  if (!projectId) {
    throw new Error("projectId is required");
  }

  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    throw new Error("Invalid projectId");
  }

  if (!fileTree) {
    throw new Error("fileTree is required");
  }

  const project = await projectModel.findOneAndUpdate(
    {
      _id: projectId,
    },
    {
      fileTree,
    },
    {
      new: true,
    }
  );

  return project;
};

export const removeFileTree = async ({ projectId }) => {
  if (!projectId) {
    console.error("Error: projectId is required but not provided."); // Log the error
    throw new Error("projectId is required");
  }

  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    console.error(`Error: Invalid projectId provided: ${projectId}`); // Log invalid ID
    throw new Error("Invalid projectId");
  }

  try {
    const project = await projectModel.findOneAndUpdate(
      {
        _id: projectId,
      },
      {
        $unset: { fileTree: "" },
      },
      {
        new: true,
      }
    );

    if (!project) {
      console.error(`Error: Project not found for projectId: ${projectId}`); // Log missing project
      throw new Error("Project not found");
    }

    console.log(`File tree successfully removed for projectId: ${projectId}`); // Log success
    return project;
  } catch (error) {
    console.error(
      `Error removing file tree for projectId: ${projectId}`,
      error
    ); // Log unexpected errors
    throw new Error(
      error.message || "An error occurred while removing the file tree"
    );
  }
};

export const deleteProject = async (projectId) => {
  try {
    const project = await projectModel.findByIdAndDelete(projectId);
    if (!project) {
      throw new Error("Project not found");
    }
    return project;
  } catch (err) {
    throw new Error(err.message);
  }
};

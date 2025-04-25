import { Router } from "express";
import { body } from "express-validator";
import * as projectController from "../controllers/project.controller.js";
import * as authMiddleWare from "../middleware/auth.middleware.js";
import { removeFileTree } from "../services/project.service.js";

const router = Router();

router.post(
  "/create",
  authMiddleWare.authUser,
  body("name").isString().withMessage("Name is required"),
  projectController.createProject
);

router.get("/all", authMiddleWare.authUser, projectController.getAllProject);

router.put(
  "/add-user",
  authMiddleWare.authUser,
  body("projectId").isString().withMessage("Project ID is required"),
  body("users")
    .isArray({ min: 1 })
    .withMessage("Users must be an array of strings")
    .bail()
    .custom((users) => users.every((user) => typeof user === "string"))
    .withMessage("Each user must be a string"),
  projectController.addUserToProject
);

router.get(
  "/get-project/:projectId",
  authMiddleWare.authUser,
  projectController.getProjectById
);

router.put(
  "/update-file-tree",
  authMiddleWare.authUser,
  body("projectId").isString().withMessage("Project ID is required"),
  body("fileTree").isObject().withMessage("File tree is required"),
  projectController.updateFileTree
);

router.delete(
  "/delete/:projectId",
  authMiddleWare.authUser,
  projectController.deleteProject
);

router.delete("/remove-file-tree/:projectId", async (req, res) => {
  try {
    const { projectId } = req.params; // Extract projectId from URL parameters
    if (!projectId) {
      console.error("Error: projectId is missing in the request."); // Log missing projectId
      return res.status(400).json({ error: "projectId is required" });
    }

    const result = await removeFileTree({ projectId });
    res.status(200).json(result);
  } catch (error) {
    console.error("Error in remove-file-tree route:", error.message); // Log route error
    res.status(500).json({ error: error.message });
  }
});



export default router;




import express from "express";
import * as CourseController from "../controllers/CourseController.js";
import { checkAuth } from "../utils/checkAuth.js";

const router = express.Router();

router.post("/", checkAuth, CourseController.createCourse);
router.delete("/:courseId", checkAuth, CourseController.deleteCourse);
router.get("/", CourseController.getCourses);

router.post("/:courseId/save", checkAuth, CourseController.saveCourse);
router.delete("/:courseId/save", checkAuth, CourseController.removeSavedCourse);

router.post("/:courseId/complete", checkAuth, CourseController.completeCourse);

router.post("/:courseId/chapters/:chapterIndex/complete", checkAuth, CourseController.completeChapter);

router.post("/findCourses", CourseController.findCourseByName);

router.patch("/:courseId/rate", checkAuth, CourseController.rateCourse);

router.get("/:courseId", CourseController.getCourse);

router.put("/:courseId", checkAuth, CourseController.updateCourse);

router.put("/:courseId/chapters/:chapterIndex/update", checkAuth, CourseController.updateChapter);

router.delete("/:courseId/chapters/:chapterIndex/delete", checkAuth, CourseController.deleteChapter);

router.get("/:courseId/chapters/:chapterIndex", CourseController.getChapter);

router.post("/:courseId/newChapter", checkAuth, CourseController.addChapter);

export default router;

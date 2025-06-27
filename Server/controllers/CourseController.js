import Course from "../db/models/CourseModel.js";
import User from "../db/models/UserModel.js";
import mongoose from "mongoose";

export const getCourse = async (req, res) => {
  try {
    const { courseId } = req.params;

    const course = await Course.findById(courseId);

    res.status(200).json(course);
  } catch (error) {
    console.error(error);
    res.status(404).json({ message: "Nie znaleziono kursu" });
  }
};

export const createCourse = async (req, res) => {
  try {
    const { title, description, technology, language } = req.body;
    const userId = req.userId;

    const newCourse = new Course({
      author: userId,
      title,
      description,
      technology,
      language,
    });

    const savedCourse = await newCourse.save();

    await User.findByIdAndUpdate(userId, {
      $push: { createdCourses: savedCourse._id },
    });

    res.status(201).json(savedCourse);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Błąd tworzenia kursu" });
  }
};

export const deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.params;

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ message: "Nie znaleziono kursu" });
    }

    if (course.author.toString() !== req.userId) {
      return res
        .status(403)
        .json({ message: "Nie ma dostępu do usunięcia kursu" });
    }

    await Course.findByIdAndDelete(courseId);

    await User.findByIdAndUpdate(req.userId, {
      $pull: { createdCourses: courseId },
    });

    res.status(200).json({ message: "Usunięto kurs" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Nie udało się usunąć kurs" });
  }
};

export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate(
      "author",
      "firstName secondName"
    );

    res.status(200).json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Nie udało się wyswietlić listę kursów" });
  }
};

export const saveCourse = async (req, res) => {
  try {
    const { courseId } = req.params;

    const user = await User.findById(req.userId);

    if (user.savedCourses.includes(courseId)) {
      return res.status(400).json({ message: "Kurs jest już zapisany" });
    }

    user.savedCourses.push(courseId);
    await user.save();

    res.status(200).json({ message: "Kurs jest zapisany" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Nie udało się zapisać kurs" });
  }
};

export const removeSavedCourse = async (req, res) => {
  try {
    const { courseId } = req.params;

    const user = await User.findByIdAndUpdate(
      req.userId,
      { $pull: { savedCourses: courseId } },
      { new: true }
    );

    res.status(200).json(user.savedCourses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Nie udało się usunąć zapisany kurs" });
  }
};

export const completeCourse = async (req, res) => {
  try {
    const { courseId } = req.params;

    const user = await User.findById(req.userId);

    if (user.completedCourses.includes(courseId)) {
      return res.status(400).json({ message: "Kurs jest już skończony" });
    }

    user.completedCourses.push(courseId);
    await user.save();

    res.status(200).json({ message: "Kurs jest zaznaczony jako skończony" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Nie udało się zaznaczyć kurs jako skończony" });
  }
};

export const completeChapter = async (req, res) => {
  try {
    const { courseId, chapterIndex } = req.body;
    const userId = req.userId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "Nie znaleziono użytkownika" });
    }

    const courseProgress = user.completedChapters.find(
      (progress) => progress.courseId.toString() === courseId
    );

    if (courseProgress) {
      if (!courseProgress.chapters.includes(chapterIndex)) {
        courseProgress.chapters.push(chapterIndex);
      }
    } else {
      user.completedChapters.push({
        courseId,
        chapters: [chapterIndex],
      });
    }

    await user.save();

    res
      .status(200)
      .json({ message: "Rozdział jest zaznaczony jako skończony" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Błąd" });
  }
};

export const findCourseByName = async (req, res) => {
  try {
    const { title } = req.body;

    const courses = await Course.find({
      title: { $regex: title, $options: "i" },
    });

    if (!courses) {
      return res.status(404).json({ message: "Nie znaleziono żadnego kursu" });
    }

    res.status(200).json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Nie udało się znaleźć kurs" });
  }
};

export const rateCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { rating } = req.body;

    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "Użytkownik nie znaleziony" });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Kurs nie znaleziony" });
    }

    if (user.ratedCourses.includes(courseId)) {
      return res.status(400).json({ message: "Kurs jest już oceniony" });
    }

    const newRatingCount = course.ratingCount + 1;
    if (course.ratingCount == 0) {
      course.rating = rating.toFixed(2);
    } else {
      course.rating = ((course.rating + rating) / newRatingCount).toFixed(2);
    }

    if (course.rating < 2.0) {
      course.rating = 2.0;
    }

    course.ratingCount = newRatingCount;

    user.ratedCourses.push(courseId);

    await course.save();
    await user.save();

    res.status(200).json({
      message: "Kurs jest oceniony",
      rating: course.rating,
      ratingCount: course.ratingCount,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Nie udało się ocenić kursu" });
  }
};

export const updateCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const updatedData = req.body;

    const course = await Course.findById(courseId);

    if (course.author.toString() !== req.userId) {
      return res
        .status(403)
        .json({ message: "Nie ma dostępu do aktualizacji kursu" });
    }

    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      updatedData,
      { new: true, runValidators: true, overwrite: true }
    );

    if (!updatedCourse) {
      return res.status(404).json({ message: "Nie znaleziono kursu" });
    }

    res
      .status(200)
      .json({ message: "Zaktualizowano dane", data: updatedCourse });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Błąd aktualizacji", error });
  }
};

export const updateChapter = async (req, res) => {
  try {
    const { courseId, chapterIndex } = req.params;
    const updatedChapterData = req.body;

    const course = await Course.findById(courseId);

    if (course.author.toString() !== req.userId) {
      return res
        .status(403)
        .json({ message: "Nie ma dostępu do aktualizacji kursu" });
    }

    const objectId = new mongoose.Types.ObjectId(chapterIndex);

    const chapter = course.ChaptersArray.find((chapter) =>
      chapter._id.equals(objectId)
    );

    updatedChapterData._id = chapter._id;

    const updatedCourse = await Course.findOneAndUpdate(
      { _id: courseId, "ChaptersArray._id": chapterIndex },
      {
        $set: { "ChaptersArray.$": updatedChapterData },
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedCourse) {
      return res
        .status(404)
        .json({ message: "Nie znaleziono kursu albo rozdziału" });
    }

    res
      .status(200)
      .json({ message: "Rozdział jest zaktualizowany", data: updatedCourse });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Błąd aktualizacji", error });
  }
};

export const deleteChapter = async (req, res) => {
  try {
    const { courseId, chapterIndex } = req.params;

    const course = await Course.findById(courseId);

    if (course.author.toString() !== req.userId) {
      return res
        .status(403)
        .json({ message: "Nie ma dostępu do usunięcia kursu" });
    }

    const objectId = new mongoose.Types.ObjectId(chapterIndex);

    const chapter = course.ChaptersArray.find((chapter) =>
      chapter._id.equals(objectId)
    );

    if (!chapter) {
      return res
        .status(404)
        .json({ message: "Nie znaleziono kursu albo rozdziału" });
    }

    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      {
        $pull: { ChaptersArray: { _id: chapterIndex } },
      },
      {
        new: true,
      }
    );

    res.status(200).json({ message: "Rozdział jest usunięty" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Błąd usunięcia", error });
  }
};

export const getChapter = async (req, res) => {
  try {
    const { courseId, chapterIndex } = req.params;

    const course = await Course.findById(courseId);

    const objectId = new mongoose.Types.ObjectId(chapterIndex);

    const chapter = course.ChaptersArray.find((chapter) =>
      chapter._id.equals(objectId)
    );

    res.status(200).json(chapter);
  } catch (error) {
    console.error(error);
    res.status(404).json({ message: "Nie znaleziono kursu albo rozdziłu" });
  }
};

export const addChapter = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { TitleChapter, TextChapter, VideoLink } = req.body;

    const course = await Course.findById(courseId);

    if (course.author.toString() !== req.userId) {
      return res
        .status(403)
        .json({ message: "Nie ma dostępu do stworzenia nowego rozdziału" });
    }

    const newChapter = {
      _id: new mongoose.Types.ObjectId(),
      TitleChapter: TitleChapter,
      TextChapter: TextChapter,
      VideoLink: VideoLink || null,
    };

    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      {
        $push: { ChaptersArray: newChapter },
      },
      { new: true, runValidators: true }
    );

    if (!updatedCourse) {
      return res.status(404).json({ message: "Nie znaleziono kursu" });
    }

    res.status(200).json(updatedCourse);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Błąd dodania rozdziału" });
  }
};

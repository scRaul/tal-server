const Course = require("../models/course");
const Module = require("../models/module");
const Lesson = require("../models/lesson");
const Tag = require("../models/tag");

async function create(userId, title, description, thumbnail) {
  try {
    const existingCourse = await Course.findOne({
      where: { title, userId },
    });
    if (existingCourse) {
      throw new Error("Course with the same title and creator already exists");
    }
    const newCourse = await Course.create({
      userId,
      title,
      description,
      thumbnail,
    });

    return newCourse;
  } catch (error) {
    throw new Error("Error creating course: " + error.message);
  }
}
async function update(courseId, newData) {
  try {
    const course = await Course.findByPk(courseId);
    if (!course) {
      throw new Error("Course not found");
    }
    await course.update(newData);
    return course;
  } catch (error) {
    throw new Error("Error updating course: " + error.message);
  }
}

async function remove(courseId, userId) {
  try {
    const course = await Course.findByPk(courseId);

    if (!course) {
      throw new Error("Course not found");
    }

    if (course.userId != userId) {
      throw new Error("User doesnt have permission to delete this course");
    }
    await course.destroy();
    return "Course deleted successfully";
  } catch (error) {
    throw new Error("Error deleting course: " + error.message);
  }
}
async function getPage(page) {
  try {
    const limit = 10; // Number of courses per page
    const offset = (page - 1) * limit; // Calculate the offset based on the page number

    const courses = await Course.findAll({
      limit,
      offset,
    });

    return courses;
  } catch (error) {
    throw new Error("Error getting courses: " + error.message);
  }
}
async function getByCreator(userId) {
  try {
    const courses = await Course.findAll({
      where: { userId },
      order: [["createdAt", "DESC"]],
    });
    if (!courses) {
      return [];
    }
    return courses;
  } catch (error) {
    throw new Error("Error getting courses" + error.message);
  }
}

async function getById(id) {
  try {
    const course = await Course.findByPk(id);
    if (!course) {
      return [];
    }
    return course;
  } catch (error) {
    throw new Error("Error getting courses" + error.message);
  }
}

async function getByTag(tag) {
  try {
    const tag = await Tag.findOne({ where: { name: tag } });

    if (!tag) {
      return [];
    }

    const courses = await tag.getCourses();

    return courses;
  } catch (error) {
    throw new Error("Error getting courses by tag: " + error.message);
  }
}

async function getCoursesContent(courseId) {
  try {
    // Find the course by ID and include its modules and lessons (excluding lesson content)
    const content = await Course.findByPk(courseId, {
      include: [
        {
          model: Module,
          include: [
            {
              model: Lesson,
              attributes: { exclude: ["content"] }, // Exclude lesson content
            },
          ],
        },
      ],
    });
    return content;
  } catch (error) {
    console.error("Error fetching course content:", error);
    throw error; // Forward the error to the caller
  }
}
module.exports = {
  create,
  update,
  remove,
  getByCreator,
  getById,
  getPage,
  getByTag,
  getCoursesContent,
};

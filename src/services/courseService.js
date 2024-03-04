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
    throw new Error("@Service.create: " + error.message);
  }
}
async function update(userId, newData) {
  try {
    const course = await Course.findByPk(newData.courseId);
    if (!course) {
      throw new Error("Course not found");
    }
    if (course.userId != userId) {
      throw new Error("Unathourized request");
    }
    await course.update(newData);
    return course;
  } catch (error) {
    throw new Error("@Serive.update: " + error.message);
  }
}

async function remove(courseId, userId) {
  try {
    const course = await Course.findByPk(courseId);

    if (!course) {
      throw new Error("Course not found");
    }

    if (course.userId != userId) {
      throw new Error("Unathourized request");
    }
    await course.destroy();
    return "Course deleted successfully";
  } catch (error) {
    throw new Error("@Service.remove: " + error.message);
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
    throw new Error("@Service.getPage: " + error.message);
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
    throw new Error("@Service.getByCreator:" + error.message);
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
    throw new Error("@Service.getById: " + error.message);
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
          order: [["index", "ASC"]],
        },
      ],
    });
    return content;
  } catch (error) {
    throw new Error("@Service.getByCoursesContent:" + error.message);
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

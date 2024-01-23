/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import { Op } from "sequelize";
import ApiError from "../../../errors/ApiError";
import { paginationHelpers } from "../../../helpers/paginationHelpers";
import { utilities } from "../../../helpers/utilities";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptons } from "../../../interfaces/pagination";
import { Skill } from "../skills/skills.model";
import { User } from "../user/user.model";
import { Categories } from "./categories/categories.model";
import Comment from "./comments/comments.model";
import { ProjectLike } from "./likeSystem/like.model";
import { projectSearchableFields } from "./project.constant";
import {
  IApiResponseProjectData,
  IProjectFilters,
  ProjectData,
  ProjectStatus,
} from "./project.interface";
import { Project } from "./project.model";
import { ProjectVote } from "./voteSystem/vote.model";

const createProject = async (
  token: string,
  projectData: ProjectData
): Promise<ProjectData | null> => {
  const isAuthorized = utilities.verifiedTokenAndDb(token);
  if (!isAuthorized) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Unauthorized!");
  }

  const userInfo = (await utilities.tokenToUserInfo(token)) as any;

  if (!userInfo) {
    throw new ApiError(httpStatus.NOT_FOUND, "Your Not Found");
  }

  const authorId: number = userInfo.id;

  projectData.authorId = authorId;
  // projectData.status = ProjectStatus.Public;

  const createdProject = await Project.create(
    projectData as IApiResponseProjectData
  );

  return createdProject.toJSON() as ProjectData;
};

const updateProject = async (
  projectId: string,
  projectData: ProjectData
): Promise<ProjectData | null> => {
  const project = await Project.findByPk(Number(projectId));
  if (!project) {
    throw new ApiError(httpStatus.NOT_FOUND, "Project Not Found");
  }
  await Project.update(projectData, {
    where: { id: projectId },
  });

  const updateGetData = await Project.findOne({ where: { id: projectId } });

  if (!updateGetData) {
    throw new ApiError(httpStatus.NOT_FOUND, "Not Found");
  }

  const userSkillsPlainData = updateGetData.toJSON() as ProjectData;
  return userSkillsPlainData;
};

const deleteProject = async (projectId: string) => {
  const project = await Project.findByPk(Number(projectId));
  if (project) {
    await project.destroy();
    return project;
  }
  return null;
};

const getAllProjects = async (
  userToken: string | null,
  filters: IProjectFilters,
  paginationOptions: IPaginationOptons
) => {
  // For Search
  const {
    searchTerm,
    selectedCategory,
    selectedDuration,
    selectedRequiredSkills,
    selectedTopic,
    selectedFundingStatus,
    selectedLanguage,
    topFilter,
    ...filtersData
  } = filters;

  const andCondition = [];

  if (searchTerm) {
    andCondition.push({
      [Op.or]: projectSearchableFields.map((field) => ({
        [field]: {
          [Op.like]: `%${searchTerm.toLowerCase()}%`,
        },
      })),
    });
  }

  if (selectedDuration) {
    andCondition.push({
      [Op.or]: projectSearchableFields.map((field) => ({
        [field]: {
          [Op.like]: `%${selectedDuration}%`,
        },
      })),
    });
  }

  if (selectedTopic) {
    andCondition.push({
      [Op.or]: projectSearchableFields.map((field) => ({
        [field]: {
          [Op.like]: `%${selectedTopic}%`,
        },
      })),
    });
  }

  if (selectedFundingStatus) {
    andCondition.push({
      [Op.or]: projectSearchableFields.map((field) => ({
        [field]: {
          [Op.like]: `%${selectedFundingStatus}%`,
        },
      })),
    });
  }

  if (selectedLanguage) {
    andCondition.push({
      [Op.or]: projectSearchableFields.map((field) => ({
        [field]: {
          [Op.like]: `%${selectedLanguage}%`,
        },
      })),
    });
  }

  if (selectedRequiredSkills) {
    andCondition.push({
      status: ProjectStatus.Public,
    });
  }

  if (selectedCategory) {
    andCondition.push({
      primary_category: selectedCategory, // Assuming 'categoryId' is the field to match against
    });
  }

  // get only public project
  andCondition.push({
    status: ProjectStatus.Public,
  });
  // top filter option view
  if (topFilter) {
    if (topFilter === "latest") {
      andCondition.push({
        status: ProjectStatus.Public,
      });
    } else if (topFilter === "mostView") {
      andCondition.push({
        status: ProjectStatus.Public,
      });
    } else if (topFilter === "top") {
      andCondition.push({
        status: ProjectStatus.Public,
      });
    } else if (topFilter === "rising") {
      andCondition.push({
        status: ProjectStatus.Public,
      });
    } else {
      andCondition.push({
        status: ProjectStatus.Public,
      });
    }
  }

  // console.log(selectedCategory);
  // For Filter
  if (Object.keys(filtersData).length) {
    andCondition.push({
      [Op.and]: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }
  // For Pagination
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const options = {
    where: {
      [Op.and]: andCondition,
    },
    offset: skip,
    limit,
    order: [] as [string, string][],

    include: [
      {
        model: User,
        attributes: {
          exclude: ["password"],
        },
      },
    ],
  };

  // Update the include property in the options object

  // Rest of the code...

  if (sortBy && sortOrder) {
    options.order.push([sortBy, sortOrder]);
  }

  let result: any;
  let total: any;
  // for user liked and vote check
  if (userToken !== null) {
    const userInfo = (await utilities.tokenToUserInfo(userToken)) as any;
    const { projects, count } = await Project.findAllWithUserLikesVote(
      userInfo.id,
      options
    );
    result = projects;
    total = count;
  } else {
    const projects = await Project.findAndCountAll(options);
    result = projects.rows;
    total = projects.count;
  }

  result = await Promise.all(
    result.map(async (project: any) => {
      const projectId = project.id; // Assuming 'id' is the project's ID field

      // Fetch authorId for this project from ProjectLike
      const projectLikeData = await ProjectLike.findAll({
        where: {
          project_id: projectId, // Filter by the project ID
        },
        order: [["createdAt", "DESC"]],
        // Order by createdAt in descending order
        attributes: ["authorId"], // Select only authorId
      });

      // Extract the authorIds
      const authorIds = projectLikeData.map((like: any) => like.authorId);

      // Fetch user details for authorIds from the User model
      const authors = await User.findAll({
        where: {
          id: authorIds, // Filter by the extracted authorIds
        },
        attributes: ["username", "profileImage"], // Define the attributes you want to retrieve
      });

      // Get the total like count for the project
      const totalLikes = await ProjectLike.count({
        where: {
          project_id: projectId,
        },
      });
      // project vote counting
      const upVote = await ProjectVote.count({
        where: {
          voteType: "up",
          project_id: projectId,
        },
      });

      const downVote = await ProjectVote.count({
        where: {
          voteType: "down",
          project_id: projectId,
        },
      });

      const voteCounts = {
        total: upVote + downVote,
        up: upVote,
        down: downVote,
      };

      const commentsCount = await Comment.count({
        where: {
          projectId: projectId,
        },
      });

      // Add the authors details and total like count to the project data
      return {
        ...project.toJSON(),
        likedUsers: authors,
        totalLikes,
        voteCounts: voteCounts,
        commentsCount,
      };
    })
  );

  const responseData: IGenericResponse<Project[]> = {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
  return responseData;
};

const getAllProjectsByUsername = async (
  userToken: string | null,
  filters: IProjectFilters,
  paginationOptions: IPaginationOptons,
  username: string
) => {
  const user = await User.findOne({
    where: { username },
    attributes: { exclude: ["password"] },
  });
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User Not Found");
  }
  const { id } = user.toJSON();
  // For Search
  const {
    searchTerm,
    selectedCategory,
    selectedDuration,
    selectedRequiredSkills,
    selectedTopic,
    selectedFundingStatus,
    selectedLanguage,
    status,
    topFilter,
    ...filtersData
  } = filters;
  const andCondition = [];
  if (searchTerm) {
    andCondition.push({
      [Op.or]: projectSearchableFields.map((field) => ({
        [field]: {
          [Op.like]: `%${searchTerm.toLowerCase()}%`,
        },
      })),
    });
  }

  if (selectedDuration) {
    andCondition.push({
      [Op.or]: projectSearchableFields.map((field) => ({
        [field]: {
          [Op.like]: `%${selectedDuration}%`,
        },
      })),
    });
  }

  if (selectedTopic) {
    andCondition.push({
      [Op.or]: projectSearchableFields.map((field) => ({
        [field]: {
          [Op.like]: `%${selectedTopic}%`,
        },
      })),
    });
  }

  if (selectedFundingStatus) {
    andCondition.push({
      [Op.or]: projectSearchableFields.map((field) => ({
        [field]: {
          [Op.like]: `%${selectedFundingStatus}%`,
        },
      })),
    });
  }

  if (selectedLanguage) {
    andCondition.push({
      [Op.or]: projectSearchableFields.map((field) => ({
        [field]: {
          [Op.like]: `%${selectedLanguage}%`,
        },
      })),
    });
  }

  if (selectedRequiredSkills) {
    andCondition.push({
      status: ProjectStatus.Public,
    });
  }

  if (selectedCategory) {
    andCondition.push({
      primary_category: selectedCategory, // Assuming 'categoryId' is the field to match against
    });
  }

  if (status) {
    andCondition.push({
      status,
    });
  } else {
    andCondition.push({ status: "Public" });
  }

  // top filter option view
  if (topFilter) {
    if (topFilter === "latest") {
      andCondition.push({
        status: ProjectStatus.Public,
      });
    } else if (topFilter === "mostView") {
      andCondition.push({
        status: ProjectStatus.Public,
      });
    } else if (topFilter === "top") {
      andCondition.push({
        status: ProjectStatus.Public,
      });
    } else if (topFilter === "rising") {
      andCondition.push({
        status: ProjectStatus.Public,
      });
    } else {
      andCondition.push({
        status: ProjectStatus.Public,
      });
    }
  }

  // For Filter
  if (Object.keys(filtersData).length) {
    andCondition.push({
      [Op.and]: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  // For Pagination
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const options = {
    where: {
      [Op.and]: andCondition,
      authorId: id,
    },
    offset: skip,
    limit,
    order: [] as [string, string][],
    include: User,
  };

  if (sortBy && sortOrder) {
    options.order.push([sortBy, sortOrder]);
  }
  let result: any;
  let total: any;
  // for user liked and vote check
  if (userToken !== null) {
    const userInfo = (await utilities.tokenToUserInfo(userToken)) as any;
    const { projects, count } = await Project.findAllWithUserLikesVote(
      userInfo.id,
      options
    );
    result = projects;
    total = count;
  } else {
    const projects = await Project.findAndCountAll(options);
    result = projects.rows;
    total = projects.count;
  }

  result = await Promise.all(
    result.map(async (project: any) => {
      const projectId = project.id; // Assuming 'id' is the project's ID field

      // Fetch authorId for this project from ProjectLike
      const projectLikeData = await ProjectLike.findAll({
        where: {
          project_id: projectId, // Filter by the project ID
        },
        order: [["createdAt", "DESC"]], // Order by createdAt in descending order
        attributes: ["authorId"], // Select only authorId
      });

      // Extract the authorIds
      const authorIds = projectLikeData.map((like: any) => like.authorId);

      // Fetch user details for authorIds from the User model
      const authors = await User.findAll({
        where: {
          id: authorIds, // Filter by the extracted authorIds
        },
        attributes: ["username", "profileImage"], // Define the attributes you want to retrieve
      });

      // Get the total like count for the project
      const totalLikes = await ProjectLike.count({
        where: {
          project_id: projectId,
        },
      });
      // project vote counting
      const upVote = await ProjectVote.count({
        where: {
          voteType: "up",
          project_id: projectId,
        },
      });

      const downVote = await ProjectVote.count({
        where: {
          voteType: "down",
          project_id: projectId,
        },
      });

      const voteCounts = {
        total: upVote + downVote,
        up: upVote,
        down: downVote,
      };
      const commentsCount = await Comment.count({
        where: {
          projectId: projectId,
        },
      });

      // Add the authors details and total like count to the project data
      return {
        ...project.toJSON(),
        likedUsers: authors,
        totalLikes,
        voteCounts: voteCounts,
        commentsCount,
      };
    })
  );

  // const newResult = {
  //   userData: user,
  //   projects: result,
  // };

  const responseData: IGenericResponse<Project[] | any> = {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
  return responseData;
};

const getSingleProject = async (projectId: number) => {
  const project = await Project.findByPk(projectId, {
    include: [
      {
        model: User,
        attributes: {
          exclude: ["password"],
        },
      },
      {
        model: Categories,
      },
    ],
  });

  if (!project) {
    throw new ApiError(httpStatus.NOT_FOUND, "Project not found");
  }
  const { required_skill_list } = project as unknown as {
    required_skill_list: string;
  };
  const requiredSkills = JSON.parse(required_skill_list);
  const skills = await Skill.findAll({
    where: {
      id: requiredSkills,
    },
  });

  project.setDataValue("skills", skills);

  return project;
};

const getAllProjectsByUser = async (paginationOptions: IPaginationOptons) => {
  // For Pagination
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const options = {
    offset: skip,
    limit,
    order: [] as [string, string][],
    include: [
      {
        model: User,
        attributes: {
          exclude: ["password"],
        },
      },
    ],
  };

  if (sortBy && sortOrder) {
    options.order.push([sortBy, sortOrder]);
  }

  const projects = (await Project.findAndCountAll(options)) as any;

  const total = projects.count;

  const formattedProjects = projects.rows.map((project: any) => {
    return {
      id: project.id,
      project_name: project.project_name,
      project_desc: project.project_desc,
      createdAt: project.createdAt,
      commentsCount: project.commentsCount,
      sharesCount: project.sharesCount,
      User: {
        id: project.User.id,
        username: project.User.username,
        profileImage: project.User.profileImage,
        full_name: project.User.full_name,
      },
    };
  });

  const responseData = {
    meta: {
      page,
      limit,
      total,
    },
    data: formattedProjects,
  };
  return responseData;
};

export const ProjectService = {
  createProject,
  getAllProjects,
  getAllProjectsByUsername,
  getAllProjectsByUser,
  getSingleProject,
  updateProject,
  deleteProject,
};

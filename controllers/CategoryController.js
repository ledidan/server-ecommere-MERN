const asyncHandler = require("express-async-handler");
const Category = require("../models/CategoryModel");
const slugify = require("slugify");
const Product = require("../models/ProductModel");
// ?@desc    ADMIN | GET ALL CATEGORIES WITHOUT SEARCH AND PAGINATION
// ?@route   GET /api/categories/
// ?@access  Private

const getAllCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({});

  if (!categories) {
    res.status(500).json({ success: false });
  }
  res.json(categories);
});

const createCategoriesByAdmin = asyncHandler(async (req, res) => {
  const category = new Category({
    name: req.body.name,
    slug: slugify(req.body.name),
    description: req.body.description,
  });
  if (category) {
    const createCategory = await category.save();
    res.status(201).json(createCategory);
  } else if (req.body.parentId) {
    category.parentId = req.body.parentId;
  } else {
    res.status(400);
    throw new Error("The category cannot be created");
  }
});
const deleteCategoryByAdmin = asyncHandler(async (req, res) => {
  const categoryId = await Category.findById(req.params.id);

  if (categoryId) {
    res.status(201).json({ message: "Deleted successfully category" });
    await categoryId.remove();
  } else {
    res.status(404);
    throw new Error("Cannot delete category");
  }
});

const getSingleCategoryByAdmin = asyncHandler(async (req, res) => {
  const singleCategory = await Category.findById(req.params.id).populate(
    "product"
  );
  if (singleCategory) {
    res.status(201).json(singleCategory);
  } else {
    res.status(404);
    throw new Error("Category Cannot Found");
  }
});

const updateCategoryByAdmin = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  const { name, description } = req.body;
  if (category) {
    category.name = name || category.name;
    category.slug = name || category.name;
    category.description = description || category.description;
    const updateCategory = await category.save();
    res.status(201).json(updateCategory);
  } else {
    res.status(400);
    throw new Error("Category Not Found");
  }
});

module.exports = {
  getAllCategories,
  createCategoriesByAdmin,
  deleteCategoryByAdmin,
  getSingleCategoryByAdmin,
  updateCategoryByAdmin,
};

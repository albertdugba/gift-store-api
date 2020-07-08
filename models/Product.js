const mongoose = require("mongoose");
const slugify = require("slugify");

const ProductSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a name"],
    unique: true,
    trim: true,
    maxLength: [50, "Name can'not be more than 50 characters"],
  },
  description: {
    type: String,
    required: [true, "Please add a description"],
    unique: true,
    trim: true,
    maxLength: [400, "Description can'not be more than 400 characters"],
  },

  imageUrl: {
    type: String,
    required: true,
    default: "no-photo.jpg",
  },
  price: {
    type: Number,
    required: true,
  },
  numberInStock: {
    type: Number,
  },
  category: {
    type: String,
  },

  isFeatured: Boolean,
  slug: String,
  tags: {
    type: [String],
    enum: [
      "Birthdays",
      "Christmas",
      "Mothers Day",
      "Outing",
      "Jewelry",
      "Mug",
      "Flowers",
      "Perfume",
      "Decoration",
      "Diaries",
      "Breakfast",
    ],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

ProductSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

module.exports = mongoose.model("Product", ProductSchema);

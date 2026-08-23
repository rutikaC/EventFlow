import { upload } from "../middlewares/multer.middleware.js";
import { Category } from "../models/Category.models.js";
import { Event } from "../models/Event.models.js";
import { uploadImages } from "../utils/upload.utils.js";

export const registerCategory = async (req, res) => {
  try {
    // get data
    const { name, description, image } = req.body;

    // image

    let imageUrl = null;

    if (req.file?.path) {
      imageUrl = await uploadImages(req.file.path);
    }

    const category = await Category.create({
      name,
      description,
      image: imageUrl,
    });

    // validate

    if (!category) {
      return res.status(400).json({
        success: false,
        message: "Category not found",
      });
    }
    // return res

    return res.status(200).json({
      success: true,
      message: "Category registered",
      category,
    });
  } catch (error) {
    console.log(`Category controller error: ${error.message}`);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const updateCategory = async (req, res) => {
  try {
    // get data
    const { categoryId } = req.params;
    const { name, description, image } = req.body;

    // imge update

    let imageUrl = null;

    if (req.file?.path) {
      imageUrl = await uploadImages(req.file.path);
    }
    // update
    const updateCategory = await Category.findByIdAndUpdate(
      categoryId,
      {
        name: name || "",
        description: description || "",
        image: imageUrl || null,
      },
      { new: true },
    );

    if (!updateCategory) {
      return res.status(404).json({
        success: false,
        message: "category  not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Category updated successfully",
      updateCategory,
    });
  } catch (error) {
    console.log(`Update category controller ${error.message}`);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    // find by id

    const { categoryId } = req.params;

    // find category
    const category = await Category.findByIdAndDelete( categoryId );

    // validate
    if (!category) {
      return res.status(400).json({
        success: false,
        message: "Category not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    console.log(`Delete category controller error: ${error.message}`);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getAllCategory = async(req, res) => {
    try {
        // find all category
        const category = await  Category.find();

        // validate
        if(!category){
            return res.status(400)
            .json({
                success:false,
                message:"category dose not found"
            })
        }

        // return res
        return res.status(200)
        .json({
            success:true,
            message:"Fetched All Categories",
            category
        })
    } catch (error) {
        return res.status(500)
        .json({
            success:false,
            message:"Internal Server Error"
        })
    }
}

export const getCategoryByName = async(req, res) =>{
    try {
        // get  data
        const {categoryname} = req.params;
        
        // find by name
        const category = await Category.findOne({name: categoryname});
       

        if(!category){
            return res.status(400)
            .json({
                success:false,
                message:"Category not found"
            })
        }
        // fetch events

        const events = await Event.find({category: category._id});
        console.log("event", events)
        // validate

        if(!events || events.length === 0){
            return res.status(404)
            .json({
                success:false,
                message:"No events for this category"
            })
        }


        // reutrn 
        return res.status(200)
        .json({
            success:true,
            message:"Events fetched by category",
            events
        })

    } catch (error) {
        console.log(`CategorByname controller error: ${error.message}`)
        return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
    }
}
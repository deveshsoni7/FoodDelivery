import foodModal from "../models/foodModal.js";
import fs from 'fs'

// add food items


const addFood = async (req,res)=>{

    let imageFileName = `${req.file.filename}`;

    const food = new foodModal({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image : imageFileName
    })

    try {
        await food.save();
        res.json({sucess:true,message:"Food Added"})
    } catch (error) {
        console.log(error)
        console.log("This is the fistd line")
        console.log(error)
        res.json({sucess:false,message:"Error"})
    }
     
}
// all food list
const listFood = async(req,res) =>{

    try {
        const foods = await foodModal.find({});
        res.json({sucess:true,data:foods})
    } catch (error) {
        console.log(error);
        res.json({sucess:true,message:error})
    }

}

//remove food item

const removeFood = async(req,res)=>{

    try {

        const food = await foodModal.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`,()=>{});

        await foodModal.findByIdAndDelete(req.body.id);

        res.json({sucess:true,message:"Image Removed"})
        
    } catch (error) {
        console.log(error);
        res.json({sucess:true,message:error})
    }

}

export {addFood,listFood,removeFood}
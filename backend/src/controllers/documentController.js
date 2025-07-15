import {
  createDocument,
  getAllDocuments,
  deleteDocument,
} from "../models/documentModel.js";
import { CustomError } from "../utils/customError.js";

export const createDocumentController = async (req, res, next) => {
  const cleaned_data = {
    trip_id: req.params.id,
    document_type: req.body.document_type,
    status: req.body.status,
  };
  try {
    const document = await createDocument(cleaned_data);
    if (!document) {
      return next(new CustomError("Failed to add document",500));
    }
    return res.status(201).json({
      success: true,
      message: "Document added successfully",
      document,
    });
  } catch (error) {
    next(new CustomError(error.message || "Document creation failed",500));
  }
};

export const getAllDocumentsController = async (req, res, next) => {
  const trip_id = req.params.id;
  try{
    const documents = await getAllDocuments(trip_id);
    return res.status(200).json({
      success:true,
      documents,
    });
  }catch(error){
    next(new CustomError(error.message || "Failed to fetch documents",500));
  }
};

export const deletedocumentController = async(req,res,next)=>{
    const document_id = req.params.id;
    try{
        const deletedDocument = await deleteDocument(document_id);
        if(!deletedDocument){
            return next(new CustomError("Document not found",404));
        }
        return res.status(200).json({
          success:true,
          message:"Document deletion successful",
          document:deletedDocument,
        });
    }catch(error){
      next(new CustomError(error.message || "Document deletion failed",500));
    }
}

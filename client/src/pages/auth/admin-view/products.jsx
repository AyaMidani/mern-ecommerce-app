import ProductImageUpload from "@/components/admin-view/image-upload";
import CommonForm from "@/components/common/form";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { addProductFormElements } from "@/config";
import { Fragment, useState } from "react";

const initialFormData ={
    image: null,
    title: '',
    description: '',
    category: '',
    brand: '',
    price: '',
    salePrice: '',
    totalStock: '',
}

function AdminProdcuts(){
    const [openCreateProductDialog,setopenCreateProductDialog]= useState(false);
    const [formData, setFormData]= useState(initialFormData);
    const [ImageFile,setImageFile] = useState(null);
    const [uploadedImageUrl,setuploadedImageUrl]= useState('')
    const [imageLoadingState,setimageLoadingState]=useState(false);
    function onSubmit(){

    }
    console.log(formData);
    return(
        <Fragment>
            <div className="mb-5 w-full flex justify-end">
                <Button onClick={()=>setopenCreateProductDialog(true)}>Added New Product</Button>
            </div>
            <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4"></div>
            <Sheet open={openCreateProductDialog} onOpenChange={()=>{
                setopenCreateProductDialog(false);
            }}>
                <SheetContent side="right" className="overflow-auto">
                    <SheetHeader>
                        <SheetTitle>Add New Product</SheetTitle>
                    </SheetHeader>
                    <ProductImageUpload ImageFile={ImageFile} setImageFile={setImageFile} uploadedImageUrl={uploadedImageUrl} setuploadedImageUrl={setuploadedImageUrl} setimageLoadingState={setimageLoadingState}  />
                    <div className="py-6">
                        <CommonForm formData={formData} setFormData={setFormData} FormControles={addProductFormElements} buttonText='Add' onSubmit={onSubmit}>

                        </CommonForm>
                    </div>
                </SheetContent>
            </Sheet>
        </Fragment>
    )
}

export default AdminProdcuts;
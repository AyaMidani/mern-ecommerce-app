import ProductImageUpload from "@/components/admin-view/image-upload";
import CommonForm from "@/components/common/form";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { addProductFormElements } from "@/config";
import { addNewProduct, deleteProduct, editProduct, fetchAllProducts } from "@/store/admin/products-slice";
import { Fragment, useEffect, useState } from "react";
import { useDispatch ,useSelector} from "react-redux";
import { useToast } from "@/hooks/use-toast";
import AdminProductTile from "@/components/admin-view/product-tile";

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

function AdminProducts(){
    const [openCreateProductDialog,setopenCreateProductDialog]= useState(false);
    const [formData, setFormData]= useState(initialFormData);
    const [ImageFile,setImageFile] = useState(null);
    const [uploadedImageUrl,setuploadedImageUrl]= useState('')
    const [imageLoadingState,setimageLoadingState]=useState(false);
    const dispatch=useDispatch();
    const {toast}=useToast();
    const { productList } = useSelector((state)=>state.adminProducts)
    const [currentEditedId, setcurrentEditedId]=useState(null)

    function onSubmit(event){
        event.preventDefault();
        currentEditedId !== null ?
        dispatch(editProduct({
            id: currentEditedId,
            formData: formData
        }
        )).then((data) => {
            if(data?.payload?.success)
            {
                dispatch(fetchAllProducts())
                setImageFile(null)
                setFormData(initialFormData)
                setopenCreateProductDialog(false)
                setcurrentEditedId(null)
                toast({
                title: "Product Edited Successfully",
            });
            }
            else{
                toast({
                  title: data?.payload?.message,
                  variant: 'destructive'
            });
        }})
        : dispatch(addNewProduct({
            ...formData,
            image:uploadedImageUrl
        })).then((data)=>{
            console.log(data)
            if(data?.payload?.success)
            {
                dispatch(fetchAllProducts())
                setImageFile(null)
                setFormData(initialFormData)
                setopenCreateProductDialog(false)
                toast({
                title: "Product Added Successfully",
            });
            }
            else{
                toast({
                  title: data?.payload?.message,
                  variant: 'destructive'
            });
        }      
    })
    }

    function handleDelete(currentProductId) {
  dispatch(deleteProduct(currentProductId)).then((data) => {
    console.log(data,currentProductId)
    if (data?.payload?.success) {
      dispatch(fetchAllProducts());
      toast({ title: "Product Deleted Successfully" });
    } else {
      toast({
        title: data?.payload?.message || "Delete failed",
        variant: "destructive",
      });
    }
  });
}
    function isFormValid(){ 
        return Object.keys(formData).map(key=> formData[key] !== "").every((item => item));
    }
    useEffect(()=>{
        dispatch(fetchAllProducts())
    },[dispatch])
    return(
        <Fragment>
            <div className="mb-5 w-full flex justify-end">
                <Button onClick={()=>setopenCreateProductDialog(true)}>Added New Product</Button>
            </div>
            <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
                {
                    productList && productList.length >0 ?
                    productList.map((productItem) => (
            <AdminProductTile
                    key={productItem._id || productItem.id}
                    setcurrentEditedId={setcurrentEditedId}
                    setopenCreateProductDialog={setopenCreateProductDialog}
                    setFormData={setFormData}
                    product={productItem}
                    handleDelete={handleDelete}
            />)) : null
            }
            </div>
            <Sheet open={openCreateProductDialog} onOpenChange={()=>{
                setopenCreateProductDialog(false)
                setcurrentEditedId(null)
                setFormData(initialFormData)
            }}>
                <SheetContent side="right" className="overflow-auto">
                    <SheetHeader>
                    <SheetTitle>
                    {
                        currentEditedId !== null ?
                        'Edit Product' : 'Add New Product'
                    }
                    </SheetTitle>
                    </SheetHeader>
                    <ProductImageUpload ImageFile={ImageFile} setImageFile={setImageFile} uploadedImageUrl={uploadedImageUrl} setuploadedImageUrl={setuploadedImageUrl} setimageLoadingState={setimageLoadingState} imageLoadingState={imageLoadingState} currentEditedId={currentEditedId} isEditMode={currentEditedId !== null}  />
                    <div className="py-6">
                        <CommonForm formData={formData} setFormData={setFormData} FormControles={addProductFormElements} 
                        buttonText={
                        currentEditedId !== null ?
                        'Edit' : 'Add'}
                         onSubmit={onSubmit} isBtnDisabled={!isFormValid()}>
                        </CommonForm>
                    </div>
                </SheetContent>
            </Sheet>
        </Fragment>
    )
}

export default AdminProducts;
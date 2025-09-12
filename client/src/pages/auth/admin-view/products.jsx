import ProductImageUpload from "@/components/admin-view/image-upload";
import CommonForm from "@/components/common/form";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { addProductFormElements } from "@/config";
import { addNewProduct, fetchAllProducts } from "@/store/admin/products-slice";
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

    function onSubmit(event){
        event.preventDefault();
        dispatch(addNewProduct({
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
                    productList.map(productItem => <AdminProductTile product={productItem}/>): null
                }
            </div>
            <Sheet open={openCreateProductDialog} onOpenChange={()=>{
                setopenCreateProductDialog(false);
            }}>
                <SheetContent side="right" className="overflow-auto">
                    <SheetHeader>
                        <SheetTitle>Add New Product</SheetTitle>
                    </SheetHeader>
                    <ProductImageUpload ImageFile={ImageFile} setImageFile={setImageFile} uploadedImageUrl={uploadedImageUrl} setuploadedImageUrl={setuploadedImageUrl} setimageLoadingState={setimageLoadingState} imageLoadingState={imageLoadingState}  />
                    <div className="py-6">
                        <CommonForm formData={formData} setFormData={setFormData} FormControles={addProductFormElements} buttonText='Add' onSubmit={onSubmit}>
                        </CommonForm>
                    </div>
                </SheetContent>
            </Sheet>
        </Fragment>
    )
}

export default AdminProducts;
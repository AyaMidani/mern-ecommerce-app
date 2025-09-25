import ProductImageUpload from "@/components/admin-view/image-upload";
import { Button } from "@/components/ui/button";
import { addFeatureImage , getFeatureImages } from "@/store/common-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function AdminDashboard(){
    
    const [ImageFile,setImageFile] = useState(null);
    const [uploadedImageUrl,setuploadedImageUrl]= useState('')
    const [imageLoadingState,setimageLoadingState]=useState(false);
    const dispatch = useDispatch();
    const { featureImageList } = useSelector((state)=> state.commonFeature)

    function handleUploadFeatureImage(){
        dispatch(addFeatureImage(uploadedImageUrl)).then((data) => {
            if(data?.payload?.success){
                dispatch(getFeatureImages())
                setImageFile(null)
                setuploadedImageUrl("")
            }
        });
    }
    useEffect(()=>{
        dispatch(getFeatureImages())
    },[dispatch])
    return(
        <div>
        <ProductImageUpload isCustomeStyling={true} ImageFile={ImageFile} setImageFile={setImageFile} uploadedImageUrl={uploadedImageUrl} setuploadedImageUrl={setuploadedImageUrl} setimageLoadingState={setimageLoadingState} imageLoadingState={imageLoadingState} />
        <Button onClick={handleUploadFeatureImage} className="mt-5 w-full">Upload</Button>
        <div className="flex flex-col gap-4 mt-5">
            {
                featureImageList && featureImageList.length > 0 ?
                featureImageList.map(featureImageItem => 
                <div className="relative">
                    <img 
                    src={featureImageItem?.image}
                    className="w-full h-[300px] object-cover rounded-t-lg"
                    />
            </div>
            ) : null
            }
        </div>
        </div>
    )
}

export default AdminDashboard;
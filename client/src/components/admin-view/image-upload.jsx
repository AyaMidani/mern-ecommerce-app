import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { useEffect, useRef } from "react";
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import axios from "axios";
import { Skeleton } from "../ui/skeleton";

function ProductImageUpload({
  ImageFile,
  setImageFile,
  uploadedImageUrl,
  setuploadedImageUrl,
  setimageLoadingState,
  imageLoadingState,
  isEditMode,
  currentEditedId,
  isCustomeStyling = false,
}) {
  const inputRef = useRef(null);

  /* ----------------------- FILE HANDLERS ----------------------- */
  function handleImageFileChange(event) {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) setImageFile(selectedFile);
  }

  function handleDragOver(event) {
    event.preventDefault();
  }

  function handleDrop(event) {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files?.[0];
    if (droppedFile) setImageFile(droppedFile);
  }

  function handleRemoveImage() {
    setImageFile(null);
    setuploadedImageUrl(null);
    if (inputRef.current) inputRef.current.value = "";
  }

  /* ----------------------- AUTH HEADER ----------------------- */
  const getAuthHeaders = () => {
    const token = JSON.parse(sessionStorage.getItem("token"));
    return {
      Authorization: `Bearer ${token}`,
    };
  };

  /* ----------------------- UPLOAD ----------------------- */
  async function uploadImageToCloudinary() {
    try {
      setimageLoadingState(true);

      const data = new FormData();
      data.append("my_file", ImageFile);

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/admin/products/upload-image`,
        data,
        { headers: getAuthHeaders() }
      );

      console.log("UPLOAD RESPONSE:", response.data);

      if (response.data?.success) {
        const imageUrl =
          response.data.result?.secure_url ||
          response.data.result?.url ||
          response.data.imageUrl;

        setuploadedImageUrl(imageUrl);
      }
    } catch (error) {
      console.error("Image upload failed:", error);
    } finally {
      setimageLoadingState(false);
    }
  }

  useEffect(() => {
    if (ImageFile) uploadImageToCloudinary();
  }, [ImageFile]);

  /* ----------------------- UI ----------------------- */
  return (
    <div className={`w-full mt-4 ${isCustomeStyling ? "" : "max-w-md mx-auto"}`}>
      <Label className="text-lg font-semibold mb-2 block">Upload Image</Label>

      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`${
          isEditMode ? "opacity-60" : ""
        } border-2 border-dashed rounded-lg p-4`}
      >
        <Input
          id="image-upload"
          type="file"
          className="hidden"
          ref={inputRef}
          onChange={handleImageFileChange}
          disabled={isEditMode}
        />

        {!ImageFile ? (
          <Label
            htmlFor="image-upload"
            className={`${
              isEditMode ? "cursor-not-allowed" : ""
            } flex flex-col items-center justify-center h-32 cursor-pointer`}
          >
            <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
            <span>Drag & drop or click to upload image</span>
          </Label>
        ) : imageLoadingState ? (
          <Skeleton className="h-10 bg-gray-200" />
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FileIcon className="w-7 text-primary mr-2 h-8" />
              <p className="text-sm font-medium">{ImageFile.name}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleRemoveImage}
            >
              <XIcon className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>

     
    </div>
  );
}

export default ProductImageUpload;

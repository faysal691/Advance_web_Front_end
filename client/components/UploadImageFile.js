import { apiService } from "@/service";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from 'next/router';

const UploadImageFile = ({ userId, existingImage }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageUrl, setSelectedImageUrl] = useState(null);
  const router = useRouter();

  const fetchImageData = async (imageSrc) => {
    try {
      let imageFileName = imageSrc.substring(
        imageSrc.indexOf("3000/") + "3000/".length
      );
      imageFileName = imageFileName.substring(0, imageFileName.indexOf("."));
      const response = await fetch(imageSrc);
      const blob = await response.blob();
      const file = new File([blob], imageFileName, { type: blob.type });
      // return URL.createObjectURL(blob)
      console.log("Fetched Image", file);
      return file;
    } catch (error) {
      const file = new File([], "");
      console.error("Error fetching image data:", error);
      return file;
    }
  };

  const updateProfilePicture = async (userId, selectedImage) => {
    const formData = new FormData();
    formData.append("profilepic", selectedImage);

    try {
      const response = await apiService.post(
        `user/upload?id=${userId}`,
        formData
      );

      console.log("Upload User Image Log", response);

      if (response.status == 201 || response.data.status == 200) {
        toast.success(response.data.message);
        setTimeout(() => {
          router.back();
        }
        , 2000);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.log("Error Uploading Profile Picture", error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (existingImage != null) {
      setSelectedImageUrl(existingImage);
      setSelectedImage(fetchImageData(existingImage));
    }
  }, [existingImage]);

  return (
    <section className="container w-full mx-auto items-center py-4">
      <div className="max-w-sm mx-auto bg-white rounded-lg shadow-md overflow-hidden items-center">
        <div className="px-4 py-6">
          <div
            id="image-preview"
            className={`max-w-sm p-6 mb-4 bg-gray-100 ${
              selectedImage != null
                ? ""
                : "border-dashed border-2 border-gray-400"
            } rounded-lg items-center mx-auto text-center cursor-pointer`}
          >
            {selectedImage == null ? (
              <img
                src="/user-place-holder-image.jpg"
                class="max-h-24 rounded-lg mx-auto mb-4"
                alt="Image preview"
              />
            ) : (
              <img
                src={selectedImageUrl}
                class="max-h-24 rounded-lg mx-auto mb-4"
                alt="Image preview"
              />
            )}
            <input
              id="upload"
              type="file"
              className="hidden"
              accept="image/*"
              onChange={(e) => {
                console.log("Selected Image", e.target.files[0]);
                const blob = new Blob([e.target.files[0]], {
                  type: e.target.files[0].type,
                });
                setSelectedImage(e.target.files[0]);
                setSelectedImageUrl(URL.createObjectURL(blob));
              }}
            />
            <label for="upload" className="cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-8 h-8 text-gray-700 mx-auto mb-4"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                />
              </svg>
              <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-700">
                Upload picture
              </h5>
              <p className="font-normal text-sm text-gray-400 md:px-6">
                Choosen photo should be in{" "}
                <b className="text-gray-600">JPG, PNG, or GIF</b> format.
              </p>
              <span id="filename" className="text-gray-500 bg-gray-200 z-50">
                {selectedImage != null ? "Image" : ""}
              </span>
            </label>
          </div>
          <div class="flex items-center justify-center">
            <div class="w-full flex">
              <button
                disabled={selectedImage == null}
                onClick={() => {
                  updateProfilePicture(userId, selectedImage);
                }}
                class="w-1/2 text-white bg-[#050708] hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 flex items-center justify-center mr-2 mb-2"
              >
                <span class="text-center ml-2">Update</span>
              </button>
              <button class="w-1/2 text-white bg-[#050708] hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 flex items-center justify-center mr-2 mb-2">
                <span
                  onClick={() => {
                    setSelectedImage(null);
                    setSelectedImageUrl(null);
                  }}
                  class="text-center ml-2"
                >
                  Reset
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UploadImageFile;

import React, { useState } from 'react';
interface IUploadImageResponse {
  secure_url: string;
}

const useSelectFile = () => {
  const [selectedFile, setSelectedFile] = useState<File>();
  const [previewImage, setPreviewImage] = useState<string>();
  const onSelectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();

    if (event.target.files?.[0]) {
      reader.readAsDataURL(event.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      if (readerEvent.target?.result) {
        setPreviewImage(readerEvent.target.result as string);
      }
    };
    setSelectedFile(event?.target?.files?.[0]);
  };

  const uploadImage = async (
    image: File,
    signature: string,
    timestamp: number
  ): Promise<IUploadImageResponse> => {
    const url = `https://api.cloudinary.com/v1_1/mamsheikh/upload`;
    const formData = new FormData();
    formData.append('file', image);
    formData.append('signature', signature);
    formData.append('timestamp', timestamp.toString());
    formData.append(
      'api_key',
      process.env.NEXT_PUBLIC_CLOUDINARY_KEY ?? '853327599895778'
    );

    const response = await fetch(url, {
      method: 'post',
      body: formData,
    });

    return response.json();
  };
  return {
    selectedFile,
    setSelectedFile,
    onSelectFile,
    uploadImage,
    previewImage,
    setPreviewImage,
  };
};
export default useSelectFile;

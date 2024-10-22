import React, { useState } from "react";
import { Upload, message, Typography } from "antd";
import { MdOutlineFileUpload } from "react-icons/md";
import type { GetProp, UploadProps } from "antd";
import { get } from "lodash";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (img: FileType, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result as string));
    reader.readAsDataURL(img);
};

const beforeUpload = (file: FileType) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
        message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
};

const FileUploadToStrapi = ({
                                value = [],
                                onChange,
                            }: {
    value: any[];
    onChange?: Function;
}) => {
    const [fileList, setFileList] = useState(value);

    const handleUploadChange = (info) => {
        const newFileList = info.fileList.map((file) => {
            // Strapi'dan qaytgan response'dan documentId olish
            if (file.status === "done" && file.response) {
                return {
                    ...file,
                    documentId: get(file, "response[0].documentId", undefined), // Fayl ID sini qo‘shish
                    id: get(file, "response[0].id", undefined), // Fayl ID sini qo‘shish
                    url: get(file, "response[0].url", undefined), // Fayl URL'sini qo‘shish
                };
            }
            return file;
        });

        setFileList(newFileList);

        if (info.file.status === "done") {
            message.success(`${info.file.name} muvaffaqiyatli yuklandi.`);
        } else if (info.file.status === "error") {
            message.error(`${info.file.name} yuklashda xatolik yuz berdi.`);
        }

        // onChange funksiyasini chaqirib, Form.Item'ga yangi fileList ni yuboramiz
        onChange?.(newFileList);
    };

    return (
        <Upload
            multiple={false}
            maxCount={1}
            name="files"
            action="http://13.60.199.254:8080/admin/category"
            headers={{
                Authorization: `Bearer ${localStorage.getItem("refreshToken")}`,
            }}
            listType="picture-card"
            beforeUpload={beforeUpload}
            onChange={handleUploadChange}
            // showUploadList={false}
            //   multiple // bir nechta fayllarni yuklash uchun
        >
            <Typography className="flex flex-col items-center gap-2">
                <MdOutlineFileUpload /> <span>File Upload</span>
            </Typography>
        </Upload>
    );
};

export default FileUploadToStrapi;

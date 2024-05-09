import { useState } from "react";
import { HomeHeader } from "./Homepage";
import { PlusOutlined } from "@ant-design/icons";
import { Image, message, Upload } from "antd";
import type { GetProp, UploadFile, UploadProps } from "antd";
import { createEmployee } from "../services/createService";
import { useUserStore } from "../zustand/useUserStore";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export default function CreateEmployee() {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [designation, setDesignattion] = useState("");
  const [gender, setGender] = useState("");
  const [course, setCourse] = useState("");
  const loggedUser = useUserStore((s: any) => s.user);
  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />

      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );
  async function onCreate() {
    const creatingEmployee = await createEmployee({
      name,
      email,
      mobile: number,
      designation,
      gender,
      course,
      image: fileList[0].thumbUrl || "",
      userId: loggedUser[0].id,
    });
    message.success("employee created successfully");
    console.log({
      name,
      email,
      mobile: number,
      designation,
      gender,
      course,
      image:
        fileList.length > 0
          ? fileList[0].thumbUrl
          : "data:image/png;base64,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",
      userId: loggedUser[0].id,
    });
  }

  return (
    <div>
      <HomeHeader title="Create Employee" />
      <div style={{ margin: 50 }}>
        <label>Name : </label>
        <input
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <br />
        <br />
        <label>Email : </label>
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <br />
        <br />
        <label>Mobile No : </label>
        <input
          type="text"
          value={number}
          onChange={(e) => {
            setNumber(e.target.value);
          }}
        />
        <br />
        <br />
        <label>Designation : </label>
        <select
          onChange={(e) => {
            setDesignattion(e.target.value);
          }}
        >
          <option></option>
          <option>HR</option>
          <option>Manager</option>
          <option>Sales</option>
        </select>
        <br />
        <br />
        <label>course : </label>
        <input
          type="checkbox"
          value="MCA"
          onChange={(e) => {
            setCourse(e.target.value);
          }}
        />
        <label>MCA</label>
        <input
          type="checkbox"
          value="BCA"
          onChange={(e) => {
            setCourse(e.target.value);
          }}
        />
        <label>BCA</label>
        <input
          type="checkbox"
          value="BSC"
          onChange={(e) => {
            setCourse(e.target.value);
          }}
        />
        <label>BSC</label>
        <br />
        <br />
        <label>Gender : </label>
        <input
          type="radio"
          value="Male"
          name="Male"
          onChange={(e) => {
            setGender(e.target.value);
          }}
        />
        <label>Male</label>
        <input
          type="radio"
          value="Female"
          onChange={(e) => {
            setGender(e.target.value);
          }}
        />
        <label>Female</label>
        <br />
        <br />
        <Upload
          action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
          listType="picture-card"
          fileList={fileList}
          onPreview={handlePreview}
          onChange={handleChange}
        >
          {fileList.length >= 8 ? null : uploadButton}
        </Upload>
        {previewImage && (
          <Image
            wrapperStyle={{ display: "none" }}
            preview={{
              visible: previewOpen,
              onVisibleChange: (visible) => setPreviewOpen(visible),
              afterOpenChange: (visible) => !visible && setPreviewImage(""),
            }}
            src={previewImage}
          />
        )}
        <br />
        <input type="button" value="create" onClick={onCreate} />
      </div>
    </div>
  );
}

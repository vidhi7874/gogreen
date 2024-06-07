import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Spinner,
  Text,
} from "@chakra-ui/react";
import {
  AiOutlineCloudUpload,
  AiOutlineCloudDownload,
  AiOutlineDownload,
} from "react-icons/ai";
import { usePostFileUploadMutation } from "../../features/master-api-slice";
import { useFormContext } from "react-hook-form";
import DownloadFilesFromUrl from "../DownloadFileFromUrl";
import { showToastByStatusCode } from "../../services/showToastByStatusCode";

const FileUploadCmp = ({
  label,
  name,
  type,
  isError,
  isDisabled = false,
  isRequired = true,
  placeholder,
  showDownloadIcon = false,
  allowedTypes,
  fileName = null,
  isMultipalUpload,
  clearFileName = false,
  onChange,
  value,
  maxFileSize, // Add a prop for maximum file size in bytes.
}) => {
  const {
    control,
    register,
    getValues,
    formState: { errors },
  } = useFormContext();

  console.log("FileUploadCmp --getValues --->", getValues());
  console.log("FileUploadCmp --value  --->", value);

  console.log("file upload input errr ->", name, errors[name]);
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);
  const [filepath, setFilePath] = useState("");

  const [fileUploadHandle, { isLoading: addBankMasterApiIsLoading }] =
    usePostFileUploadMutation();

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileUpload = async (event) => {
    const selectedFiles = Array.from(event.target.files);
    const validFiles = selectedFiles.filter((file) =>
      allowedTypes.includes(file.type)
    );

    console.log("validFiles", validFiles?.[0]?.name);

    const oversizedFiles = validFiles.filter((file) => file.size > maxFileSize);

    if (oversizedFiles.length > 0) {
      // Handle oversized files
      // console.error("Oversized files:", oversizedFiles);
      showToastByStatusCode(
        400,
        `File size is too large. Please upload a file with a maximum size of ${
          maxFileSize / 1024 / 1024
        } MB`
      );
      return;
    }

    if (isMultipalUpload) {
      // For multiple file upload
      setFiles(validFiles);
      //  onChange(validFiles);
    } else {
      // For single file upload
      if (validFiles.length > 0) {
        setFiles(validFiles);
        const selectedFile = validFiles[0];
        const formData = new FormData();
        formData.append("vaibhav_file_path", selectedFile);

        try {
          const response = await fileUploadHandle(formData).unwrap();
          console.log(response);
          if (response?.status === 200) {
            setFilePath(response?.data?.vaibhav_file_path);
            onChange(response?.data?.vaibhav_file_path || "");
          }
        } catch (error) {
          // Handle the error here
          console.error("File upload error:", error);
        }
      }
    }
  };

  useEffect(() => {
    setFiles([]);
  }, [clearFileName]);

  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <Box mt={"-7px"}>
        <Flex
          backgroundColor={"gray.200"}
          border={"1px solid"}
          borderColor={isError ? "red" : "#c3c3c3"}
          borderRadius={"lg"}
          _hover={{
            borderColor: "primary.700",
            backgroundColor: "primary.200",
          }}
          p={{ base: "1" }}
          height={"33px"}
          // minHeight={{ base: "40px" }}
          fontWeight={{ base: "normal" }}
          fontStyle={"normal"}
          cursor={"pointer"}
          justifyContent="space-between"
          alignItems="center"
        >
          {isMultipalUpload && files.length > 0 ? (
            <Box>
              {files.map((file, index) => (
                <Text
                  key={index}
                  textAlign="left"
                  //   width={"250px"}
                  fontSize="x-small"
                >
                  {file.name}
                </Text>
              ))}
            </Box>
          ) : (
            <Text noOfLines={1} textAlign="left" fontSize="sm">
              {files.length > 0
                ? files[0].name || fileName
                : value || fileName || placeholder || "File Upload"}
            </Text>
          )}

          <Flex gap={2}>
            {addBankMasterApiIsLoading ? (
              <Spinner
                thickness="2px"
                speed="0.5s"
                emptyColor="gray.800"
                color="primary.700"
                size="sm"
              />
            ) : (
              <AiOutlineCloudUpload
                onClick={handleButtonClick}
                title="upload file"
                flex="none"
                fontSize={"20px"}
              />
            )}
            {(files.length > 0 || value) &&
              showDownloadIcon &&
              !addBankMasterApiIsLoading && (
                <Box>
                  <DownloadFilesFromUrl
                    details={{
                      paths: [getValues(name)],
                      fileName: fileName || "file_download",
                    }}
                    iconFontSize="20px"
                  />
                </Box>
              )}
          </Flex>
        </Flex>
        <Input
          type="file"
          isDisabled={isDisabled}
          name={name}
          {...register(name, {
            required: isRequired,
          })}
          ref={fileInputRef}
          height={"15px"}
          display={"none"}
          accept={allowedTypes.join(",")}
          multiple={isMultipalUpload}
          onChange={handleFileUpload}
        />
      </Box>
    </FormControl>
  );
};

export default FileUploadCmp;

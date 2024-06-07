import React, { useRef } from "react";
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
import { Controller, useFormContext } from "react-hook-form";
import { AiOutlineCloudUpload, AiOutlineDownload } from "react-icons/ai";

import { usePostFileUploadMutation } from "../../features/master-api-slice";
import { showToastByStatusCode } from "../../services/showToastByStatusCode";

function CustomFileInput({
  name,
  placeholder,
  type,
  label,
  style,
  onChange,
  value,
  InputDisabled,
  showErr,
  title = "Click to download",
  isCustomControl,
}) {
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    if (!addBankMasterApiIsLoading) {
      fileInputRef.current.click();
    }
  };

  const [fileUploadHandle, { isLoading: addBankMasterApiIsLoading }] =
    usePostFileUploadMutation();

  const handleFileUpload = async (e) => {
    try {
      if (e?.target?.files[0]) {
        const selectedFile = e.target.files[0];
        const formData = new FormData();
        formData.append("vaibhav_file_path", selectedFile);
        const response = await fileUploadHandle(formData).unwrap();

        console.log(response, "file");
        if (response?.status === 200) {
          onChange(response?.data?.vaibhav_file_path || "");
        }
      }
    } catch (error) {
      let errorMessage =
        error?.data?.data ||
        error?.data?.message ||
        error?.data ||
        "Photo Catcher Failed";
      console.log("Error:", errorMessage);
      toasterAlert({
        message: JSON.stringify(errorMessage),
        status: 440,
      });
      console.error("Error:", error);
    }
  };

  const toasterAlert = (obj) => {
    let msg = obj?.message;
    let status = obj?.status;
    console.log("toasterAlert", obj);
    if (status === 400) {
      const errorData =
        obj?.data?.message ||
        obj?.data?.data ||
        obj?.data ||
        "Photo Catcher Failed";
      let errorMessage = "";

      Object.keys(errorData)?.forEach((key) => {
        const messages = errorData[key];
        console.log("messages --> ", messages);
        if (typeof messages === "object") {
          messages &&
            messages?.forEach((message) => {
              errorMessage += `${key} : ${message} \n`;
            });
        } else {
          showToastByStatusCode(status, msg);
        }
      });
      showToastByStatusCode(status, errorMessage);
      return false;
    } else if (status === 410) {
      showToastByStatusCode(status, msg);
    }
    showToastByStatusCode(status, msg);
  };

  const {
    control,
    formState: { errors },
  } = useFormContext();

  // console.log("errors", errors);
  const error = errors[name];
  // console.log("errorcheck==>", error);

  return (
    <FormControl {...style} isInvalid={!!error}>
      <FormLabel>{label}</FormLabel>
      <Box>
        <Controller
          control={isCustomControl || control}
          name={name}
          render={({ field }) => (
            <Box {...field}>
              <Flex
                onClick={handleButtonClick}
                backgroundColor={"gray.200"}
                border={"1px solid"}
                borderColor={showErr ? "red" : "gray.10"}
                borderRadius={"lg"}
                _placeholder={{ color: "gray.300" }}
                _hover={{
                  borderColor: "primary.700",
                  backgroundColor: "primary.200",
                }}
                _focus={{
                  borderColor: "primary.700",
                  backgroundColor: "primary.200",
                  boxShadow: "none",
                }}
                p={{ base: "2" }}
                height={{ base: "40px" }}
                fontWeight={{ base: "normal" }}
                fontStyle={"normal"}
                cursor={"pointer"}
                justifyContent="space-between"
                alignItems="center"
              >
                <Text width={"200px"} fontSize={value ? "x-small" : "inherit"}>
                  {addBankMasterApiIsLoading
                    ? "Loading ..."
                    : value
                    ? value?.split("media/docs/")[1]
                    : placeholder
                    ? placeholder
                    : "File Upload"}{" "}
                </Text>
                <Flex gap={2}>
                  <AiOutlineCloudUpload flex="none" fontSize={"20px"} />
                  {value && (
                    <Box>
                      <AiOutlineDownload
                        flex="none"
                        title={title}
                        fontSize={"20px"}
                        onClick={() => {
                          window.open(
                            `${process.env.REACT_APP_API_BASE_URL_LOCAL}${value}`,
                            "_blank"
                          );
                        }}
                      />
                    </Box>
                  )}
                </Flex>
              </Flex>
              <Input
                // {...field}
                type="file"
                ref={fileInputRef}
                height={"15px"}
                display={"none"}
                accept={type}
                onChange={handleFileUpload}
                isDisabled={InputDisabled}
                // width={{ base: "90%" }}
                // borderColor={showErr ? "red" : "gray.10"}
              />
            </Box>
          )}
        />
      </Box>
      {/* <FormErrorMessage>{error && error.message}</FormErrorMessage> */}
    </FormControl>
  );
}

export default CustomFileInput;

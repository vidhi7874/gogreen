import { Box, Button, Flex } from "@chakra-ui/react";
import React, { useRef } from "react";
import SignaturePad from "react-signature-canvas";
import { usePostFileUploadMutation } from "../../features/master-api-slice";
import { showToastByStatusCode } from "../../services/showToastByStatusCode";

function CustomSign({ onChange }) {
  const sigCanvas = useRef({});

  const [fileUploadHandle, { isLoading: addBankMasterApiIsLoading }] =
    usePostFileUploadMutation();

  const SaveCanvas = async () => {
    // console.log(sigCanvas.current.getTrimmedCanvas().toDataURL("image/png"));
    // setImgValue(sigCanvas.current.getTrimmedCanvas().toDataURL("image/png"));
    console.log(document.getElementById("signature_file"));

    const dataURL = sigCanvas.current.getTrimmedCanvas().toDataURL("image/png");
    const blob = await dataURLtoBlob(dataURL);

    const file = new File([blob], "signature.png", { type: "image/png" });

    function dataURLtoBlob(dataURL) {
      const parts = dataURL.split(";base64,");
      const contentType = parts[0].split(":")[1];
      const byteCharacters = atob(parts[1]);
      const byteNumbers = new Array(byteCharacters.length);

      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      return new Blob([byteArray], { type: contentType });
    }

    try {
      if (sigCanvas.current.getTrimmedCanvas().toDataURL("image/png")) {
        const formData = new FormData();
        formData.append("vaibhav_file_path", file);
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

  const clear = () => {
    onChange("");
    sigCanvas.current.clear();
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

  return (
    <>
      <Box>
        <Box border={"1px solid #000"}>
          <SignaturePad
            ref={sigCanvas}
            canvasProps={{
              className: "signatureCanvas",
            }}
          />
        </Box>
        <Flex gap="10px">
          <Button
            onClick={() => {
              SaveCanvas();
            }}
          >
            Save{" "}
          </Button>
          <Button
            onClick={() => {
              clear();
            }}
          >
            Clear
          </Button>
        </Flex>
      </Box>
    </>
  );
}

export default CustomSign;

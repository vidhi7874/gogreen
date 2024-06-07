import { AddIcon, MinusIcon } from '@chakra-ui/icons'
import { Accordion, AccordionButton, AccordionItem, AccordionPanel, Box, Button, Flex } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import RevenueSharing from './RevenueSharing'
import LeasedUtilation from './LeasedUtilation'
import Email from './Email'
import { useGetPbpmConfigurationMutation, useUpdatePbpmConfigurationMutation } from '../../features/setting.slice';
import { showToastByStatusCode } from '../../services/showToastByStatusCode';

const Setting = () => {

  const schema_obj = {
    // These is for revenuse sharing
    first_accordion: {
      revenue_allaway_space: "revenue_allaway_space",
      revenue_no_of_bags_utilization: "revenue_no_of_bags_utilization",
      revenue_insurance_p_a: "revenue_insurance_p_a",
      revenue_fumigation_Rs_PMT: "revenue_fumigation_Rs_PMT",
      revenue_profit_in_MT: "revenue_profit_in_MT",
      revenue_supervisor_salary: "revenue_supervisor_salary",
      revenue_security_guard_salary: "revenue_security_guard_salary",
    },

    // These is for the Lease Utilization 
    second_accordion: {
      lease_allaway_space: "lease_allaway_space",
      lease_no_of_bags_utilization: "lease_no_of_bags_utilization",
      lease_insurance_p_a: "lease_insurance_p_a",
      lease_fumigation_Rs_PMT: "lease_fumigation_Rs_PMT",
      lease_profit_in_MT: "lease_profit_in_MT",
      lease_supervisor_salary: "lease_supervisor_salary",
      lease_security_guard_salary: "lease_security_guard_salary",

    },
// These is for the Email
third_accordion:{
  hr_mail:"hr_mail",
},

  }


  // These is for schema set
  const form_schema = Yup.object().shape({

    // These is for revenue sharing schema

    [schema_obj.first_accordion.revenue_allaway_space]: Yup.number()
      .required("Allaway Space is required")
      .typeError(""),
    [schema_obj.first_accordion.revenue_fumigation_Rs_PMT]: Yup.number()
      .required("Fumigation is required")
      .typeError(""),
    [schema_obj.first_accordion.revenue_insurance_p_a]: Yup.number().required("Insurance is required").typeError(""),
    [schema_obj.first_accordion.revenue_no_of_bags_utilization]: Yup.number()
      .required("Revenue Sharing Utilization is required")
      .typeError(""),
    [schema_obj.first_accordion.revenue_profit_in_MT]: Yup.number().required("Profit is required").typeError(""),
    [schema_obj.first_accordion.revenue_security_guard_salary]: Yup.number()
      .required("New Security Guard Salary is required")
      .typeError(""),
    [schema_obj.first_accordion.revenue_supervisor_salary]: Yup.number()
      .required("Supervisor Salary is required")
      .typeError(""),


    // These is for the leaseUtilization schema
    [schema_obj.second_accordion.lease_allaway_space]: Yup.number()
      .required("Allaway Space is required")
      .typeError(""),
    [schema_obj.second_accordion.lease_fumigation_Rs_PMT]: Yup.number()
      .required("Fumigation is required")
      .typeError(""),
    [schema_obj.second_accordion.lease_insurance_p_a]: Yup.number().required("Insurance is required").typeError(""),
    [schema_obj.second_accordion.lease_no_of_bags_utilization]: Yup.number()
      .required("Leased Utilization is required")
      .typeError(""),
    [schema_obj.second_accordion.lease_profit_in_MT]: Yup.number().required("Profit is required").typeError(""),
    [schema_obj.second_accordion.lease_security_guard_salary]: Yup.number()
      .required("New Security Guard Salary is required")
      .typeError(""),
    [schema_obj.second_accordion.lease_supervisor_salary]: Yup.number()
      .required("Supervisor Salary is required")
      .typeError(""),



      // These is for the email schema
      [schema_obj.third_accordion.hr_mail]:Yup.string().required("Hr Email is required").typeError(""),
  })

  const {
    register, setValue, getValues, watch, handleSubmit, setError, formState: { errors }, } = useForm({ resolver: yupResolver(form_schema),mode: 'onChange' });

  // On submit start
  const onSubmit = (data) => {
    updateData(data);
    console.log("data", data);

    // Add your logic to handle the form submission here
  };
  // On submit End


  const clearForm = () => {
    const defaultValues = getValues();
    Object.keys(defaultValues).forEach((key) => {
      if (key !== "is_active") {
        setValue(key, "", {
          shouldValidate: true,
        });
      }
    });
  };
  // Form Clear Function End




  // calling Get api start
  const [getPbpmConfiguration] = useGetPbpmConfigurationMutation();

  const getPbpmConfigurationData = async () => {
    try {
      const response = await getPbpmConfiguration().unwrap();
      console.log("responsePBPM", response);

      // Update the form data state with the API response

      let obj = {
        // These is for the revenue object called start 


        revenue_insurance_p_a: response?.data?.revenue_insurance_p_a || 0,
        revenue_no_of_bags_utilization: response?.data?.revenue_no_of_bags_utilization || 0,

        revenue_allaway_space: response?.data?.revenue_allaway_space || 0,
        revenue_fumigation_Rs_PMT: response?.data?.revenue_fumigation_Rs_PMT || 0,
        revenue_profit_in_MT: response?.data?.revenue_profit_in_MT || 0,
        revenue_supervisor_salary: response?.data?.revenue_supervisor_salary || 0,
        revenue_security_guard_salary: response?.data?.revenue_security_guard_salary || 0,
        // Revenue Object End

        // These is For Utilization Object Start
        lease_insurance_p_a: response?.data?.lease_insurance_p_a || 0,
        lease_no_of_bags_utilization:
          response?.data?.lease_no_of_bags_utilization || 0,
        lease_allaway_space: response?.data?.lease_allaway_space || 0,
        lease_fumigation_Rs_PMT: response?.data?.lease_fumigation_Rs_PMT || 0,
        lease_profit_in_MT: response?.data?.lease_profit_in_MT || 0,
        lease_supervisor_salary: response?.data?.lease_supervisor_salary || 0,
        lease_security_guard_salary: response?.data?.lease_security_guard_salary || 0,
        // Utilization Object End


        // These is for Email Object Start 
        hr_mail:response?.data?.hr_mail,
      };

      Object.keys(obj).forEach(function (key) {
        console.log("key value test : " + key + " : " + obj[key]);
        setValue(key, obj[key], { shouldValidate: true });
      });
    } catch (error) {
      console.log("error: " + error);
    }
  };

  // calling Get api End


  //on submit calling patch api start

  const [updatePbpmConfiguration] = useUpdatePbpmConfigurationMutation();

  const updateData = async (data) => {
    try {
      const response = await updatePbpmConfiguration({
        ...data,
        id: 1,
      }).unwrap();

      if (response.status === 200) {
        toasterAlert(response);
      }
      console.log("update pbpm res", response);
    } catch (error) {
      console.log("error: " + error);
      toasterAlert(error);
    }
  };
  //on submit calling patch api End



  useEffect(() => {
    getPbpmConfigurationData();
  }, []);

  return (
    <>
      <Box borderRadius={"10"} my={4}>
        <Accordion allowMultiple>
          <form onSubmit={handleSubmit(onSubmit)}>

            {/* Revenue Sharing Accordian Start */}
            <AccordionItem p={2} bg="white">
              {({ isExpanded }) => (
                <>
                  <AccordionButton>
                    <Box as="span" flex="1" textAlign="left">
                      Revenue Sharing
                    </Box>
                    {isExpanded ? (
                      <MinusIcon fontSize="12px" />
                    ) : (
                      <AddIcon fontSize="12px" />
                    )}
                  </AccordionButton>

                  <AccordionPanel pb={4}>
                    <RevenueSharing
                      mainFormsMethod={{
                        handleSubmit,
                        register,
                        setValue,
                        errors,
                      }}
                      revenue_sharing_form_schema={
                        schema_obj.first_accordion
                      }

                    />

                  </AccordionPanel>
                </>

              )}
            </AccordionItem>


            {/* Leased Utilization Accordian Start */}
            <AccordionItem p={2} bg="white" my={2}>
              {({ isExpanded }) => (
                <>
                  <AccordionButton>
                    <Box as="span" flex="1" textAlign="left">
                      Lease Utilization
                    </Box>
                    {isExpanded ? (
                      <MinusIcon fontSize="12px" />
                    ) : (
                      <AddIcon fontSize="12px" />
                    )}
                  </AccordionButton>

                  <AccordionPanel pb={4}>
                    <LeasedUtilation
                      mainFormsMethod={{
                        handleSubmit,
                        register,
                        setValue,
                        errors,
                      }}
                      leased_utilization_form_schema={
                      schema_obj.second_accordion
                      }
                    />

                  </AccordionPanel>
                </>

              )}
            </AccordionItem>



            {/* Email Accordian Start */}
            <AccordionItem p={2} bg="white" my={2}>
              {({ isExpanded }) => (
                <>
                  <AccordionButton>
                    <Box as="span" flex="1" textAlign="left">
                      Email
                    </Box>
                    {isExpanded ? (
                      <MinusIcon fontSize="12px" />
                    ) : (
                      <AddIcon fontSize="12px" />
                    )}
                  </AccordionButton>

                  <AccordionPanel pb={4}>
                    <Email
                    mainFormsMethod={{
                      handleSubmit,
                      register,
                      setValue,
                      errors,
                    }}
                    email_form_schema={schema_obj.third_accordion}
                    />

                  </AccordionPanel>
                </>

              )}
            </AccordionItem>
            <Flex gap="10px"  marginTop={"30px"} justifyContent="end" alignItems="center">
              <Button
                type="button"
                backgroundColor={"white"}
                borderWidth={"1px"}
                borderColor={"#F82F2F"}
                _hover={{ backgroundColor: "" }}
                color={"#F82F2F"}
                borderRadius={"full"}
                my={"4"}
                px={"10"}
                onClick={clearForm}
              >
                Clear
              </Button>
              <Button
                bg="#A6CE39"
                _hover={{}}
                color="white"
               
                padding="0px 30px"
                borderRadius={"50px"}
                type="submit"
              //   onClick={() => {
              //     saveAsDraftFunction();
              //   }}
              >
                Submit
              </Button>
            </Flex>
          </form>
        </Accordion>



      </Box>
    </>
  )
}

export default Setting;
const toasterAlert = (obj) => {
  let msg = obj?.message;
  let status = obj?.status;
  if (status === 400) {
    const errorData = obj.data;
    let errorMessage = "";

    Object.keys(errorData).forEach((key) => {
      const messages = errorData[key];
      messages.forEach((message) => {
        errorMessage += `${key} : ${message} \n`;
      });
    });
    showToastByStatusCode(status, errorMessage);
    return false;
  }
  showToastByStatusCode(status, msg);
};
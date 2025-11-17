"use client";

import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { VscCheck } from "react-icons/vsc";
import { toast } from "react-toastify";
import { ApiResponse, FormData } from "@/types/types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const StepForm = () => {
  const [step, setStep] = useState(1);
  const [viewComponent, setViewComponent] = useState<string>("form");
  const [apiResponse, setApiResponse] = useState<ApiResponse | undefined>();
  const {
    register,
    handleSubmit,
    reset,
    trigger,
    formState: { errors },
  } = useForm<FormData>({
    mode: "onBlur",
  });

  const today = new Date().toISOString().split("T")[0];

  const steps = [
    {
      id: 1,
      title: "Company Details",
      fields: [
        {
          label: "Company Name",
          name: "company" as const,
          rules: { required: "Company name is required" },
          type: "text",
        },
        {
          label: "Industry",
          name: "industry" as const,
          rules: { required: "Industry is required" },
          type: "select",
          options: [
            "Construction",
            "Manufacturing",
            "Healthcare",
            "IT Services",
          ],
        },
        {
          label: "Contact Person",
          name: "contact" as const,
          rules: { required: "Contact person is required" },
          type: "text",
        },
        {
          label: "Email",
          name: "email" as const,
          rules: {
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Enter a valid email address",
            },
          },
          type: "email",
        },
      ],
    },
    {
      id: 2,
      title: "Work Details",
      fields: [
        {
          label: "Job Site Location",
          name: "location" as const,
          rules: { required: "Job site location is required" },
          type: "text",
        },
        {
          label: "Type of Activity",
          name: "activity" as const,
          rules: { required: "Type of activity is required" },
          type: "text",
        },
      ],
    },
    {
      id: 3,
      title: "Risk and Scheduling",
      fields: [
        {
          label: "Specific Hazards",
          name: "hazards" as const,
          rules: { required: "Specific hazards are required" },
          type: "textarea",
        },
        {
          label: "Preferred Timeframe",
          name: "timeframe" as const,
          rules: {
            required: "Preferred timeframe is required",
            validate: (value: string) =>
              new Date(value) > new Date()
                ? true
                : "Preferred date must be after today",
          },
          type: "date",
        },
      ],
    },
    {
      id: 4,
      title: "Submit Request Form",
      fields: [] as const,
    },
  ];

  const currentStep = steps.find((s) => s.id === step)!;

  const nextStep = async () => {
    const currentFields = currentStep.fields.map((f) => f.name);
    const isValid = await trigger(currentFields);

    if (isValid) setStep((prev) => Math.min(prev + 1, steps.length));
  };

  const resetForm = () => {
    reset();
    setStep(1);
  };

  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const downloadBase64PDF = (base64: string, filename: string) => {
    const linkSource = `data:application/pdf;base64,${base64}`;
    const downloadLink = document.createElement("a");

    downloadLink.href = linkSource;
    downloadLink.download = filename;
    downloadLink.click();
  };

  const onSubmit = async (data: FormData) => {
    console.log("Form Submitted:", data);
    try {
      const res = await axios.post<ApiResponse>(
        "http://localhost:8085/apis/add",
        data
      );

      setApiResponse(res.data);
      setViewComponent("response");
      toast.success("Response sent successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      resetForm();
    } catch (err) {
      console.log(err);
      setViewComponent("error");
      toast.error("Failed to post data", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      resetForm();
    }
  };

  const renderField = (field: any) => {
    switch (field.type) {
      case "select":
        return (
          <select {...register(field.name, field.rules)}>
            <option value="">Select {field.label}</option>
            {field.options.map((opt: string) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        );

      case "textarea":
        return (
          <textarea
            {...register(field.name, field.rules)}
            placeholder={field.label}
            rows={3}
          />
        );

      case "date":
        return (
          <input
            type="date"
            {...register(field.name, field.rules)}
            min={today}
          />
        );

      default:
        return (
          <input
            type={field.type || "text"}
            {...register(field.name, field.rules)}
            placeholder={field.label}
          />
        );
    }
  };

  return (
    <div className="stepform-container">
      {viewComponent === "form" && (
        <Card className="rounded-md border overflow-hidden rounded-lg">
          <CardHeader>
            <CardTitle>Create new risk assesment request</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="stepform" onSubmit={handleSubmit(onSubmit)}>
              {steps.map((s, index) => (
                <div className="step" key={s.id}>
                  <div className="timeline">
                    <div
                      className={`step-count ${step > s.id ? "success" : ""}`}
                    >
                      {step > s.id ? <VscCheck size={16} /> : s.id}
                    </div>
                    {index < steps.length - 1 && (
                      <div
                        className={`step-line ${
                          step === s.id ? "display" : ""
                        }`}
                      />
                    )}
                  </div>

                  <div className="step-field">
                    <div className="field-cateogry">{s.title}</div>
                    <div className={`fields ${step === s.id ? "display" : ""}`}>
                      {s.fields.map((field) => (
                        <div key={field.name}>
                          <div className="label">{field.label}</div>
                          {renderField(field)}
                          <div className="error-field">
                            {errors[field.name] && (
                              <p className="error">
                                {errors[field.name]?.message}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}

                      <div className="nav-btn-container">
                        {s.id > 1 && (
                          <button
                            className="button-primary"
                            type="button"
                            onClick={prevStep}
                          >
                            Back
                          </button>
                        )}
                        {s.id < steps.length ? (
                          <button
                            className="button-primary"
                            type="button"
                            onClick={nextStep}
                          >
                            Next
                          </button>
                        ) : (
                          <button className="button-primary" type="submit">
                            Submit
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </form>
          </CardContent>
        </Card>
      )}
      {viewComponent === "response" && (
        <div className="response-container">
          <Card className="rounded-md border overflow-hidden rounded-lg">
            <CardHeader>
              <CardTitle>Your Submitted Data</CardTitle>
            </CardHeader>
            <CardContent>
              {steps?.map((item, i) => (
                <div key={i} className="dispaly-fields">
                  {item?.fields?.map((fields, index) => (
                    <div key={index} className="dispaly-fields">
                      <span className="field-key">{fields?.name}</span> :{" "}
                      <span className="field-value">
                        {apiResponse?.formData?.hasOwnProperty(fields?.name)
                          ? apiResponse?.formData[fields?.name]
                          : null}
                      </span>
                    </div>
                  ))}
                </div>
              ))}
              <div className="response-btn-container">
                <button
                  className="button-primary"
                  onClick={() => {
                    if (apiResponse?.pdf) {
                      downloadBase64PDF(
                        apiResponse.pdf.base64,
                        apiResponse.pdf.filename
                      );
                    }
                  }}
                >
                  Download PDF
                </button>
                <button
                  className="button-primary"
                  onClick={() => {
                    setViewComponent("form");
                  }}
                >
                  Add New Request
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {viewComponent === "error" && (
        <div className="error-container">
          <Card className="rounded-md border overflow-hidden rounded-lg">
            <CardHeader>
              <CardTitle>Error saving data data</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="error-message"></div>
              <button
                className="button-primary"
                onClick={() => {
                  setViewComponent("form");
                }}
              >
                Try Again{" "}
              </button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default StepForm;

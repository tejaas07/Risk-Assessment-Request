export interface FormData {
  company: string;
  industry: string;
  contact: string;
  email: string;
  location: string;
  activity: string;
  hazards: string;
  timeframe: string;
}

export interface ApiResponse {
  formData: FormData;
  pdf: {
    base64: string;
    filename: string;
  };
}

import axios from "axios"

export interface SalaryClassifierInput {
  age: string,
  education_num: string,
  capital_gain: string,
  capital_loss: string,
  hours_per_week: string,
  country: string,
  gender: string,
  workclass: string,
  occupation: string,
  marital_status: string,
  relationship: string,
  race: string
}

export async function salaryClassifierRequest(body: SalaryClassifierInput) {
  return axios.post("https://docker-flask-ml-model.onrender.com/api/predict", body);
}
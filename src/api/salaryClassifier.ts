import axios from "axios"

export interface SalaryClassifierInput {
  age: number,
  education_num: number,
  capital_gain: number,
  capital_loss: number,
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
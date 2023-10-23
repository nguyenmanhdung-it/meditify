
import { Request, Response } from "express";
import { Configuration, OpenAIApi } from "openai";
import axios from "axios";
require("dotenv").config();


const router = require("express").Router();

const config = new Configuration({
  apiKey: process.env.OPEN_AI_KEY,
});

const openai = new OpenAIApi(config);

router.post("/", async (req: Request, res: Response) => {
  console.log(req.body);
  try {
    const { prompt } = req.body;
    console.log(prompt);
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `${prompt}`,
      max_tokens: 256,
      temperature: 0,
    });
    
    console.log(response.data);
    return res.status(200).json({
      success: true,
      data: response.data.choices[0].text,
      data_raw: response.data,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: "There was an issue on the server",
    });
  }
});
router.post("/fake", async (req: Request, res: Response) => {
  console.log(req.body);
  try {
    const { prompt } = req.body;
    console.log(prompt);
    return res.status(200).json({
      success: true,
      data: "Bản chất của toán học là sử dụng các phương pháp logic để giải quyết các vấn đề và tìm ra các quy luật của các con số, hình học và phép tính.",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: "There was an issue on the server",
    });
  }
});

router.post("/summary", async (req: Request, res: Response) => {
  console.log(req.body);
  try {
    const { prompt } = req.body;
    console.log(prompt);
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Summary this prompt without personal bias:\n ${prompt}\n\nTl;dr`,
      // max_tokens: 256,
      temperature: 0,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: "There was an issue on the server",
    });
  }
});

router.post("/fine-tune", async (req: Request, res: Response) => {
  console.log(req.body);
  try {
    const { prompt } = req.body;
    const response = await axios.get("http://localhost:5000/fine-tune");

    if (response.data.length === 100) {
      const fineTuneResponse = await openai.createFineTune({
        model: "text-davinci-003",
        training_file: response.data,
    });

      console.log(fineTuneResponse.data);
      return res.status(200).json({
        success: true,
        data: fineTuneResponse.data,
      });
    }
    return res.status(200).json({
      success: true,
      data: "Not enough data",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: "There was an issue on the server",
    });
  }
});



module.exports = router;

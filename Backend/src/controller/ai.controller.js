import aiService from "../services/ai.service.js";

const getResponse = async (req, res) => {
    console.log(req);
  const code = req.body.code;
  if (!code) {
    return res.status(400).json({ error: "code is required" });
  }
  const response = await aiService(code);
  res.send(response);
};

export default getResponse;


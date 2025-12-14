const aiService = require("../services/ai.service");

module.exports.getReview = async (req, res) => {
  const code = req.body.code;

  if (!code) {
    return res.status(400).send("Prompt is required");
  }

  try {
    const response = await aiService(code);
    res.send(response);
  } catch (error) {
    console.error("Error in AI service:", error.message);

    // Handle quota exceeded error
    if (error.status === 429) {
      return res.status(429).json({
        error: "API Quota Exceeded",
        message:
          "The Gemini API quota has been exceeded. Please try again later or check your API billing details.",
        details: error.message,
      });
    }

    // Handle other API errors
    if (error.status) {
      return res.status(error.status).json({
        error: "API Error",
        message: error.message,
      });
    }

    // Handle generic errors
    return res.status(500).json({
      error: "Internal Server Error",
      message:
        "An error occurred while processing your request. Please try again later.",
    });
  }
};

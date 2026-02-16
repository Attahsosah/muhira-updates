import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    try {
      await axios.post(
        "https://api.brevo.com/v3/contacts",
        {
          email,
          listIds: [parseInt(process.env.BREVO_LIST_ID as string, 10)],
          updateEnabled: true,
        },
        {
          headers: {
            "api-key": process.env.BREVO_API_KEY as string,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      res.status(200).json({ message: "Success" });
    } catch (error: any) {
      console.error("Brevo API error:", error?.response?.data || error.message);
      res.status(500).json({ error: "Error adding contact" });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
};

export default handler;

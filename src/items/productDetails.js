import axios from "axios";

export const getProductDetails = async (id) => {
  const response = await axios.get(
    `https://knowledgeshop.runasp.net/api/Products/${id}`,
    {
      headers: {
        "Accept-Language": "en",
      },
    }
  );

  return response.data;
};
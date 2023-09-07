import axios from "axios";
import { BASE_URL } from "@/static/const";
import { OrderInterface } from "@/types/api/order";

/**
 * Retrieves a transaction order using a secret code.
 *
 * @param {Object} data - An object containing the code and secret.
 * @param {string} data.code - The code of the transaction order.
 * @param {string} data.secret - The secret key for authentication.
 * @return {Promise<OrderInterface>} The transaction order data.
 */
export const getTransactionWithSecret = async (data: {
  code: string;
  secret: string;
}) => {
  const req = await axios.get(
    `${BASE_URL}orders/transaction/${data.code}?secret=${data.secret}`
  );
  return req.data as OrderInterface;
};

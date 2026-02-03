import transacRepository from "../../repositories/TransacSumHistoryRepository.js";
import billValidations from "../../validations/bill/index.js";

const update = async (req, res) => {
  try {
    const { body } = req;

    // check user input validation
    const validated = billValidations.update(body);
    if (typeof validated === "object")
      return res.status(500).json({ message: validated });

    // Update bill using repository with parameterized query
    await transacRepository.updateBill(body.transacSumId, {
      transferSum: body.transferSum,
      cashSum: body.cashSum,
      posSum: body.posSum,
    });

    res.status(200).json({ message: "Bill is updated" });
  } catch (error) {
    console.log("Error", error);
    return res.status(500).json({ message: "Oops! Something went wrong!" });
  }
};

export default update;

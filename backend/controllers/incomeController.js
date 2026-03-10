const User = require("../models/User");
const Income = require("../models/Income");
const xlsx = require("xlsx");

exports.addIncome = async (req, res,) => {
    const userId = req.user.id;
    try {
        const { icon, source, amount, date } = req.body;

        if (!source || !amount || !date) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const newIncome = new Income({
            userId,
            icon, source, amount,
            date: new Date(date)
        });
        await newIncome.save();
        res.status(200).json(newIncome);
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
}

exports.getAllIncome = async (req, res,) => {
    const userId=req.user.id;
    try{
        const income=await Income.find({userId}).sort({date:-1});
            res.json(income);

    }catch(err){
         res.status(500).json({message:"Server Error"});
    }
    
}

exports.deleteIncome = async (req, res,) => {
    try{
        await Income.findByIdAndDelete(req.params.id);
        res.json({message:"Income deted successfully"});
    }catch(err){
        res.status(500).json({message:"server Error"});
    }    
}

exports.downloadIncomeExcel = async (req, res) => {
  try {
    const userId = req.user.id;
    const income = await Income.find({ userId }).sort({ date: -1 });

    const data = income.map(item => ({
      Source: item.source,
      Amount: item.amount,
      Date: new Date(item.date).toLocaleDateString()
    }));

    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(wb, ws, "Income");

    const buffer = xlsx.write(wb, { bookType: "xlsx", type: "buffer" });

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=expense_details.xlsx"
    );

    res.send(buffer);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
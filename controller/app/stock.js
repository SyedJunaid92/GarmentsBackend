
import Stock from "../../models/stock.js";
import Sale from '../../models/sale.js'


export const GetStock = async (req, res) => {
  
  try {
    const AllItems = await Stock.find({});
    if (!AllItems) {
      return res.json({ success: false, message: "Something Went Wrong" });
    }
    
    res.status(200).json({ success: true, result: AllItems });
  } catch (error) {
    return res.status(500).json({ success: false, message: error });
  }
};
export const AddStock = async (req, res) => {
  const { AllItem } = req.body;
  try {

  // AllItem=JSON.parse(AllItem)
   for(let i=0;i<AllItem.length;i++)
   {
    const existingItem = await Stock.findOne({item_code:AllItem[i].ItemCode });
    if (existingItem)
      continue
    const result = await Stock.create({
      item_code:AllItem[i].ItemCode,
      quantity:AllItem[i].Quantity,
      price:AllItem[i].Price,
      size:AllItem[i].Size
    });
    
   }
   return res.status(200).json({ success: true, result: "Uploaded" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error });
  }
};
export const UpdateStock = async (req, res) => {
  const { AllItem } = req.body;
  try {

  // AllItem=JSON.parse(AllItem)
  
   for(let i=0;i<AllItem.length;i++)
   {
    const existingItem = await Stock.findOne({item_code:AllItem[i].ItemCode });
    if (!existingItem)
      continue
    let sum=Number(existingItem.quantity)+Number(AllItem[i].Quantity)
    await Stock.findOneAndUpdate(
      { item_code:AllItem[i].ItemCode },
      {
        $set: {
          item_code:AllItem[i].ItemCode,
          price:AllItem[i].Price,
          quantity:sum.toString(),
          size:AllItem[i].Size
          
        },
      }
    );
    
   }
   return res.status(200).json({ success: true, result: "Uploaded" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error });
  }
};
export const SaleStock=async(req,res)=>{
  const { AllItem,date,Total } = req.body;
  try{
    let d=date.slice(3,5)+"/"+date.slice(0,2)+"/"+date.slice(6,10)
    console.log(date, "Date--",Date.parse(d), d)
    for(let i=0;i<AllItem.length;i++)
    {
      const existingItem = await Stock.findOne({item_code:AllItem[i].ItemCode });
      if(Number(existingItem.quantity)<Number(AllItem[i].Quantity))
      {
        continue
      }
       
        let RemainingStock=Number(existingItem.quantity)-Number(AllItem[i].Quantity)
        await Stock.findOneAndUpdate(
          { item_code:AllItem[i].ItemCode },
          {
            $set: {
              quantity:RemainingStock.toString()
              
            },
          })

    }
    let SaleObj=new Sale()
    SaleObj.total=Total
    SaleObj.date=date
    SaleObj.items=JSON.stringify(AllItem)
    SaleObj.creation_time=Date.parse(d)?Date.parse(d):0

    SaleObj.save()
    return res.status(200).json({ success: true, result: "Uploaded" });

  } catch (error) {
    return res.status(500).json({ success: false, message: error });
  }

}




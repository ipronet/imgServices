const asynHandler = require("../middleware/async");
const { ProcessImg2 } = require("../helper/process");
exports.Convert = asynHandler(async (req, res, next) => {
  const {swift,format,pdf_dir,img_dir,src_dir} = req.body
  
  let file = await ProcessImg2(swift,format,pdf_dir,img_dir,src_dir);
  if (!file) {
   return res.send( {
      Status: 0,
      Message: `File not converted`,
      Data:{}
    });
  }
  res.send( {
    Status: 1,
    Message: `File  converted`,
    Data:file
  })
});
exports.Health = asynHandler(async (req, res, next) => {

  res.send( {
    Status: 1,
    Message: `im ok`,
  })
});
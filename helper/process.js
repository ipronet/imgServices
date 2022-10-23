const { resolve } = require("path");
const {fromPath} = require("pdf2pic");
const fs = require("fs");
const {ProcessPdf} =  require("../../pdfServices/helper/process")
// const pdf_dir = "/home/BackEnd/swiftalerts/pdf/";
// const img_dir = "/home/BackEnd/swiftalerts/img/";
// const src_dir = "/home/BackEnd/swiftalerts/src_dir/";
// const pdf = require('pdf-poppler');
module.exports = {
 
  ProcessImg2: async (pdffile,imgformat='png',pdf_dir,img_dir,src_dir) => {
    let file = pdf_dir+pdffile+'.pdf'
    if (fs.existsSync(file)) {
      console.log('Found file');
      return  await genImg(file,img_dir,imgformat,pdffile)
  }
  let processPdf = await ProcessPdf(pdffile,pdf_dir,img_dir,src_dir);
  console.log("**processPdf**");
  if (processPdf.Status === 1) {
    console.log('Process Pdf Done, converting to image');
    return  await genImg(file,img_dir,imgformat,pdffile)
}
  }
};



async function genImg(file,src_dir,imgformat,pdffile){
  const options = {
    density: 100,
    saveFilename: pdffile,
    savePath: src_dir,
    imgformat,
    width: 600,
    height: 600
  };
  const storeAsImage = fromPath(file, options);
  const pageToConvertAsImage = 1;
  
 let resultImage = await storeAsImage(pageToConvertAsImage)
 return resultImage
}
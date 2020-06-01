/*
 Get Image Crop base on array
 
 @params img {Object} image crop object
 @params crops {Array} crops name order by the first name exist on image crop
@returns {String} the image url that match with the first crop name found in the image object
*/
const cropsName = [
  '120x67',
  '120x80',
  '120x86',
  '250x141',
  '250x167',
  '250x179',
];
const getImageCrop = (img, crops) => {
  const firstCropFound = crops.find(cropName => img[cropName]);
  return firstCropFound ? img[firstCropFound] : img.master;
};

export default function(dataList) {
  const data = dataList.news.map(item => ({
    ...item,
    img: {
      source: {
        uri: getImageCrop(item.img, cropsName),
      },
    },
  }));

  return data;
}

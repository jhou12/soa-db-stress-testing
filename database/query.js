const mongoose = require('mongoose');
const db = require('./index.js');

const getProductPrimaryPhoto = async (id) => {
  let productInfo = await db.Photo.findOne({id: id}).select('primaryUrl');

  let productPrimaryPhotoUrl = productInfo.primaryUrl;

  return productPrimaryPhotoUrl;
};

const getAllProductPhotos = async (id) => {
  let productPhotos = await db.Photo.findOne({id: id}).select('primaryUrl productUrls');

  return productPhotos;
}

const getMultipleProductsPrimaryPhotos = async(ids) => {
  let primaryPhotosQuery = await db.Photo.find({id: {$in: ids}}).select('id primaryUrl');

  let primaryPhotos = {};

  primaryPhotosQuery.forEach(photoInfo => {
    primaryPhotos[photoInfo.id] = photoInfo.primaryUrl
  });

  return primaryPhotos;
}

module.exports = {
  getProductPrimaryPhoto: getProductPrimaryPhoto,
  getAllProductPhotos: getAllProductPhotos,
  getMultipleProductsPrimaryPhotos: getMultipleProductsPrimaryPhotos
};
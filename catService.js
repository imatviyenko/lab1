const { promises: fsPromises } = require('fs');
const axios = require('axios');
const { joinImages } = require('join-images');
const logger = require('./logger');


const getCatImage = async (message, width, height, color, size) => {
    const catassBaseUrl = 'https://cataas.com/cat/says';

    const opt = {
        responseType: 'arraybuffer'
    };

    try {
        const url = `${catassBaseUrl}/${message}?width=${width}&height=${height}&color=${color}&s=${size}`;
        return await axios.get(url, opt);
    } catch(e) {
        logger.error(e);
    }
}

const joinCatImages = async (images, width, height) => {
    if (!Array.isArray(images) || images.length === 0 || !Number.isInteger(width) || !Number.isInteger(height))  {
        logger.error('Invalid arguments passed to joinCatImages');
        return null;
    }

    const opt = {direction: 'horizontal'};
    return await joinImages(images, opt).then( sharpImg => {
        return sharpImg.jpeg({ mozjpeg: true }).toBuffer();
    });
}

const saveImageToFile = async (fileName, data) => {

    try {
        return await fsPromises.writeFile(fileName, data, 'binary');
    } catch (e) {
        logger.error(e);
    }
}

module.exports = {
    getCatImage,
    joinCatImages,
    saveImageToFile
};
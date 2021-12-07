const { promises: fsPromises } = require('fs');
const axios = require('axios');
const { joinImages } = require('join-images');
const logger = require('./logger');


const getCatImage = (message, width, height, color, size) => {
    const catassBaseUrl = 'https://cataas.com/cat/says';

    const opt = {
        responseType: 'arraybuffer'
    };

    try {
        const url = `${catassBaseUrl}/${message}?width=${width}&height=${height}&color=${color}&s=${size}`;
        return axios.get(url, opt);
    } catch(e) {
        logger.error(e);
    }
}

const joinCatImages = (images) => {
    if (!Array.isArray(images) || images.length === 0)  {
        logger.error('Invalid arguments passed to joinCatImages');
        return null;
    }

    const opt = {direction: 'horizontal'};
    return joinImages(images, opt).then( sharpImg => {
        return sharpImg.jpeg({ mozjpeg: true }).toBuffer();
    });
}

const saveImageToFile = (fileName, data) => {
    try {
        return fsPromises.writeFile(fileName, data, 'binary');
    } catch (e) {
        logger.error(e);
    }
}

module.exports = {
    getCatImage,
    joinCatImages,
    saveImageToFile
};
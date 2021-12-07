const { join } = require('path'); 
const argv = require('minimist')(process.argv.slice(2)); 
const logger = require('./logger');
const catService = require('./catService');

const { 
    greeting = 'Hello', 
    who = 'You', 
    width = 400, 
    height = 500, 
    color = 'Pink', 
    size = 100, 
} = argv; 

async function main() {
    logger.info('Program started');

    try {
        const messages = [greeting, who];
        const promises = messages.map( m => catService.getCatImage(m, width, height, color, size).then( r => r.data));
        const images = await Promise.all(promises);
        logger.info(`image1 data length: ${images[0].length}`);
        logger.info(`image2 data length: ${images[1].length}`);

        const mergedImageData = await catService.joinCatImages(images);
        logger.info('Images merged');
        
        const fileOut = join(process.cwd(), `/cat-card.jpg`);
        await catService.saveImageToFile(fileOut, mergedImageData);
        logger.info('The file was saved!');
    } catch (e) {
        logger.error(e);
    }
   
    logger.info('Program completed');
}

// Program entry point
main();






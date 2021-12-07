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
    let image1Response, image2Response;

    try {
        const image1Promise = catService.getCatImage(greeting, width, height, color, size).then(response => {
            image1Response = response;
        });

        const image2Promise = catService.getCatImage(who, width, height, color, size).then(response => {
            image2Response = response;
        });

        await Promise.all([image1Promise, image2Promise]);
        logger.info(`image1Response data length: ${image1Response.data.length}`);
        logger.info(`image2Response data length: ${image2Response.data.length}`);

        const mergedImageData = await catService.joinCatImages([image1Response.data, image2Response.data], width, height);
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






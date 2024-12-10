const pathModule = require('path');
const fs = require('fs');

const getRoutesWithIndexByFolder = (folderPath, folderName) => {
    let routeWithIndex = [];
    const allFiles = fs.readdirSync(folderPath, { withFileTypes: true });

    const files = allFiles.filter(dirent => dirent.isFile()).map(dirent => dirent.name);
    if (files.includes('index.mdx') && !routeWithIndex.includes(folderName)) {
        routeWithIndex.push(folderName);
    }

    const subFolders = allFiles.filter(dirent => dirent.isDirectory()).map(dirent => dirent.name);
    if (subFolders.length) {
        subFolders.forEach(subFolder => {
            const subRoutes = getRoutesWithIndexByFolder(pathModule.resolve(folderPath, subFolder), folderName + '/' + subFolder);
            if (subRoutes.length) {
                routeWithIndex = routeWithIndex.concat(subRoutes);
            }
        });
    }

    return routeWithIndex;
}

const generateEditOnGithubURLs = () => {
    const pageDir = pathModule.resolve(__dirname, '../src/pages');
    const folders = fs.readdirSync(pageDir, { withFileTypes: true }).filter(dirent => dirent.isDirectory()).map(dirent => dirent.name);

    let routeWithIndex = [];
    folders.forEach(folder => {
        const folderPath = pathModule.resolve(pageDir, folder);
        routeWithIndex = routeWithIndex.concat(getRoutesWithIndexByFolder(folderPath, folder));
    });

    const constantsPath = pathModule.resolve(__dirname, '../src/constants/routes-with-index.js');
    const constantsContent = `export const ROUTES_WITH_INDEX = ${JSON.stringify(routeWithIndex)};`;
    fs.writeFileSync(constantsPath, constantsContent);

};

generateEditOnGithubURLs();
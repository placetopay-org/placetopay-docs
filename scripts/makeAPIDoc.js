const SwaggerParser = require('@apidevtools/swagger-parser');
const pathModule = require('path');
const fs = require('fs');
const { promisify } = require('util');
const routes = require('./routes.json');

const logger = console // {log: () => void 1, warn: () => void 1, error: () => void 1};

const getApiData = async (folderPath, isEnLocale) => {
    const apiData = await SwaggerParser.parse(`src/assets/apis/${folderPath}/${isEnLocale ? 'en' : 'es'}.yaml`);

    if (!apiData || !apiData.paths) {
        throw new Error('API Data or Path Endpoints is missing');
    }

    return apiData;
}

const getStubFiles = async (readFile) => {
    const APIPageHeaderStub = await readFile(pathModule.join(__dirname, 'stubs', 'API_PAGE_HEADER_STUB.stub'), 'utf8');
    const APIEndpointSectionStub = await readFile(pathModule.join(__dirname, 'stubs', 'API_ENDPOINT_SECTION_STUB.stub'), 'utf8');
    const ResponseExampleStub = await readFile(pathModule.join(__dirname, 'stubs', 'API_RESPONSE_EXAMPLE_STUB.stub'), 'utf8');
    const RequestExampleStub = await readFile(pathModule.join(__dirname, 'stubs', 'API_REQUEST_EXAMPLE_STUB.stub'), 'utf8');
    const ResponseExampleSectionStub = await readFile(pathModule.join(__dirname, 'stubs', 'API_RESPONSE_EXAMPLE_SECTION_STUB.stub'), 'utf8');
    const RequestExampleSectionStub = await readFile(pathModule.join(__dirname, 'stubs', 'API_REQUEST_EXAMPLE_SECTION_STUB.stub'), 'utf8');

    if (!APIPageHeaderStub) {
        throw new Error('API Page Stub is missing');
    }

    return [
        APIPageHeaderStub,
        APIEndpointSectionStub,
        ResponseExampleStub,
        RequestExampleStub,
        ResponseExampleSectionStub,
        RequestExampleSectionStub,
    ];
}

const getAndMakeFolder = async (folderPath, exists, mkdir, rmFile, isForce) => {
    const folder = pathModule.join('src', 'pages', isEnLocale ? 'en' : '', folderPath, 'reference');
    const existsFolder = await exists(folder);

    if (!existsFolder) {
        await mkdir(folder, { recursive: true });
    }

    if (existsFolder && isForce) {
        logger.warn('Cleaning folder', folder);
        await rmFile(folder, { recursive: true });
        await mkdir(folder, { recursive: true });
    }

    return folder;
};

const getOrRemovePage = async (folder, page, exists, mkdir, rmFile, isForce) => {
    const newFilePath = pathModule.join(folder, page);
    const existsFile = await exists(newFilePath);

    if (existsFile) {
        if (!isForce) {
            logger.warn('File already exists', newFilePath);
            return false;
        }

        await rmFile(newFilePath);
        logger.warn('File already exists, overwriting', newFilePath);
    } else {
        const newFolderPath = newFilePath.split(pathModule.sep).slice(0, -1).join(pathModule.sep);
        logger.warn('Creating new folder', newFolderPath);
        mkdir(newFolderPath, { recursive: true });
    }

    return newFilePath;
}

const getRequestBodyExamples = (requestBody) => {
    if (!requestBody || !requestBody.content) {
        return '';
    }

    const content = requestBody.content;
    const [contentType] = Object.keys(content);
    const exampleSchema = content[contentType];

    return contentType === 'application/json'
        ? exampleSchema?.examples
        : exampleSchema?.schema?.examples;
}

const generateAPIDoc = async (folderPath, options) => {
    if (!folderPath) {
        throw new Error('Folder path is required');
    }

    logger.log('Generating API Doc for', folderPath);
    const exists = promisify(fs.exists);
    const rmFile = promisify(fs.rm);
    const readFile = promisify(fs.readFile);
    const mkdir = promisify(fs.mkdir);
    const writeFile = promisify(fs.writeFile);

    const apiData = await getApiData(folderPath, isEnLocale);

    const [
        APIPageHeaderStub,
        APIEndpointSectionStub,
        ResponseExampleStub,
        RequestExampleStub,
        ResponseExampleSectionStub,
        RequestExampleSectionStub,
    ] = await getStubFiles(readFile);

    const folder = await getAndMakeFolder(
        folderPath,
        exists,
        mkdir,
        rmFile,
        options.isForce
    );

    const pages = routes[folderPath].pages;

    for (const [page, pageData] of Object.entries(pages)) {
        const pagePath = await getOrRemovePage(folder, `${page}.mdx`, exists, mkdir, rmFile, options.isForce);
        if (!pagePath) {
            continue;
        }

        const pageContents = [];
        const endpointAddeds = [];

        logger.log(`Generating page ${page} in ${pagePath}`);
        for (const endpoint of pageData.endpoints) {
            const pathData = apiData.paths[endpoint];
            if (!pathData) {
                logger.error('Endpoint not found', endpoint);
                continue;
            }

            for (const [method, methodData] of Object.entries(pathData)) {
                if (Array.isArray(methodData) ? !methodData.length : !methodData) {
                    logger.warn(`Method Data is missing for ${method.toUpperCase()} ${endpoint}`);
                    continue;
                }

                let endpointSection = APIEndpointSectionStub
                    .replace(/STUB_ENDPOINT/g, endpoint)
                    .replace(/STUB_TITLE/g, methodData.summary)
                    .replace(/STUB_METHOD_UPPERCASE/g, method.toUpperCase())
                    .replace(/STUB_METHOD_LOWERCASE/g, method.toLowerCase())
                    .replace(/STUB_ID/g, methodData.operationId)
                    .replace(/STUB_DESCRIPTION/g, methodData.description);

                const requestBodyExamples = getRequestBodyExamples(methodData.requestBody);
                if (requestBodyExamples) {
                    const contentRequestExamples = [];
                    for (const [requestTitle, requestExample] of Object.entries(requestBodyExamples)) {
                        contentRequestExamples.push(
                            RequestExampleStub
                                .replace(/STUB_EXAMPLE_TITLE/g, requestTitle)
                                .replace(/STUB_METHOD_UPPERCASE/g, method.toUpperCase())
                                .replace(/STUB_EXAMPLE_URL/g, pathModule.join(apiData.servers[0].url, endpoint))
                                .replace(/STUB_REQUEST_CONTENT_TYPE/g, 'application/json')
                                .replace(/STUB_BODY_REQUEST/g, JSON.stringify(requestExample.value, null, 2))
                        );
                    }

                    endpointSection = endpointSection.replace(
                        /STUB_REQUEST_EXAMPLE_SECTION/g,
                        RequestExampleSectionStub
                            .replace(/STUB_METHOD_UPPERCASE/g, method.toUpperCase())
                            .replace(/STUB_ENDPOINT/g, endpoint)
                            .replace(/STUB_REQUEST_EXAMPLES/g, contentRequestExamples.join('\n'))
                    )
                } else {
                    endpointSection = endpointSection.replace(/STUB_REQUEST_EXAMPLE_SECTION/g, '');
                    logger.warn(`Request Example is missing for ${method.toUpperCase()} ${endpoint}`);
                }

                if (methodData.responses) {
                    let contentResponseExamples = [];
                    for (const [responseCode, responseData] of Object.entries(methodData.responses)) {
                        if (!responseData.content?.['application/json']?.examples) {
                            logger.warn(`Response Example is missing for ${method.toUpperCase()} ${endpoint} ${responseCode}`);
                            continue;
                        }

                        for (const [responseTitle, responseExample] of Object.entries(responseData.content['application/json'].examples)) {
                            contentResponseExamples.push(
                                ResponseExampleStub
                                    .replace(/STUB_EXAMPLE_TITLE/g, `${responseCode}: ${responseTitle}`)
                                    .replace(/STUB_TYPE_CONTENT_TYPE/g, 'json')
                                    .replace(/STUB_BODY_RESPONSE_EXAMPLE/g, JSON.stringify(responseExample.value, null, 2))
                            );
                        }
                    }
                    endpointSection = endpointSection.replace(
                        /STUB_RESPONSE_EXAMPLE_SECTION/g,
                        ResponseExampleSectionStub.replace(/STUB_RESPONSE_EXAMPLES/g, contentResponseExamples.join('\n'))
                    );
                } else {
                    endpointSection = endpointSection.replace(/STUB_RESPONSE_EXAMPLE_SECTION/g, '');
                    logger.warn(`Response Example is missing for ${method.toUpperCase()} ${endpoint}`);
                }

                pageContents.push(endpointSection);
                endpointAddeds.push(endpoint);
                if (pageData.endpoints.length !== endpointAddeds.length) {
                    pageContents.push('---');
                }
            }
        }

        const pageDataTranslated = pageData[options.isEnLocale ? 'en' : 'es'];

        let pageHeader = APIPageHeaderStub
            .replace(/STUB_TITLE/g, pageDataTranslated.title)
            .replace(/STUB_DESCRIPTION/g, pageDataTranslated.description ?? '')
            .replace(/STUB_ENDPOINTS/g, endpointAddeds.map((e) => `'${e}'`).join(', '))
            .replace(/STUB_NO_TRANSLATE_BANNER/g, options.withMissinTranslate && options.isEnLocale ? '<MissingTranslationBanner />' : '');

        pageContents.unshift(pageHeader);

        try {
            logger.log(`Writing page ${page} in ${pagePath}`);
            await writeFile(pagePath, pageContents.join('\n'));
            logger.log(`Page ${page} written in ${pagePath}`);
        } catch (e) {
            logger.error('Error writing file', pagePath, e);
        }
    }

}

const [, , ASSET_API_FOLDER_PATH, ...options] = process.argv;

const useConfig = options.includes('--with-config');
const isForce = options.includes('--force');
const isEnLocale = options.includes('--en');
const withMissinTranslate = options.includes('--missing-translate');

generateAPIDoc(ASSET_API_FOLDER_PATH, {
    useConfig,
    isForce,
    isEnLocale,
    withMissinTranslate,
});
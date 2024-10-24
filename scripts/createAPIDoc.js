const SwaggerParser = require('@apidevtools/swagger-parser');
const pathModule = require('path');
const fs = require('fs');
const { promisify } = require('util');


const [, , ASSET_API_FOLDER_PATH, ...options] = process.argv;


const isForce = options.includes('--force');
const isEnLocale = options.includes('--en');
const withMissinTranslate = options.includes('--missing-translate');

const sanitizePathToFileName = (path, clear = []) => {
    clear.forEach((c) => {
        path = path.replace(c, '');
    });

    if (path.startsWith('/')) {
        path = path.slice(1);
    }

    return path.replace(/\//g, '-').replace(/:/g, '');
};

const logger = console // {log: () => void 1, warn: () => void 1, error: () => void 1};

async function generateAPIDoc(folderPath) {
    if (!folderPath) {
        throw new Error('Folder path is required');
    }

    logger.log('Generating API Doc for', folderPath);
    const exists = promisify(fs.exists);
    const rmFile = promisify(fs.rm);
    const readFile = promisify(fs.readFile);
    const mkdir = promisify(fs.mkdir);
    const writeFile = promisify(fs.writeFile);

    const apiData = await SwaggerParser.parse(`src/assets/apis/${folderPath}/${isEnLocale ? 'en' : 'es'}.yaml`);
    const APIPageStub = await readFile(pathModule.join(__dirname, 'stubs', 'API_REFERENCE_STUB.stub'), 'utf8');
    const ResponseExampleStub = await readFile(pathModule.join(__dirname, 'stubs', 'API_RESPONSE_EXAMPLE_STUB.stub'), 'utf8');
    const RequestExampleStub = await readFile(pathModule.join(__dirname, 'stubs', 'API_REQUEST_EXAMPLE_STUB.stub'), 'utf8');
    const ResponseExampleSectionStub = await readFile(pathModule.join(__dirname, 'stubs', 'API_RESPONSE_EXAMPLE_SECTION_STUB.stub'), 'utf8');
    const RequestExampleSectionStub = await readFile(pathModule.join(__dirname, 'stubs', 'API_REQUEST_EXAMPLE_SECTION_STUB.stub'), 'utf8');

    if (!apiData || !apiData.paths) {
        throw new Error('API Data or Path Endpoints is missing');
    }

    if (!APIPageStub) {
        throw new Error('API Page Stub is missing');
    }

    const folder = pathModule.join('src', 'pages', isEnLocale ? 'en' : '', folderPath, 'reference');
    const existsFolder = await exists(folder);
    if (!existsFolder) {
        await mkdir(pathModule.join(folder), { recursive: true });
    }

    for (const [path, pathData] of Object.entries(apiData.paths)) {
        const newFilePath = pathModule.join(folder, `${sanitizePathToFileName(path, [`/${folderPath}`])}.mdx`);
        const existsFile = await exists(newFilePath);
        if (existsFile) {
            if (!isForce) {
                logger.warn('File already exists', newFilePath);
                continue;
            }

            await rmFile(newFilePath);
            logger.warn('File already exists, overwriting', newFilePath);
        }

        let contentPageAPI = APIPageStub
            .replace(/STUB_ENDPOINT/g, path)
            .replace(/STUB_NO_TRANSLATE_BANNER/g, isEnLocale && withMissinTranslate ? '<MissingTranslationBanner />' : '');

        for (const [method, methodData] of Object.entries(pathData)) {
            if (Array.isArray(methodData) ? !methodData.length : !methodData) {
                logger.warn(`Method Data is missing for ${method.toUpperCase()} ${path}`);
                continue;
            }

            contentPageAPI = contentPageAPI
                .replace(/STUB_TITLE/g, methodData.summary)
                .replace(/STUB_METHOD_UPPERCASE/g, method.toUpperCase())
                .replace(/STUB_METHOD_LOWERCASE/g, method.toLowerCase())
                .replace(/STUB_ID/g, methodData.operationId)
                .replace(/STUB_DESCRIPTION/g, methodData.description);

            const requestBodyExample = methodData.requestBody?.content?.['application/json']?.examples ?? methodData.requestBody?.content?.['multipart/form-data']?.schema?.examples;
            if (requestBodyExample) {
                let contentRequestExamples = [];
                for (const [requestTitle, requestExample] of Object.entries(requestBodyExample)) {
                    contentRequestExamples.push(
                        RequestExampleStub
                            .replace(/STUB_EXAMPLE_TITLE/g, requestTitle)
                            .replace(/STUB_METHOD_UPPERCASE/g, method.toUpperCase())
                            .replace(/STUB_EXAMPLE_URL/g, pathModule.join(apiData.servers[0].url, path))
                            .replace(/STUB_REQUEST_CONTENT_TYPE/g, 'application/json')
                            .replace(/STUB_BODY_REQUEST/g, JSON.stringify(requestExample.value, null, 2))
                    );
                }
                contentPageAPI = contentPageAPI.replace(
                    /STUB_REQUEST_EXAMPLE_SECTION/g,
                    RequestExampleSectionStub
                        .replace(/STUB_METHOD_UPPERCASE/g, method.toUpperCase())
                        .replace(/STUB_ENDPOINT/g, path)
                        .replace(/STUB_REQUEST_EXAMPLES/g, contentRequestExamples.join('\n'))
                );
            } else {
                contentPageAPI = contentPageAPI.replace(/STUB_REQUEST_EXAMPLE_SECTION/g, '');
                logger.warn(`Request Example is missing for ${method.toUpperCase()} ${path}`);
            }

            if (methodData.responses) {
                let contentResponseExamples = [];
                for (const [responseCode, responseData] of Object.entries(methodData.responses)) {
                    if (!responseData.content?.['application/json']?.examples) {
                        logger.warn(`Response Example is missing for ${method.toUpperCase()} ${path} ${responseCode}`);
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
                contentPageAPI = contentPageAPI.replace(
                    /STUB_RESPONSE_EXAMPLE_SECTION/g,
                    ResponseExampleSectionStub.replace(/STUB_RESPONSE_EXAMPLES/g, contentResponseExamples.join('\n'))
                );
            } else {
                contentPageAPI = contentPageAPI.replace(/STUB_RESPONSE_EXAMPLE_SECTION/g, '');
                logger.warn(`Response Example is missing for ${method.toUpperCase()} ${path}`);
            }
        }

        try {
            await writeFile(newFilePath, contentPageAPI);
        } catch (e) {
            logger.error('Error writing file', newFilePath, e);
        }
    }

    logger.log('API Doc Generated');
}

generateAPIDoc(ASSET_API_FOLDER_PATH);
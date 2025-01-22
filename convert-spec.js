const converter = require('api-spec-converter');
const fs = require('fs');

converter.convert({
  from: 'swagger_2',
  to: 'openapi_3',
  source: './src/lib/types/artsyApiSwagger.yaml',
})
  .then(converted => {
    fs.writeFileSync('./src/lib/types/artsyApiOpenapi3.yaml', converted.stringify());
    console.log('Conversion complete!');
  })
  .catch(err => console.error('Conversion failed:', err));

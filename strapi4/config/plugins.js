module.exports = {
  // ...
  'import-export-entries': {
    enabled: true,
  },
  deepl: {
    enabled: true,
    config: {
      // your DeepL API key
      apiKey: 'faf8980a-e9ad-49c6-4415-d0ed5f71a104:fx',
      // whether to use the free or paid api, default true
      freeApi: true,
      // Which field types are translated (default string, text, richtext, components and dynamiczones)
      translatedFieldTypes: [
        'string',
        'text',
        'richtext',
        'component',
        'dynamiczone',
      ],
      // If relations should be translated (default true)
      translateRelations: true,
      // You can define a custom glossary to be used here (see https://www.deepl.com/docs-api/managing-glossaries/)

    },
  }
}

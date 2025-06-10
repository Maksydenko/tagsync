module.exports = (plop) => {
  plop.setGenerator('module', {
    actions: [
      {
        abortOnFail: true,
        path: 'src/{{parentDir}}/{{dashCase name}}/index.ts',
        templateFile: 'plop-templates/index.hbs',
        type: 'add',
      },
      {
        abortOnFail: true,
        path: 'src/{{parentDir}}/{{dashCase name}}/ui/index.ts',
        templateFile: 'plop-templates/ui-index.hbs',
        type: 'add',
      },
      {
        abortOnFail: true,
        path: 'src/{{parentDir}}/{{dashCase name}}/ui/{{pascalCase name}}/{{pascalCase name}}.tsx',
        templateFile: 'plop-templates/ui-component.hbs',
        type: 'add',
      },
      {
        abortOnFail: true,
        path: 'src/{{parentDir}}/{{dashCase name}}/ui/{{pascalCase name}}/{{pascalCase name}}.module.scss',
        templateFile: 'plop-templates/ui-styles.hbs',
        type: 'add',
      },
      {
        abortOnFail: true,
        path: 'src/{{parentDir}}/{{dashCase name}}/api/index.ts',
        type: 'add',
      },
      {
        abortOnFail: true,
        path: 'src/{{parentDir}}/{{dashCase name}}/model/index.ts',
        type: 'add',
      },
    ],
    prompts: [
      {
        choices: ['entities', 'features', 'widgets'],
        message: 'Which FSD layer should this module belong to?',
        name: 'parentDir',
        type: 'list',
      },
      {
        message: 'What\'s the name of this module?',
        name: 'name',
        type: 'input',
        validate(value) {
          if (/.+/.test(value)) {
            return true;
          }

          return 'Name is required';
        },
      },
    ],
  });
};

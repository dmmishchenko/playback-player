module.exports = {
  root: true,
  overrides: [
    {
      files: ['*.ts', '*.html', '*.scss'],
      parserOptions: {
        project: ['tsconfig.*?.json'],
        createDefaultProgram: true
      },
      extends: [
        'plugin:@angular-eslint/recommended',
        './node_modules/gts/',
        'plugin:prettier/recommended',
        'prettier',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended'
      ],
      rules: {
        //here we can disable or configure some rules
        '@angular-eslint/component-class-suffix': [
          'warn',
          { suffixes: ['Component', 'Service', 'Page'] }
        ],
        '@angular-eslint/no-output-on-prefix': 'off',
        'for-direction': 'off',
        'no-case-declarations': 'off',
        '@typescript-eslint/no-unused-vars': ['warn'],
        '@typescript-eslint/no-explicit-any': ['warn'],
        '@typescript-eslint/member-ordering': [
          'error',
          {
            default: {
              memberTypes: [
                'public-decorated-field',
                'protected-decorated-field',
                'private-decorated-field',
                'public-static-field',
                'protected-static-field',
                'private-static-field',
                'public-instance-readonly-field',
                'public-instance-field',
                'public-abstract-field',
                'protected-instance-readonly-field',
                'protected-instance-field',
                'protected-abstract-field',
                'private-instance-readonly-field',
                'private-instance-field',
                'static-field',
                'public-field',
                'instance-field',
                'protected-field',
                'private-field',
                'abstract-field',
                'constructor',
                'public-static-method',
                'protected-static-method',
                'private-static-method',
                'public-method',
                'protected-method',
                'private-method'
              ]
            }
          }
        ]
      }
    },
    {
      files: ['*.component.ts'],
      extends: ['plugin:@angular-eslint/template/process-inline-templates']
    }
  ]
}

# default-blank-project
프로젝트 구성 시 기본적으로 필요한 환경과 설정 파일을 갖춘 폴더입니다.

<br>

## 사용방법
- 오른쪽 상단의 초록색 'code' 버튼을 누른 후 'Download zip'을 선택해 코드를 다운로드합니다.
- `yarn install` 명령으로 라이브러리를 다운로드합니다.
- 로컬에서 작업하거나 레포지토리를 생성하여 작업을 시작합니다.

<br>

## 주의점
- webpack 설정 파일을 수정 없이 사용하기 위해  `copy-webpack-plugin`의 버전을 5.1.1로 유지합니다.
- production용으로 빌드한 파일이 생성되는 폴더명은 `dist`이며, 변경 시 관련된 설정을 변경합니다.
- 프로젝트 코드는 폴더 `src` 내에 작성하며, 변경 시 관련된 설정을 변경합니다.
- 정적 파일(이미지 등)을 저장하는 경우 폴더 `src/asset` 내에 추가하며, 변경 시 관련된 설정을 변경합니다.

<br>

## 라이브러리 목록
### React
- [react](https://ko.reactjs.org/)
- [react-dom](https://ko.reactjs.org/docs/react-dom.html#gatsby-focus-wrapper)
### TypeScript
- [typescript](https://www.typescriptlang.org/)
### webpack
- [webpack-cli](https://webpack.js.org/api/cli/)
- [webpack-dev-server](https://webpack.js.org/configuration/dev-server/)
#### webpack loader
- [awesome-typescript-loader](https://github.com/s-panferov/awesome-typescript-loader)
- [css-loader](https://webpack.js.org/loaders/css-loader/#root)
- [file-loader](https://webpack.js.org/loaders/file-loader/#root)
- [style-loader](https://webpack.js.org/loaders/style-loader/#root)
- [url-loader](https://webpack.js.org/loaders/url-loader/#root)
#### webpack plugins
- [clean-webpack-plugin](https://github.com/johnagan/clean-webpack-plugin)
- [copy-webpack-plugin](https://webpack.js.org/plugins/copy-webpack-plugin/#root)
- [html-webpack-plugin](https://webpack.js.org/plugins/html-webpack-plugin/#root)
- [mini-css-extract-plugin](https://webpack.js.org/plugins/mini-css-extract-plugin/#root)
- [uglifyjs-webpack-plugin](https://webpack.js.org/plugins/uglifyjs-webpack-plugin/#root)
### Babel
- [@babel/core](https://babeljs.io/docs/en/babel-core)
- [@babel/preset-env](https://babeljs.io/docs/en/babel-preset-env#install)
- [@babel/preset-react](https://babeljs.io/docs/en/babel-preset-react)
### polyfill
- [core-js](https://github.com/zloirock/core-js)
- [regenerator-runtime](https://github.com/facebook/regenerator/tree/master/packages/regenerator-runtime)
### linter
- [eslint](https://eslint.org/)
- [prettier](https://prettier.io/)
### AWS
- [aws-sdk](https://github.com/aws/aws-sdk-js)

<br>

## 설정파일
- Babel : [.babelrc](https://babeljs.io/docs/en/6.26.3/babelrc)
- ESLint : [.eslintignore](https://eslint.org/docs/user-guide/configuring#eslintignore) / [.eslintrc](https://eslint.org/docs/user-guide/configuring)
- Git : [.gitignore](https://git-scm.com/docs/gitignore)
- Prettier : [.prettierrc](https://prettier.io/docs/en/configuration.html)
- TypeScript : [tsconfig.json](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html)
- webpack : [webpack.dev.js / webpack.dev.build.js / webpack.prod.js](https://webpack.js.org/configuration/)
- AWS : [environment/aws.config.json](https://docs.aws.amazon.com/ko_kr/sdk-for-javascript/v2/developer-guide/loading-node-credentials-json-file.html)

<br>

## S3UploadPlugin
프로젝트 코드를 빌드 후 빌드된 파일을 S3에 업로드하는 플러그인입니다.
### 매개변수
```js
new S3UploadPlugin(bucketName, S3FolderName, outputFolderName[, files])
```
- bucketName(문자열) : 필수, S3 버킷명 (ex. 'fitpet-mall')
- S3FolderName(문자열) : 필수, S3 폴더명 (ex. 'client', 'client/test')
- outputFolderName(문자열) : 필수, 업로드할 폴더명 (ex. 'dist', 'dist-dev')
- files(배열 - 문자열) : 선택, 업로드할 폴더 내의 파일 중 올리고자 하는 파일명 (ex. ['main.js'], ['main.js', 'main_2.js'])

<br>

## 프로젝트를 시작하며 수정할 부분
프로젝트를 시작하기 전에 설정 파일의 일부를 수정해야 합니다. 폴더 내에서 'todo'로 검색하면 수정할 부분에 적어놓은 코멘트 찾을 수 있습니다.

<br>

## React와 함께 자주 사용하는 라이브러리와 type
- [redux](https://redux.js.org/)
- [redux-saga](https://redux-saga.js.org/)
- [react-router-dom](https://github.com/ReactTraining/react-router)
- [react-redux](https://github.com/reduxjs/react-redux)
- [typesafe-actions](https://github.com/piotrwitek/typesafe-actions)
- [styled-components](https://styled-components.com/)
- [axios](https://github.com/axios/axios)
- [@types/styled-components](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/7cb38cbc6d4f3092270331f90c16d29d1fc43cc2/types/styled-components)
- [@types/react-redux](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/5344bfc80508c53a23dae37b860fb0c905ff7b24/types/react-redux)
- [@types/react-router-dom](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/072d203e8f844e56976b5e1f86834fae283d0e7e/types/react-router-dom)

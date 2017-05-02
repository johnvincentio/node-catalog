#Integration testing with Chai-HTTP

###Getting Started

```
cd MyDevelopment/github
git clone https://github.com/Thinkful-Ed/node-shopping-list-integration-tests node-shopping-list-chai-http-integration-tests

cd node-shopping-list-chai-http-integration-tests
```
created new repo on github:
node-shopping-list-chai-http-integration-tests

change to new remote:
```
git remote set-url origin https://github.com/jv2351/node-shopping-list-chai-http-integration-tests
```

Push the master branch up to your new repo on GitHub:
```
git push -u origin master
```

Install dependencies:

```
npm install
```

To run the tests:
```
npm test
```

##New Branch

Integration test for /recipes.

```
cd MyDevelopment/github/node-shopping-list-chai-http-integration-tests

git checkout -b tests-for-recipes

```

Make changes and:

```
git add .
git commit - m "/recipes"
git push -u origin tests-for-recipes
```

###Gotcha
* ingredients is an array requiring Chai method .members


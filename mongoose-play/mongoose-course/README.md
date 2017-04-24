#Mongoose Course
[Udemy Mongoose Essentials](https://www.udemy.com/mongoosejs-essentials/learn/v4/t/lecture/4649838)

##Import Data
```
mongo

use booksDB

db.books.find()

db.books.insert({
    title: 'Refactoring the DOM',
    author: 'Joe Blow',
    category: 'Technology'
})

db.books.insert({
    title: 'Learn Colloquial Speech',
    author: 'Susie Q',
    category: 'Humanities'
})

db.books.insert({
    title: 'Study of the Brain',
    author: 'Matt G',
    category: 'Health'
})

db.books.find()
```

Using:

```
var port = 5001;
var db = 'mongodb://localhost/booksDB';
```

Test:

```
Postman
http://localhost:5001/

http://localhost:5001/books
```

Select any record:

```
"_id": "587fbacd450d84fcb35049ba"

http://localhost:5001/books/587fbacd450d84fcb35049ba
```






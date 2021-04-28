# shell命令

1、创建数据库：use    mydb
注：创建之后此数据库默认放在数据库内存中，如果不插入数据，关闭数据库之后系统会删除mydb。

2、插入数据：db.mydb.insert ({ "name" : "菜鸟教程" } )    --->插入集合（collection）

3、查看数据库：show    dbs

4、查看集合：show    collections

5、查找集合中的数据：
    db.person.find()                    --->查找所有
    db.person.findOne()             --->查找第一个

6、更新集合中的数据（set修改器）：
     
    db.person.update( { name : "test_name11111" } , { $set : {name : "test_name3333331" } } )  

    注：如果不用set，是修改整个集合,如果使用set，是修改指定的字段，如果该字段不存在，则默认添加该字段。

    > db.person.find()
    { "_id" : ObjectId("5739377cc2b6791511e55eb1"), "name" : "123321" }
    { "_id" : ObjectId("57393847c2b6791511e55eb2"), "age" : "25" }
    > db.person.update ( { age : "25" } , { $set : { name : "testname" } } )
    WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })
    > db.person.find()
    { "_id" : ObjectId("5739377cc2b6791511e55eb1"), "name" : "123321" }
    { "_id" : ObjectId("57393847c2b6791511e55eb2"), "age" : "25", "name" : "testname" }
    > db.person.update( { age : "25" } , { $set : { age : "20" , name : "张三" , sex : "男" } } )
    WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })
    > db.person.find()
    { "_id" : ObjectId("5739377cc2b6791511e55eb1"), "name" : "123321" }
    { "_id" : ObjectId("57393847c2b6791511e55eb2"), "age" : "20", "name" : "张三", "sex" : "男" }


7、删除集合中的字段：
    
    > db.person.find()
    { "_id" : ObjectId("5739377cc2b6791511e55eb1"), "name" : "123321" }
    { "_id" : ObjectId("57393847c2b6791511e55eb2"), "age" : "20", "name" : "张三", "sex" : "男" }
    > db.person.remove( { name : "123321" } )
    WriteResult({ "nRemoved" : 1 })

8、删除集合：

    > show collections
    mydb
    person
    system.profile
    > db.person.drop()
    true
    > show collections
    mydb
    system.profile

9、删除数据库：

    > show dbs
    local  0.000GB
    mydb   0.000GB
    > db.dropDatabase()
    { "dropped" : "mydb", "ok" : 1 }
    > show dbs
    local  0.000GB
 
10、分页查询：

    > db.person.find()                                                          ------>共10条数据---用于分页
    { "_id" : 1, "name" : "name-1", "age" : 28, "sex" : "女" }
    { "_id" : 2, "name" : "name-2", "age" : 28, "sex" : "女" }
    { "_id" : 3, "name" : "name-3", "age" : 28, "sex" : "女" }
    { "_id" : 4, "name" : "name-4", "age" : 28, "sex" : "女" }
    { "_id" : 5, "name" : "name-5", "age" : 28, "sex" : "女" }
    { "_id" : 6, "name" : "name-6", "age" : 28, "sex" : "女" }
    { "_id" : 7, "name" : "name-7", "age" : 28, "sex" : "女" }
    { "_id" : 8, "name" : "name-8", "age" : 28, "sex" : "女" }
    { "_id" : 9, "name" : "name-9", "age" : 28, "sex" : "女" }
    { "_id" : 10, "name" : "lili", "age" : 10, "sex" : "女" }
    
    > db.person.find().limit(5).skip(0)                                ------>分页：每页5条，第一页
    { "_id" : 1, "name" : "name-1", "age" : 28, "sex" : "女" }
    { "_id" : 2, "name" : "name-2", "age" : 28, "sex" : "女" }
    { "_id" : 3, "name" : "name-3", "age" : 28, "sex" : "女" }
    { "_id" : 4, "name" : "name-4", "age" : 28, "sex" : "女" }
    { "_id" : 5, "name" : "name-5", "age" : 28, "sex" : "女" }
    > db.person.find().limit(5).skip(5)                                 ------>分页：每页5条，第二页
    { "_id" : 6, "name" : "name-6", "age" : 28, "sex" : "女" }
    { "_id" : 7, "name" : "name-7", "age" : 28, "sex" : "女" }
    { "_id" : 8, "name" : "name-8", "age" : 28, "sex" : "女" }
    { "_id" : 9, "name" : "name-9", "age" : 28, "sex" : "女" }
    { "_id" : 10, "name" : "lili", "age" : 10, "sex" : "女" }
    
    > db.person.find().limit(3).skip(0)                                 ------>分页：每页3条，第一页
    { "_id" : 1, "name" : "name-1", "age" : 28, "sex" : "女" }
    { "_id" : 2, "name" : "name-2", "age" : 28, "sex" : "女" }
    { "_id" : 3, "name" : "name-3", "age" : 28, "sex" : "女" }
    > db.person.find().limit(3).skip(3)                                 ------>分页：每页3条，第二页
    { "_id" : 4, "name" : "name-4", "age" : 28, "sex" : "女" }
    { "_id" : 5, "name" : "name-5", "age" : 28, "sex" : "女" }
    { "_id" : 6, "name" : "name-6", "age" : 28, "sex" : "女" }
    > db.person.find().limit(3).skip(6)                                 ------>分页：每页3条，第三页
    { "_id" : 7, "name" : "name-7", "age" : 28, "sex" : "女" }
    { "_id" : 8, "name" : "name-8", "age" : 28, "sex" : "女" }
    { "_id" : 9, "name" : "name-9", "age" : 28, "sex" : "女" }
    > db.person.find().limit(3).skip(9)                                 ------>分页：每页3条，第四页
    { "_id" : 10, "name" : "lili", "age" : 10, "sex" : "女" }
    
11、排序

    > db.person.find()
    { "_id" : 1, "name" : "name-1", "age" : 16, "sex" : "女" }
    { "_id" : 2, "name" : "name-2", "age" : 19, "sex" : "女" }
    { "_id" : 3, "name" : "name-3", "age" : 22, "sex" : "女" }
    { "_id" : 4, "name" : "name-4", "age" : 18, "sex" : "女" }
    { "_id" : 5, "name" : "name-5", "age" : 23, "sex" : "女" }
    { "_id" : 6, "name" : "name-6", "age" : 30, "sex" : "女" }
    { "_id" : 7, "name" : "name-7", "age" : 25, "sex" : "女" }
    { "_id" : 8, "name" : "name-8", "age" : 28, "sex" : "女" }
    { "_id" : 9, "name" : "name-9", "age" : 28, "sex" : "女" }
    { "_id" : 10, "name" : "lili", "age" : 10, "sex" : "女" }
    
    > db.person.find( ).sort( { age : 1 } )                            ------>1    升序
    { "_id" : 10, "name" : "lili", "age" : 10, "sex" : "女" }
    { "_id" : 1, "name" : "name-1", "age" : 16, "sex" : "女" }
    { "_id" : 4, "name" : "name-4", "age" : 18, "sex" : "女" }
    { "_id" : 2, "name" : "name-2", "age" : 19, "sex" : "女" }
    { "_id" : 3, "name" : "name-3", "age" : 22, "sex" : "女" }
    { "_id" : 5, "name" : "name-5", "age" : 23, "sex" : "女" }
    { "_id" : 7, "name" : "name-7", "age" : 25, "sex" : "女" }
    { "_id" : 8, "name" : "name-8", "age" : 28, "sex" : "女" }
    { "_id" : 9, "name" : "name-9", "age" : 28, "sex" : "女" }
    { "_id" : 6, "name" : "name-6", "age" : 30, "sex" : "女" }
    
    > db.person.find( ).sort( { age : -1 } )                            ------>-1    降序
    { "_id" : 6, "name" : "name-6", "age" : 30, "sex" : "女" }
    { "_id" : 8, "name" : "name-8", "age" : 28, "sex" : "女" }
    { "_id" : 9, "name" : "name-9", "age" : 28, "sex" : "女" }
    { "_id" : 7, "name" : "name-7", "age" : 25, "sex" : "女" }
    { "_id" : 5, "name" : "name-5", "age" : 23, "sex" : "女" }
    { "_id" : 3, "name" : "name-3", "age" : 22, "sex" : "女" }
    { "_id" : 2, "name" : "name-2", "age" : 19, "sex" : "女" }
    { "_id" : 4, "name" : "name-4", "age" : 18, "sex" : "女" }
    { "_id" : 1, "name" : "name-1", "age" : 16, "sex" : "女" }
    { "_id" : 10, "name" : "lili", "age" : 10, "sex" : "女" }

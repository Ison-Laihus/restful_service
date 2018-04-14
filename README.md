# RESTful Service

一个使用node和koa框架实现的对数据表user进行增删查改的服务。

## 所有服务

| url | type | description |
| --- | ---- | ----------- |
| /user/structure | GET | 获取数据表的结构信息 |
| /user/all | GET | 获取数据表user中所有的数据 |
| /user/:id | GET | 获取数据表user中某个id的数据 |
| /user | POST | 向数据表user中添加一条记录 |
| /user | PUT | 向数据表user中更新一条记录 |
| /user/:id | DELETE | 删除数据表user中某个id的记录 |


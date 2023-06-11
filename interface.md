# 接口文档


### 1. banner列表

- **url**: http://{host}:{port}/banner/list
- **method**: GET
- **param**:

|name|type|required|comment|
|:---|:---|:---|:---|
|type|Integer|false|banner类型：1-首页banner，2-推荐页banner，默认为1|
|pageNo|Integer|true|页码|
|pageSize|Integer|true|页大小，最大200|

- **response**

|name|||type|comment|
|:---|:---|:---|:---|:---|
|ret|||Integer|状态码|
|msg|||String|异常信息|
|data|||Object|返回数据|
||pageNo||Integer|页码|
||pageSize||Integer|页大小|
||pages||Integer|页总数|
||total||Long|数据总数总数|
||dataList||List\<Object\>|列表数据|
|||id|Long|banner图片id|
|||bookId|Long|书籍id|
|||picUrl|String|图片url|
|||picOrder|Integer|图片序|


### 2. 书籍列表

- **url**: http://{host}:{port}/book/list
- **method**: GET
- **param**:

|name|type|required|comment|
|:---|:---|:---|:---|
|bookName|String|false|书籍名称，模糊搜索|
|end|Integer|false|是否完结：0-否，1-是|
|top|Integer|false|是否置顶：0-否，1-是|
|pageNo|Integer|true|页码|
|pageSize|Integer|true|页大小，最大200|

- **response**

|name|||type|comment|
|:---|:---|:---|:---|:---|
|ret|||Integer|状态码|
|msg|||String|异常信息|
|data|||Object|返回数据|
||pageNo||Integer|页码|
||pageSize||Integer|页大小|
||pages||Integer|页总数|
||total||Long|数据总数总数|
||dataList||List\<Object\>|列表数据|
|||id|Long|书籍id|
|||bookName|String|书籍名称|
|||nickName|String|书籍别名|
|||summary|String|简介|
|||tag|String|标签|
|||end|Integer|是否完结：0-否，1-是|
|||top|Integer|是否置顶：0-否，1-是|
|||chapterCount|Integer|章节总数|
|||coverUrl|String|书籍封面url|
|||bannerUrl|String|书籍bannerUrl|
|||updatedAt|Date|更新时间|
|||createdAt|Date|创建时间|


### 3. 书籍详情

- **url**: http://{host}:{port}/book/detail
- **method**: GET
- **param**:

|name|type|required|comment|
|:---|:---|:---|:---|
|id|Long|true|书籍id|

- **response**

|name||type|comment|
|:---|:---|:---|:---|
|ret||Integer|状态码|
|msg||String|异常信息|
|data||Object|返回数据|
||id|Long|书籍id|
||bookName|String|书籍名称|
||nickName|String|书籍别名|
||summary|String|简介|
||authorId|Long|作者id|
||authorName|String|作者名称|
||tag|String|标签|
||end|Integer|是否完结：0-否，1-是|
||top|Integer|是否置顶：0-否，1-是|
||chapterCount|Integer|章节总数|
||coverUrl|String|书籍封面url|
||bannerUrl|String|书籍bannerUrl|
||updatedAt|Date|更新时间|
||createdAt|Date|创建时间|


### 4. 书籍章节列表

- **url**: http://{host}:{port}/chapter/list
- **method**: GET
- **param**:

|name|type|required|comment|
|:---|:---|:---|:---|
|bookId|Long|true|书籍id|
|reverse|Integer|false|是否倒序：0-否，1-是，默认0|
|pageNo|Integer|true|页码|
|pageSize|Integer|true|页大小，最大200|

- **response**

|name|||type|comment|
|:---|:---|:---|:---|:---|
|ret|||Integer|状态码|
|msg|||String|异常信息|
|data|||Object|返回数据|
||pageNo||Integer|页码|
||pageSize||Integer|页大小|
||pages||Integer|页总数|
||total||Long|数据总数总数|
||dataList||List\<Object\>|列表数据|
|||id|Long|书籍id|
|||bookId|Long|书籍名称|
|||chapterName|String|书籍名称|
|||chapterOrder|Integer|简介|
|||coverUrl|String|章节封面|


### 5. 书籍章节详情

- **url**: http://{host}:{port}/chapter/detail
- **method**: GET
- **param**:

|name|type|required|comment|
|:---|:---|:---|:---|
|id|Long|true|章节id|

- **response**

|name||type|comment|
|:---|:---|:---|:---|
|ret||Integer|状态码|
|msg||String|异常信息|
|data||Object|返回数据|
||id|Long|章节id|
||bookId|Long|书籍id|
||chapterName|String|章节名称|
||chapterOrder|Integer|章节序|
||coverUrl|String|章节封面|


### 6. 章节图片列表

- **url**: http://{host}:{port}/pricture/list
- **method**: GET
- **param**:

|name|type|required|comment|
|:---|:---|:---|:---|
|chapterId|Long|true|章节id|
|pageNo|Integer|true|页码|
|pageSize|Integer|true|页大小，最大200|

- **response**

|name|||type|comment|
|:---|:---|:---|:---|:---|
|ret|||Integer|状态码|
|msg|||String|异常信息|
|data|||Object|返回数据|
||pageNo||Integer|页码|
||pageSize||Integer|页大小|
||pages||Integer|页总数|
||total||Long|数据总数总数|
||dataList||List\<Object\>|列表数据|
|||id|Long|图片id|
|||chapterId|Long|章节id|
|||picUrl|String|图片url|
|||picOrder|Integer|图片序|


### 7. 评论列表

- **url**: http://{host}:{port}/comment/list
- **method**: GET
- **param**:

|name|type|required|comment|
|:---|:---|:---|:---|
|foreignId|Long|true|评论关联的外键id|
|type|Integer|true|评论类型：1-书籍评论，2-章节评论|
|pageNo|Integer|true|页码|
|pageSize|Integer|true|页大小，最大200|

- **response**

|name|||type|comment|
|:---|:---|:---|:---|:---|
|ret|||Integer|状态码|
|msg|||String|异常信息|
|data|||Object|返回数据|
||pageNo||Integer|页码|
||pageSize||Integer|页大小|
||pages||Integer|页总数|
||total||Long|数据总数总数|
||dataList||List\<Object\>|列表数据|
|||id|Long|评论id|
|||foriegnId|Long|评论关联的外键id|
|||type|Integer|评论类型：1-书籍评论，2-章节评论|
|||content|String|评论内容|
|||userName|String|用户名称|
|||like|Integer|赞|


### 8. 标签列表

- **url**: http://{host}:{port}/tag/list
- **method**: GET
- **param**:

|name|type|required|comment|
|:---|:---|:---|:---|
|type|Integer|false|标签类型：0-通用，1-男生，2-女生，不传返回所有类型|
|pageNo|Integer|true|页码|
|pageSize|Integer|true|页大小，最大200|

- **response**

|name|||type|comment|
|:---|:---|:---|:---|:---|
|ret|||Integer|状态码|
|msg|||String|异常信息|
|data|||Object|返回数据|
||pageNo||Integer|页码|
||pageSize||Integer|页大小|
||pages||Integer|页总数|
||total||Long|数据总数总数|
||dataList||List\<Object\>|列表数据|
|||id|Long|标签id|
|||tagName|String|标签名称|
|||type|Integer|标签类型：0-通用，1-男生，2-女生|
# 日志文件位置
	logpath=/data/db/journal/mongodb.log

# 以追加方式写入日志
	logappend=true

# 是否以守护进程方式运行
	fork = true

# 默认27017
	port = 27017

# 数据库文件位置
	dbpath=/data/db

# 启用定期记录CPU利用率和 I/O 等待
	cpu = true

# 是否以安全认证方式运行，默认是不认证的非安全方式
	noauth = true
	auth = true

# 详细记录输出
	verbose = true

# 用于开发驱动程序时验证客户端请求
	objcheck = true
> Inspect all client data for validity on receipt (useful for developing drivers) 

# Enable db quota management 启用数据库配额管理
	quota = true

# 设置oplog记录等级  
	diaglog=0
>Set oplogging level where n is
>
>0=off (default)
>
>1=W
>
>2=R
>
>3=both
>
>7=W+some reads
>

# Diagnostic/debugging option 动态调试项
	nocursors = true

# Ignore query hints 忽略查询提示
	nohints = true

# 禁用http界面，默认为localhost：28017
	nohttpinterface = true

# 关闭服务器端脚本，这将极大的限制功能
	noscripting = true
>Turns off server-side scripting.  This will result in greatly limited functionality

# 关闭扫描表，任何查询将会是扫描失败
	notablescan = true
>Turns off table scans.  Any query that would do a table scan fails.

# 关闭数据文件预分配
	noprealloc = true
>Disable data file preallocation.

# 为新数据库指定.ns文件的大小，单位:MB
	nssize = 
>Specify .ns file size for new databases.

# Replication Options 复制选项
	replSet=setname
>in replicated mongo databases, specify the replica set name here

# maximum size in megabytes for replication operation log
	oplogSize=1024

# 指定存储身份验证信息的密钥文件的路径
	keyFile=/path/to/keyfile
>path to a key file storing authentication info for connections between replica set members

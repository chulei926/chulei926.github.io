# 修改nginx.conf

```nginx
# 添加在 http 块内
access_by_lua_file /usr/local/nginx/conf/url_block.lua;
lua_shared_dict block_url 50m;
```

# url_block.lua
```shell
function get_client_url()
    local CLIENT_URL = ngx.var.uri
    if CLIENT_URL == nil then
        CLIENT_URL  = "unknown"
    end
    return CLIENT_URL
end

local redis_host = "172.27.66.1"
local redis_port = 6379
local redis_auth = "cjwl8888"
local limit = ngx.shared.limit

local random = ngx.var.cookie_seed
local CC_TOKEN = ngx.var.remote_addr .. "_token"

local redis_conn_timeout = 1000
local redis_key = "url_block"
local cache_ttl = 10

local url = get_client_url()
local url_list = ngx.shared.block_url
local last_update_time = url_list:get("last_update_time");


if last_update_time == nil or last_update_time < (ngx.now() - cache_ttl) then

        local redis = require "resty.redis";
        local r = redis:new();
        r:set_timeout(redis_conn_timeout);

        local ok,err = r:connect(redis_host, redis_port);
        r:auth(redis_auth)
        if not ok then
            ngx.say(ngx.DEBUG, "failed" .. err)
            ngx.log(ngx.DEBUG, "connect redis failed " .. err);
        else
            	local new_url_list, err = r:smembers(redis_key);
                if err then
                    ngx.say(err)
                        ngx.log(ngx.DEBUG, "get block url failed " .. err)
                return ngx.exit(401)
            else
                url_list:flush_all();
                for index, banned_url in ipairs(new_url_list) do
                    url_list:set(banned_url, true)
                end

                url_list:set("last_update_time", ngx.now());
            end
        end
end
if url_list:get(url) then
	json = require "cjson"
	local ret = {};
	ret["errorCode"] = "-1";
	ret["message"] = "😭亲爱的用户，考试高峰，暂缓使用，请稍后再试";
	ngx.header['Content-Type'] = 'application/json; charset=utf-8';
	ngx.status = ngx.HTTP_INTERNAL_SERVER_ERROR
	ngx.say(json.encode(ret));
	ngx.exit(405);
end
```

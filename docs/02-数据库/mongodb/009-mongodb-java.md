# MongoHelper.java

```java

/**
 * MongoDB帮助类。
 *
 * @author kitty 2018-10-24.
 */
public class MongoHelper {

    private static Logger logger = LoggerFactory.getLogger(MongoHelper.class);

    private static MongoClient client;

    private static String name;
    private static String password;
    private static String dbName;
    private static String addressList;

    static {
        try {
            name = EtcdUtil.getV("/mongodb/tk/username", "");
            password = EtcdUtil.getV("/mongodb/tk/password", "");
            dbName = EtcdUtil.getV("/mongodb/tk/dbName", "");
            addressList = EtcdUtil.getV("/mongodb/tk/addresses", "");

            List<ServerAddress> serverAddresses = new ArrayList<>();
            if (null != addressList && !"".equals(addressList)) {
                String[] list = addressList.split(",");
                for (String s : list) {
                    String[] address = s.split(":");
                    serverAddresses.add(new ServerAddress(address[0], Integer.parseInt(address[1])));
                }
            }
            MongoCredential credential = MongoCredential.createCredential(name, dbName, password.toCharArray());
            MongoClientSettings settings = MongoClientSettings.builder().credential(credential)
                    .applyToClusterSettings(builder -> builder.hosts(serverAddresses)).build();
            client = MongoClients.create(settings);
            logger.info("初始化MongoDB连接成功,连接地址为: " + addressList);
        } catch (Exception e) {
            logger.error("初始化MongoDB连接失败！", e);
        }
    }

    public static final MongoDatabase DB = client.getDatabase(dbName);
    
}

```

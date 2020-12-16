<?php
// include "conn.php";//引入数据库连接代码。
header('Access-Control-Allow-Origin:*');  //允许任意的域名访问
header('Access-Control-Allow-Method:POST,GET'); //允许请求方式是get和pos

header('content-type:text/html;charset=utf-8');
define('HOST','localhost');//主机名
define('USERNAME','root');//用户名
define('PASSWORD','root');//密码
define('DBNAME','taobao');//数据库名
$conn = @new mysqli(HOST,USERNAME,PASSWORD,DBNAME);
$result = $conn->query("select * from taobaogoods"); //获取数据的结果集(记录集)

$arr = array();
for ($i = 0; $i < $result->num_rows; $i++) {
    $arr[$i] = $result->fetch_assoc();
}

echo json_encode($arr);




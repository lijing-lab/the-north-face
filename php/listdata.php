<?php
header('content-type:text/html;charset=utf-8');
define('HOST','localhost');//主机名
define('USERNAME','root');//用户名
define('PASSWORD','root');//密码
define('DBNAME','taobao');//数据库名
$conn = @new mysqli(HOST,USERNAME,PASSWORD,DBNAME);

if($conn->connect_error){
    die('连接数据库错误,'.$conn->connect_error);//die():退出程序并返回括号里面的值。
}
$conn->query('SET NAMES UTF8');
$result=$conn->query("select * from taobaogoods");

$num=$result->num_rows;

$pagesize=15;

$pagenum=ceil($num / $pagesize);

if (isset($_GET['page'])) {//判断前端传入的页码是否存在，
    $pagevalue = $_GET['page'];//如果存在，获取页码
} else {
    $pagevalue = 1;//默认为1
}
$page = ($pagevalue - 1) * $pagesize; //计算开始偏移值
$res = $conn->query("select * from taobaogoods limit $page,$pagesize");


$arr = array();
for($i=0;$i<$res->num_rows;$i++){
    $arr[$i] = $res->fetch_assoc();
}
class listdata{

}
$list = new listdata();//$list实例对象

$list->pagedata = $arr;//将接口数据给$list实例对象当做属性值
$list->pageno = $pagenum;//将页数给$list实例对象当做属性值

echo json_encode($list);

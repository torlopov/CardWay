<?php
$link = mySql_connect('localhost', 'bx1125_test2', '123456'); //доступ к базе данных
mysql_select_db("bx1125_test2", $link);
	$resto_name = htmlspecialchars($_GET["resto_name"]);
	//$date_broni = htmlspecialchars($_GET["date_broni"]);
	//$time_broni = htmlspecialchars($_GET["time_broni"]);

$sql1 = "delete from booking where resto_name='$resto_name' and date_broni='$date_broni' and time_broni='$time_broni'"; 
$res = mysql_query($sql1, $link); // выводим данные по запросу
mysql_close($link); // закрываем сеанс связи с базой данных
//echo  "<script> javascript:history.back()</script>"; /* Делаем шаг назад, чтобы вернуться на страницу приложения */

?>
time_broni
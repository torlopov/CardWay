<?php
$link = mySql_connect('localhost', 'bx1125_test2', '123456'); //доступ к базе данных
mysql_select_db("bx1125_test2", $link);

	$resto_id = htmlspecialchars($_GET['resto_id']); 
	$tel = htmlspecialchars($_GET['tel']);

$sql = "delete from favorites where id='$id' and tel='$tel'"; 
$res = mysql_query($sql, $link); // выводим данные по запросу
	
mysql_close($link); // закрываем сеанс связи с базой данных
echo  "<script> javascript:history.back()</script>"; /* Делаем шаг назад, чтобы вернуться на страницу приложения */

?>
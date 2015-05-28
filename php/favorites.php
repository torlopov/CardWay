<?php
$link = mySql_connect('localhost', 'bx1125_test2', '123456'); //доступ к базе данных
mysql_select_db("bx1125_test2", $link);
if ($_SERVER['REQUEST_METHOD'] == 'POST'){ // если пришел запрос методом POST
	$id = htmlspecialchars($_POST['id']); // берем значение поля user_fio
	$resto_name = htmlspecialchars($_POST['resto_name']); // берем значение поля bank_name
} else {
	echo 'что-то пошло не так';
}
//$sql1 = "delete from favorites where id='$id' and resto_name='$resto_name'"; 
$sql = "select id from favorites where id = '$id' "; // строка для чтения данных
$res = mysql_query($sql, $link); // выводим данные по запросу
	if (mysql_num_rows($res ) < 1){
		$sql1 = "insert into favorites (id, resto_name) values ('$id', '$resto_name')";
		mysql_query($sql1, $link); //добавляем данные в базу
	} 
mysql_close($link); // закрываем сеанс связи с базой данных
echo  "<script> javascript:history.back()</script>"; /* Делаем шаг назад, чтобы вернуться на страницу приложения */

?>
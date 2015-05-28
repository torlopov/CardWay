<?php
$link = mySql_connect('localhost', 'bx1125_test2', '123456'); //доступ к базе данных
mysql_select_db("bx1125_test2", $link);

$new_status = htmlspecialchars( $_GET['status'] );
$tel = htmlspecialchars( $_GET['tel'] );
$time_action = htmlspecialchars( $_GET['time'] );
$date_action = htmlspecialchars( $_GET['date'] );

$sql = "UPDATE my_booking SET status = '$new_status' WHERE tel = '$tel' and time_action = '$time_action' and date_action = '$date_action' "; 
$res = mysql_query($sql, $link); // выводим данные по запросу

mysql_close($link); // закрываем сеанс связи с базой данных
?>


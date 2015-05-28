<?php
$link = mySql_connect('localhost', 'bx1125_test2', '123456'); //доступ к базе данных
mysql_select_db("bx1125_test2", $link);
$str = htmlspecialchars( $_GET['tel'] );
$sql = "SELECT resto_name, time_broni, date_broni, time_action, date_action FROM my_booking WHERE tel = '$str' ORDER BY date_action, time_action desc";
$result = mysql_query($sql, $link);
while ($row = mysql_fetch_array($result, MYSQL_NUM)) {
	printf('
		<div class="client_line">
			<div style="float:left">
				название ресторана
				<div >
					%s
				</div>
			</div>
			<div style="float:left">
				время брони
				<div>
					%s
				</div>
			</div>
			<div style="float:left">
				дата брони
				<div>
					%s
				</div>
			</div>
			<div style="float:left">
				время подачи заявки
				<div>
					%s
				</div>
			</div>
			<div style="float:left">
				дата подачи заявки
				<div>
					%s
				</div>
			</div>
			
		</div>
'
	
	, $row[0], $row[1], $row[2], $row[3], $row[4]);
};
mysql_close($link); // закрываем сеанс связи с базой данных

/*echo  "<script> javascript:history.back()</script>";*/ /* Делаем шаг назад, чтобы вернуться на страницу приложения */

?>


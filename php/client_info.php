<?php
$link = mySql_connect('localhost', 'bx1125_test2', '123456'); //доступ к базе данных
mysql_select_db("bx1125_test2", $link);
$sql = "SELECT fio, tel, bank_name from client"; 
$res = mysql_query($sql, $link); // выводим данные по запросу
while ($row = mysql_fetch_array($res, MYSQL_NUM)) {
	printf('
		<div class="client_line">
			<div style="float:left">
				имя
				<div >
					%s
				</div>
			</div>
			<div style="float:left">
				телефон
				<div>
					%s
				</div>
			</div>
			<div style="float:left">
				банк
				<div>
					%s
				</div>
			</div>
			
		</div>
'
	
	, $row[0], $row[1], $row[2]);
};
mysql_close($link); // закрываем сеанс связи с базой данных

/*echo  "<script> javascript:history.back()</script>";*/ /* Делаем шаг назад, чтобы вернуться на страницу приложения */

?>


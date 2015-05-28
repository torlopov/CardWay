<html>
<head>
<title>Example</title>
<meta http-equiv="Content-Type" content="text/html;charset=utf-8">
</head>
<body>
<?
$link = mySqli_connect('localhost', 'bx1125_test2', '123456', 'bx1125_test2'); //доступ к базе данных
function clearStr($data){ //убераем из строки все лишнее
	global $link;
	return mysqli_real_escape_string($link, trim(strip_tags($data)));
}
if ($_SERVER['REQUEST_METHOD'] == 'POST'){ // если пришел запрос методом POST
	$fio = clearStr($_POST['user_fio']); // берем значение поля user_fio
	$bank_name = clearStr($_POST['bank_name']); // берем значение поля bank_name
	$bin = clearStr($_POST['card_num']); // берем значение поля card_num
	$tel = clearStr($_POST['phone_num']); // берем значение поля phone_num
} else {
	echo 'что-то пошло не так';
}
$sql1 = "insert into client (bin, fio, tel, bank_name) values ('$bin', '$fio', '$tel', '$bank_name')"; // строка для добавления значений в базу
mysqli_query($link, $sql1) or die (mysqli_error($link)); //добавляем данные в базу
$sql = "select * from client"; // строка для чтения данных
$res = mysqli_query($link, $sql) or die (mysqli_error($link)); // выводим данные по запросу
mysqli_close($link); // закрываем сеанс связи с базой данных
var_dump($res); //данные из базы превращаем в массив
while ($row = mysqli_fetch_array($res)) //выводим данные
echo $row[0];
?>
</body>
</html>
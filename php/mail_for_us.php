<?php

/* Создаем переменные и Осуществляем проверку вводимых данных и их защиту от враждебных скриптов */

	$myemail = "dk9099000809@gmail.com";	/* Устанавливаем e-mail адресата */
	$tema = "Сообщение от клиента. Источник - приложение.";	/* Прописываем тему письма */
	$napisat_nam = htmlspecialchars($_GET["napisat_nam"]);	/* Принимаем данные с HTML формы */
	$tel = htmlspecialchars($_GET["tel"]);	/* Принимаем данные с HTML формы */
	$time_action = date("G:i:s");	// присваивает переменной системное время
	$date_action = date("Y-m-d");	 // присваивает переменной системную дату

/* Создаем новую переменную (текст сообщения) и присваиваем ей значение */

$message_to_myemail = 
"Сообщение от клиента:
$tema

Время отправки заявки пользователем:
$time_action
Дата отправки заявки пользователем: 
$date_action
Номер телефона:
$tel
"

/* Отправляем сообщение, используя mail() функцию */

	$from  = "From: $yourname <$email> \r\n Reply-To: $email \r\n";
	mail($myemail, $tema, $message_to_myemail, $from);
	
?>


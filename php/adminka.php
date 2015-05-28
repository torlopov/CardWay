<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="ru" lang="ru">
	<head>
		<title>админка</title>
		<meta http-equiv="content-type"
			content="text/html; charset=utf-8" />
		<link rel="stylesheet" type="text/css" href="css/index.css" />
		<script type="text/javascript" src="js/jquery-2.1.3.min.js"></script>
		<script>
		$(document).ready(function(){
			$(".client_info").click(function(){
				$.get('http://test_to_app.zakazstolov24.ru/adminka/php/client_info.php', function(data) {
                    $('.about_client').html(data);
				});
			});
			$(".about_client").on("click", ".client_tel", function(){
				var tel_number = $(this).text();
				alert(tel_number);
				$.get('http://test_to_app.zakazstolov24.ru/adminka/php/booking_info.php', {tel:tel_number}, function(data) {
                    $('.client_booking').html(data);
				});
			});
		});
		</script>
	</head>
	<body>
	<input type="button" class="client_info" value="список пользователей">
	<input type="button" class="booking_info" value="список броней">
	<div class="about_client">
	</div>	
	<div class="client_booking">
		
	</div>

		
	</body>
</html>
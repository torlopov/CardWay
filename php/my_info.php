<?php
	$db = mysql_connect('localhost', 'bx1125_test2', '123456');
	mysql_select_db("bx1125_test2");
    
	$tel = htmlspecialchars( $_GET['tel'] );
	$sql = "SELECT bank_name, bin, fio FROM client  WHERE tel = '$tel' ";
	$result = mysql_query($sql, $db);
 
	$row = mysql_fetch_array($result);
	if ($row){
		printf ('
			<form class="forma_regist" action="http://test_to_app.zakazstolov24.ru/forma_registr_processing.php" method="post">
				<div class="reg_banck_wr all_big_wr">
					<div class="all_medium_wr all_margin_center">
						<div class="pointer"></div>
						<div class="all_small_wr all_margin_center">
							<input class="css_font_size_16" name="bank_name" type="text" value="" placeholder="%s" readonly />
						</div>
					</div>
				</div>    

				<div class="reg_card_wr all_big_wr">
					<div class="all_medium_wr all_margin_center">
						<div class="pointer"></div>
						<div class="all_small_wr all_margin_center">		
							<input class="css_font_size_16" name="card_num" type="text" value="" placeholder="%s" />
						</div>
					</div>
				</div>    
				
				<div class="reg_fio_wr all_big_wr">
					<div class="all_medium_wr all_margin_center">
						<div class="pointer"></div>
						<div class="all_small_wr all_margin_center">
							<input class="css_font_size_16" type="text" name="user_fio" value="" placeholder="%s" />
						</div>
					</div>
				</div>    

				<div class="reg_phone_wr all_big_wr">
					<div class="all_medium_wr all_margin_center">
						<div class="pointer"></div>
						<div class="all_small_wr all_margin_center">
							<input class="css_font_size_16" type="text" name="phone_num" value="" placeholder="%s" />
						</div>
					</div>
				</div>    

				<div class="reg_submit_wr all_but_big_wr">
					<div class="all_but_medium_wr all_margin_center">
						<input class="css_font_size_16 all_margin_center" type="text" value="ПОДКЛЮЧИТЬ КАРТУ" readonly />
					</div>
				</div>    

				<input id="submit_reg" class="all_skritiy_input_submit" type="text">
				
			</form>
		', $row ['bank_name'], $row ['bin'], $row ['fio'], $tel); 
	} else {
		echo ('что-то пошло не так');
	}
    
?>
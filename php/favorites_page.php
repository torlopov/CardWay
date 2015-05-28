<?php
	$db = mysql_connect('localhost', 'bx1125_test2', '123456');
	mysql_select_db("bx1125_test2");
    
	$tel = htmlspecialchars( $_GET['tel'] );
	$sql = "SELECT resto_id FROM booking  WHERE tel = '$tel' ";
	$result = mysql_query($sql, $db);
 
	while ($row = mysql_fetch_array($result, MYSQL_NUM)) {
		printf ('%s,', $row [0]); 
	}
    
?>
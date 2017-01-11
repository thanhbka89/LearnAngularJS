<?php

for ($i=0; $i < 10; $i++) { 
	$books[$i]['id'] = $i;
	$books[$i]['name'] = 'thanhnm'.$i;
	$books[$i]['author'] = 'thanhbka'.$i;
	$books[$i]['stores'] = [
		['id' => 1, 'name' => 'test1', 'quantity' => 2],
		['id' => 2, 'name' => 'test2', 'quantity' => 3]	
	];
}

$action = $_REQUEST['action'];
$id = isset($_GET['id'])?$_GET['id']:-1;
if($action == 'get'){	
	$book = $books[$id];
	echo json_encode($book);
}else if($action == 'getAll'){
	echo json_encode($books);
}else if ($action == 'update') {
	$book = $books[$id];
	$book['name'] = 'mrthanh'.rand(100);
	echo json_encode($book);
}


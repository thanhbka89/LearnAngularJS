<?php

#sleep(3);

for ($i=0; $i < 10; $i++) { 
	$data[]['author'] = 'Thành Nguyễn '.$i;
	$data[]['email'] = 'thanhbka@yahoo.com'.$i;
	$data[]['success'] = true;
	$data[]['message'] = 'Success!'.$i;
}

echo json_encode($data);
	
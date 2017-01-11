<?php
$errors         = array();
$data 			= array();
#var_dump($_POST);die();
if (empty($_POST['name']))
	$errors['name'] = 'Bạn phải nhập tên vào đây';

if (empty($_POST['email']))
	$errors['email'] = 'Bạn phải nhập email vào đây';
if ( ! empty($errors)) {
	$data['success'] = false;
	$data['errors']  = $errors;
} else {
	$data['success'] = true;
	$data['message'] = 'Success!';
}

echo json_encode($data);
	
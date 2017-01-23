<?php

/**
  * FuseCMS
  *
  * @package fuse-cms
  * @author Bill Gilson (billsonnn)
  */

	require_once "../../_global.php";

	header("Content-type: image/png");

	$png_image	= imagecreatefrompng("habfuse-banner-php.png");

	$text_color	= imagecolorallocate($png_image, 0, 0, 0);
	$text_font	= "../font/volter.ttf";

	$text_string	= System::online_users_count();

	imagettftext($png_image, 7, 0, 363, 86, $text_color, $text_font, $text_string);
	imagepng($png_image);
	imagedestroy($png_image);
?>
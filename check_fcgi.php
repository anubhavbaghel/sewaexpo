<?php
// Simple test to detect FastCGI finish-requests availability
header('Content-Type: text/plain');
echo 'fastcgi_finish_request: ' . (function_exists('fastcgi_finish_request') ? 'YES' : 'NO') . PHP_EOL;
?>

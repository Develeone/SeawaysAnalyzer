<?php
    header("Content-Type: image/png");

    $query = $_SERVER["QUERY_STRING"];


    $curlSession = curl_init();
    curl_setopt($curlSession, CURLOPT_URL, "http://maps.google.com/maps/api/staticmap?".$query);
    curl_setopt($curlSession, CURLOPT_BINARYTRANSFER, true);
    curl_setopt($curlSession, CURLOPT_RETURNTRANSFER, true);

    $data = curl_exec($curlSession);
    curl_close($curlSession);

    echo $data;

<?php
    $input_data = $_FILES["tracking_data"];

    $tracking_items = file($input_data["tmp_name"], FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);

    return ($tracking_items);

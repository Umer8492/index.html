<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $tid = $_POST['TID'];
    $services = $_POST['services'];

    // File Upload Handling
    $uploadDir = "uploads/";  // Folder where files will be stored
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0777, true); // Create folder if it doesn't exist
    }

    $fileName = basename($_FILES["paymentScreenshot"]["name"]);
    $fileTmpPath = $_FILES["paymentScreenshot"]["tmp_name"];
    $fileSize = $_FILES["paymentScreenshot"]["size"];
    $fileType = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));

    $allowedTypes = ["jpg", "jpeg", "png", "gif", "webp"];
    if (!in_array($fileType, $allowedTypes)) {
        die("❌ Only image files (JPG, JPEG, PNG, GIF, WEBP) are allowed.");
    }

    $filePath = $uploadDir . uniqid() . "_" . $fileName;
    move_uploaded_file($fileTmpPath, $filePath);  // Save file in server

    // Email Sending Setup
    $to = "avumcost.com";  // 🔹 Replace this with your email
    $subject = "New Checkout Submission - AVUM COST";
    $message = "✅ New Payment Received! 📩\n\n" .
               "👤 Name: $name\n" .
               "📧 Email: $email\n" .
               "📞 Phone: $phone\n" .
               "🔢 Transaction ID: $tid\n" .
               "🛠 Service: $services\n" .
               "📎 Screenshot: " . $_SERVER['HTTP_HOST'] . "/" . $filePath . "\n\n";

    $headers = "From: noreply@yourwebsite.com";  // Change this to match your domain

    // Send Email
    if (mail($to, $subject, $message, $headers)) {
        echo "✅ Form submitted successfully! We have received your payment details.";
    } else {
        echo "❌ Error: Could not send email.";
    }
}
?>

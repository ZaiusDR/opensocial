def lambda_handler(event, context):
    response = event["Records"][0]["cf"]["response"]
    headers = response["headers"]

    headers["strict-transport-security"] = [
        {
            "key": "Strict-Transport-Security",
            "value": "max-age=31536000; includeSubdomains; preload"
        }
    ]
    headers["x-content-type-options"] = [
        {
            "key": "X-Content-Type-Options",
            "value": "nosniff"
        }
    ]
    headers["x-frame-options"] = [{"key": "X-Frame-Options", "value": "DENY"}]
    headers["x-xss-protection"] = [{"key": "X-XSS-Protection", "value": "1; mode=block"}]
    headers["referrer-policy"] = [{"key": "Referrer-Policy", "value": "same-origin"}]
    headers["permissions-policy"] = [
        {
            "key": "Permissions-Policy",
            "value": ("accelerometer=(), autoplay=(), camera=(), encrypted-media=(), fullscreen=(), "
                      "geolocation=(), gyroscope=(), magnetometer=(), microphone=(), midi=(), "
                      "payment=(), picture-in-picture=(), sync-xhr=(), usb=()")
        }
    ]

    return response

import qrcode

# Data to encode (your hospital page)
data = "http://localhost:5173/hospital"

# Generate QR
qr = qrcode.QRCode(
    version=1,
    error_correction=qrcode.constants.ERROR_CORRECT_H,
    box_size=10,
    border=4,
)

qr.add_data(data)
qr.make(fit=True)

# Create image
img = qr.make_image(fill_color="black", back_color="white")

# Save it
img.save("qr.png")
print("✅ QR Code saved as 'qr.png'")

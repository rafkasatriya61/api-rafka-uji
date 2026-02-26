const { createCanvas } = require("canvas");

module.exports = async function handler(req, res) {
  const text = req.query.text;

  if (!text) {
    return res.status(400).json({ status: false, message: "Parameter 'text' diperlukan." });
  }

  try {
    const size = 500; // Ukuran kotak 500x500
    const canvas = createCanvas(size, size);
    const ctx = canvas.getContext("2d");

    // 1. Gambar Background Hijau Brat
    ctx.fillStyle = "#ffffff"; 
    ctx.fillRect(0, 0, size, size);

    // 2. Konfigurasi Teks
    ctx.fillStyle = "#000000";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // 3. Logika Ukuran Font Otomatis
    let fontSize = 90;
    ctx.font = `bold ${fontSize}px Arial`;

    // Jika teks terlalu lebar, kecilkan font-nya
    while (ctx.measureText(text).width > size - 50 && fontSize > 20) {
      fontSize -= 5;
      ctx.font = `bold ${fontSize}px Arial`;
    }

    // 4. Gambar Teks ke Tengah Kanvas
    ctx.fillText(text, size / 2, size / 2);

    // 5. Kirim sebagai Gambar PNG
    const buffer = canvas.toBuffer("image/png");
    res.setHeader("Content-Type", "image/png");
    res.send(buffer);

  } catch (err) {
    res.status(500).json({ status: false, message: "Gagal me-render gambar: " + err.message });
  }
};
      

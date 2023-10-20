const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


// Ujian Pertama !salah
app.get("/oke/:pil/:f/:m/:a", (req, res) => {

    let pilihan = req.params.pil
    let gaya = req.params.f
    let massa = req.params.m
    let percepatan = req.params.a

    if (pilihan = "f") {
        let hitungf = massa * percepatan
    } else if (pilihan = "m"){
        let hitungm = gaya / percepatan
    } else {
        let hitunga = gaya / massa
    }

    let response = {
        pilihan_anda : pilihan,
        gaya : hitungf,
        massa : hitungm,
        percepatan : hitunga
    }

    res.json(response)
})


// Ujian ke 2 !salah
app.post("/:uk/:kon/:nilai", (req, res) => {
    let ukurana = req.params.uk
    let konversi = req.params.kon

    let nilai = req.params.nilai;

    let hasil = 0;

    if (ukurana === "km" && konversi === "mm") {
        hasil = nilai * 10;
    } else if (ukurana === "hm" && konversi === "mm") {
        hasil = nilai * 20;
    } else if (ukurana === "meter" && konversi === "sentimeter") {
    hasil = nilai * 100;
}

let response = {
    nilai_awal: nilai,
    satuan_awal: ukurana,
    satuan_konversi: konversi,
    hasil_konversi: hasil
}

  res.json(response)
})


// Remid 1
app.get("/hitung2/:ti/:nl", (req, res) => {
  const tipe = req.params.ti;
  const nilai = req.params.nl;

  let result;
  const results = {};
  const sp = {
    kg: 1,
    hg: 10,
    dag: 100,
    g: 1000,
    dg: 10000,
    cg: 100000,
    mg: 1000000,
  };

  if (tipe == "mg") {
    result = nilai / 1000000;
  } else if (tipe == "cg") {
    result = nilai / 100000;
  } else if (tipe == "dg") {
    result = nilai / 10000;
  } else if (tipe == "g") {
    result = nilai / 1000;
  } else if (tipe == "dag") {
    result = nilai / 100;
  } else if (tipe == "hg") {
    result = nilai / 10;
  } else {
    result = nilai;
  }

  for (const p in sp) {
    results[p] = result * sp[p];
  }
  let response = {
    hasil: results,
  };

  res.json(response);
});

// Remid 2
app.post("/hitung2", (req, res) => {
  let soal = req.body.type;
  let var1 = Number(req.body.ni1);
  let var2 = Number(req.body.ni2);
  let hasil = null;
  let response;

  if (soal === "v") {
    hasil = var1 / var2;
    response = {
      Soal: "Mencari kecepatan",
      Jarak: var1 + " meter",
      Waktu: var2 + " detik",
      Hasil: hasil + " m/detik",
    };
  } else if (soal === "s") {
    hasil = var1 * var2;
    response = {
      Soal: "Mencari Jarak",
      Kecepatan: var1 + " m/detik",
      Waktu: var2 + " detik",
      Hasil: hasil + " meter",
    };
  } else if (soal === "t") {
    hasil = var1 / var2;
    response = {
      Soal: "Mencari Waktu",
      Jarak: var1 + " Meter",
      Kecepatan: var2 + " m/detik",
      Hasil: hasil.toFixed(2) + " detik",
    };
  } else {
    response = res.status(400).json({
      error: "tidak ada yang di pilih",
    });
  }

  res.json(response);
});

port = 20;
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});

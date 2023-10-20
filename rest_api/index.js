const express = require("express"); // memanggil library express js
const bodyParser = require("body-parser"); // memanggil library body-parser
const cors = require("cors"); // memanggil library cors
const app = express(); //implementasi express

// penggunaan body-parser untuk ekstrak data request berformat JSON
app.use(bodyParser.json());

// penggunaan body-parser untuk ekstrak data request dari body
app.use(bodyParser.urlencoded({ extended: true }));

// penggunaan cors agar end point dapat diakses oleh cross platform
app.use(cors());

// endpoint "/test" dengan method GET
app.get("/test", (req, res) => {
  // req merupakan variabel yang berisi data request
  // res merupakan variabel yang berisi data response dari end-point

  // membuat objek yang berisi data yang akan dijadikan response
  let response = {
    message: "Ini end-point pertama ku", // menampilkan data
    method: req.method, // menampilkan method
    code: res.statusCode, // menampilkan response code
  };

  // memberikan response dengan format JSON yang berisi objek di atas
  res.json(response);
});

// endpoint "/profil/nama/umur" dengan method GET
app.get("/profil/:name/:age", (req, res) => {
  // :name dan :age 🡪 diberikan titik dua didepan menunjukkan "name" dan "age"
  // bersifat dinamis yang dapat diganti nilai nya saat melakukan request

  // menampung data yang dikirimkan
  let name = req.params.name; // mengambil nilai pada parameter name
  let age = req.params.age; // mengambil nilai pada parameter age

  // membuat objek yang berisi data yang akan dijadikan response
  // response berisi data nama dan umur sesuai dengan nilai parameter
  let response = {
    nama: name,
    umur: age,
  };

  // memberikan response dengan format JSON yang berisi objek di atas
  res.json(response);
});

app.get("/menu/:makanan/:jumlah", (req, res) => {
  let makanan = req.params.makanan;
  let jumlah = req.params.jumlah;

  let response = {
    makanan: makanan,
    jumlah: jumlah,
  };

  res.json(response);
});

app.post("/perpan", (req, res) => {
  // menampung data yang dikirimkan dan mengkonversi menjadi tipe numerik
  let panjang = Number(req.body.panjang); // mengambil nilai panjang dari body
  let lebar = Number(req.body.lebar); // mengamil nilai lebar dari body

  let luas = panjang * lebar;
  let keliling = 2 * (panjang + lebar);

  // membuat objek yang berisi data yang akan dijadikan response
  let response = {
    panjang: panjang,
    lebar: lebar,
    luas: luas,
    keliling: keliling,
  };

  // memberikan response dengan format JSON yang berisi objek di atas
  res.json(response);
});

app.post("/kubus", (req, res) => {
  let rusuk = Number(req.body.rusuk);

  let luas = 6 * (rusuk * rusuk);
  let vol = rusuk * rusuk * rusuk;

  let response = {
    rusuk: rusuk,
    luas: luas,
    volume: vol,
  };

  res.json(response);
});

// app.post("/balok", (req, res) => {
//     let p = Number(req.body.pan)
//     let l = Number(req.body.lua)
//     let t = Number(req.body.tin)

//     let luas = 2*p*l * 2*p*t
// })

app.post("/bmi", (req, res) => {
  let tinggi = Number(req.body.tinggi);
  let berat = Number(req.body.berat);

  if (tinggi < 1.5 || tinggi > 2.0) {
    return res.status(400).json({
      error: 'Tinggi badan harus berada dalam rentang 1.5 hingga 2.0 meter.',
    });
  }

  if (berat < 30 || berat > 200) {
    return res.status(400).json({
      error: 'Berat badan harus berada dalam rentang 30 hingga 200 kilogram.',
    });
  }

  let bmi = berat / tinggi ** 2;
  let status = get_status(bmi);

  let response = {
    tinggi: tinggi,
    berat: berat,
    bmi: bmi,
    status: status,
  };

  function get_status(bmi) {
    if (bmi < 18.5) {
      return "kekurangan berat badan";
    } else if (bmi >= 18.5 && bmi <= 24.9) {
      return "normal / ideal";
    } else if (bmi >= 25 && bmi <= 29.9) {
      return "kelebihan berat badan";
    } else {
      return "kegemukan";
    }
  }

  res.json(response);
});

// app.get("/rumus/convert/:jenis/:nilai", (req, res) => {
//   let jenis = req.params.jenis;
//   let nilai = req.params.nilai;

//   let;
// });

// app.use("/", (req, res, next) => {
//   console.log("Ini adalah middleware");
//   next();
// });

// menjalankan server pada port 8000
app.listen(8000, () => {
  console.log("Server run on port 8000");
});

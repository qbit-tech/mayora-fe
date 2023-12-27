const CITIES = [
    {
        cityId: "1",
        provinceId: "21",
        provinceName: "Nanggroe Aceh Darussalam (NAD)",
        cityName: "Kabupaten Aceh Barat",
        postalCode: "23681",
        areaCode: "655",
        areaCodeDefinedManual: false
    },
    {
        cityId: "2",
        provinceId: "21",
        provinceName: "Nanggroe Aceh Darussalam (NAD)",
        cityName: "Kabupaten Aceh Barat Daya",
        postalCode: "23764",
        areaCode: "659",
        areaCodeDefinedManual: false
    },
    {
        cityId: "3",
        provinceId: "21",
        provinceName: "Nanggroe Aceh Darussalam (NAD)",
        cityName: "Kabupaten Aceh Besar",
        postalCode: "23951",
        areaCode: "651",
        areaCodeDefinedManual: false
    },
    {
        cityId: "4",
        provinceId: "21",
        provinceName: "Nanggroe Aceh Darussalam (NAD)",
        cityName: "Kabupaten Aceh Jaya",
        postalCode: "23654",
        areaCode: "651",
        areaCodeDefinedManual: false
    },
    {
        cityId: "5",
        provinceId: "21",
        provinceName: "Nanggroe Aceh Darussalam (NAD)",
        cityName: "Kabupaten Aceh Selatan",
        postalCode: "23719",
        areaCode: "656",
        areaCodeDefinedManual: false
    },
    {
        cityId: "6",
        provinceId: "21",
        provinceName: "Nanggroe Aceh Darussalam (NAD)",
        cityName: "Kabupaten Aceh Singkil",
        postalCode: "24785",
        areaCode: "658",
        areaCodeDefinedManual: false
    },
    {
        cityId: "7",
        provinceId: "21",
        provinceName: "Nanggroe Aceh Darussalam (NAD)",
        cityName: "Kabupaten Aceh Tamiang",
        postalCode: "24476",
        areaCode: "641",
        areaCodeDefinedManual: false
    },
    {
        cityId: "8",
        provinceId: "21",
        provinceName: "Nanggroe Aceh Darussalam (NAD)",
        cityName: "Kabupaten Aceh Tengah",
        postalCode: "24511",
        areaCode: "643",
        areaCodeDefinedManual: false
    },
    {
        cityId: "9",
        provinceId: "21",
        provinceName: "Nanggroe Aceh Darussalam (NAD)",
        cityName: "Kabupaten Aceh Tenggara",
        postalCode: "24611",
        areaCode: "629",
        areaCodeDefinedManual: false
    },
    {
        cityId: "10",
        provinceId: "21",
        provinceName: "Nanggroe Aceh Darussalam (NAD)",
        cityName: "Kabupaten Aceh Timur",
        postalCode: "24454",
        areaCode: "646",
        areaCodeDefinedManual: false
    },
    {
        cityId: "11",
        provinceId: "21",
        provinceName: "Nanggroe Aceh Darussalam (NAD)",
        cityName: "Kabupaten Aceh Utara",
        postalCode: "24382",
        areaCode: "645",
        areaCodeDefinedManual: false
    },
    {
        cityId: "12",
        provinceId: "32",
        provinceName: "Sumatera Barat",
        cityName: "Kabupaten Agam",
        postalCode: "26411",
        areaCode: "752",
        areaCodeDefinedManual: false
    },
    {
        cityId: "13",
        provinceId: "23",
        provinceName: "Nusa Tenggara Timur (NTT)",
        cityName: "Kabupaten Alor",
        postalCode: "85811",
        areaCode: "386",
        areaCodeDefinedManual: false
    },
    {
        cityId: "14",
        provinceId: "19",
        provinceName: "Maluku",
        cityName: "Kota Ambon",
        postalCode: "97222",
        areaCode: "911",
        areaCodeDefinedManual: false
    },
    {
        cityId: "15",
        provinceId: "34",
        provinceName: "Sumatera Utara",
        cityName: "Kabupaten Asahan",
        postalCode: "21214",
        areaCode: "623",
        areaCodeDefinedManual: false
    },
    {
        cityId: "16",
        provinceId: "24",
        provinceName: "Papua",
        cityName: "Kabupaten Asmat",
        postalCode: "99777",
        areaCode: "902",
        areaCodeDefinedManual: false
    },
    {
        cityId: "17",
        provinceId: "1",
        provinceName: "Bali",
        cityName: "Kabupaten Badung",
        postalCode: "80351",
        areaCode: "361",
        areaCodeDefinedManual: false
    },
    {
        cityId: "18",
        provinceId: "13",
        provinceName: "Kalimantan Selatan",
        cityName: "Kabupaten Balangan",
        postalCode: "71611",
        areaCode: "526",
        areaCodeDefinedManual: false
    },
    {
        cityId: "19",
        provinceId: "15",
        provinceName: "Kalimantan Timur",
        cityName: "Kota Balikpapan",
        postalCode: "76111",
        areaCode: "542",
        areaCodeDefinedManual: false
    },
    {
        cityId: "20",
        provinceId: "21",
        provinceName: "Nanggroe Aceh Darussalam (NAD)",
        cityName: "Kota Banda Aceh",
        postalCode: "23238",
        areaCode: "651",
        areaCodeDefinedManual: false
    },
    {
        cityId: "21",
        provinceId: "18",
        provinceName: "Lampung",
        cityName: "Kota Bandar Lampung",
        postalCode: "35139",
        areaCode: "721",
        areaCodeDefinedManual: false
    },
    {
        cityId: "22",
        provinceId: "9",
        provinceName: "Jawa Barat",
        cityName: "Kabupaten Bandung",
        postalCode: "40311",
        areaCode: "22",
        areaCodeDefinedManual: false
    },
    {
        cityId: "23",
        provinceId: "9",
        provinceName: "Jawa Barat",
        cityName: "Kota Bandung",
        postalCode: "40111",
        areaCode: "22",
        areaCodeDefinedManual: false
    },
    {
        cityId: "24",
        provinceId: "9",
        provinceName: "Jawa Barat",
        cityName: "Kabupaten Bandung Barat",
        postalCode: "40721",
        areaCode: "22",
        areaCodeDefinedManual: false
    },
    {
        cityId: "25",
        provinceId: "29",
        provinceName: "Sulawesi Tengah",
        cityName: "Kabupaten Banggai",
        postalCode: "94711",
        areaCode: "462",
        areaCodeDefinedManual: false
    },
    {
        cityId: "26",
        provinceId: "29",
        provinceName: "Sulawesi Tengah",
        cityName: "Kabupaten Banggai Kepulauan",
        postalCode: "94881",
        areaCode: "462",
        areaCodeDefinedManual: false
    },
    {
        cityId: "27",
        provinceId: "2",
        provinceName: "Bangka Belitung",
        cityName: "Kabupaten Bangka",
        postalCode: "33212",
        areaCode: "715",
        areaCodeDefinedManual: false
    },
    {
        cityId: "28",
        provinceId: "2",
        provinceName: "Bangka Belitung",
        cityName: "Kabupaten Bangka Barat",
        postalCode: "33315",
        areaCode: "716",
        areaCodeDefinedManual: false
    },
    {
        cityId: "29",
        provinceId: "2",
        provinceName: "Bangka Belitung",
        cityName: "Kabupaten Bangka Selatan",
        postalCode: "33719",
        areaCode: "718",
        areaCodeDefinedManual: false
    },
    {
        cityId: "30",
        provinceId: "2",
        provinceName: "Bangka Belitung",
        cityName: "Kabupaten Bangka Tengah",
        postalCode: "33613",
        areaCode: "718",
        areaCodeDefinedManual: false
    },
    {
        cityId: "31",
        provinceId: "11",
        provinceName: "Jawa Timur",
        cityName: "Kabupaten Bangkalan",
        postalCode: "69118",
        areaCode: "31",
        areaCodeDefinedManual: false
    },
    {
        cityId: "32",
        provinceId: "1",
        provinceName: "Bali",
        cityName: "Kabupaten Bangli",
        postalCode: "80619",
        areaCode: "366",
        areaCodeDefinedManual: false
    },
    {
        cityId: "33",
        provinceId: "13",
        provinceName: "Kalimantan Selatan",
        cityName: "Kabupaten Banjar",
        postalCode: "70619",
        areaCode: "511",
        areaCodeDefinedManual: false
    },
    {
        cityId: "34",
        provinceId: "9",
        provinceName: "Jawa Barat",
        cityName: "Kota Banjar",
        postalCode: "46311",
        areaCode: "265",
        areaCodeDefinedManual: false
    },
    {
        cityId: "35",
        provinceId: "13",
        provinceName: "Kalimantan Selatan",
        cityName: "Kota Banjarbaru",
        postalCode: "70712",
        areaCode: "511",
        areaCodeDefinedManual: false
    },
    {
        cityId: "36",
        provinceId: "13",
        provinceName: "Kalimantan Selatan",
        cityName: "Kota Banjarmasin",
        postalCode: "70117",
        areaCode: "511",
        areaCodeDefinedManual: false
    },
    {
        cityId: "37",
        provinceId: "10",
        provinceName: "Jawa Tengah",
        cityName: "Kabupaten Banjarnegara",
        postalCode: "53419",
        areaCode: "286",
        areaCodeDefinedManual: false
    },
    {
        cityId: "38",
        provinceId: "28",
        provinceName: "Sulawesi Selatan",
        cityName: "Kabupaten Bantaeng",
        postalCode: "92411",
        areaCode: "413",
        areaCodeDefinedManual: false
    },
    {
        cityId: "39",
        provinceId: "5",
        provinceName: "DI Yogyakarta",
        cityName: "Kabupaten Bantul",
        postalCode: "55715",
        areaCode: "274",
        areaCodeDefinedManual: false
    },
    {
        cityId: "40",
        provinceId: "33",
        provinceName: "Sumatera Selatan",
        cityName: "Kabupaten Banyuasin",
        postalCode: "30911",
        areaCode: "711",
        areaCodeDefinedManual: false
    },
    {
        cityId: "41",
        provinceId: "10",
        provinceName: "Jawa Tengah",
        cityName: "Kabupaten Banyumas",
        postalCode: "53114",
        areaCode: "281",
        areaCodeDefinedManual: false
    },
    {
        cityId: "42",
        provinceId: "11",
        provinceName: "Jawa Timur",
        cityName: "Kabupaten Banyuwangi",
        postalCode: "68416",
        areaCode: "333",
        areaCodeDefinedManual: false
    },
    {
        cityId: "43",
        provinceId: "13",
        provinceName: "Kalimantan Selatan",
        cityName: "Kabupaten Barito Kuala",
        postalCode: "70511",
        areaCode: "511",
        areaCodeDefinedManual: false
    },
    {
        cityId: "44",
        provinceId: "14",
        provinceName: "Kalimantan Tengah",
        cityName: "Kabupaten Barito Selatan",
        postalCode: "73711",
        areaCode: "525",
        areaCodeDefinedManual: false
    },
    {
        cityId: "45",
        provinceId: "14",
        provinceName: "Kalimantan Tengah",
        cityName: "Kabupaten Barito Timur",
        postalCode: "73671",
        areaCode: "526",
        areaCodeDefinedManual: false
    },
    {
        cityId: "46",
        provinceId: "14",
        provinceName: "Kalimantan Tengah",
        cityName: "Kabupaten Barito Utara",
        postalCode: "73881",
        areaCode: "519",
        areaCodeDefinedManual: false
    },
    {
        cityId: "47",
        provinceId: "28",
        provinceName: "Sulawesi Selatan",
        cityName: "Kabupaten Barru",
        postalCode: "90719",
        areaCode: "427",
        areaCodeDefinedManual: false
    },
    {
        cityId: "48",
        provinceId: "17",
        provinceName: "Kepulauan Riau",
        cityName: "Kota Batam",
        postalCode: "29413",
        areaCode: "770",
        areaCodeDefinedManual: false
    },
    {
        cityId: "49",
        provinceId: "10",
        provinceName: "Jawa Tengah",
        cityName: "Kabupaten Batang",
        postalCode: "51211",
        areaCode: "285",
        areaCodeDefinedManual: false
    },
    {
        cityId: "50",
        provinceId: "8",
        provinceName: "Jambi",
        cityName: "Kabupaten Batang Hari",
        postalCode: "36613",
        areaCode: "743",
        areaCodeDefinedManual: false
    },
    {
        cityId: "51",
        provinceId: "11",
        provinceName: "Jawa Timur",
        cityName: "Kota Batu",
        postalCode: "65311",
        areaCode: "341",
        areaCodeDefinedManual: false
    },
    {
        cityId: "52",
        provinceId: "34",
        provinceName: "Sumatera Utara",
        cityName: "Kabupaten Batu Bara",
        postalCode: "21655",
        areaCode: "622",
        areaCodeDefinedManual: false
    },
    {
        cityId: "53",
        provinceId: "30",
        provinceName: "Sulawesi Tenggara",
        cityName: "Kota Bau-Bau",
        postalCode: "93719",
        areaCode: "402",
        areaCodeDefinedManual: false
    },
    {
        cityId: "54",
        provinceId: "9",
        provinceName: "Jawa Barat",
        cityName: "Kabupaten Bekasi",
        postalCode: "17837",
        areaCode: "21",
        areaCodeDefinedManual: false
    },
    {
        cityId: "55",
        provinceId: "9",
        provinceName: "Jawa Barat",
        cityName: "Kota Bekasi",
        postalCode: "17121",
        areaCode: "21",
        areaCodeDefinedManual: false
    },
    {
        cityId: "56",
        provinceId: "2",
        provinceName: "Bangka Belitung",
        cityName: "Kabupaten Belitung",
        postalCode: "33419",
        areaCode: "719",
        areaCodeDefinedManual: false
    },
    {
        cityId: "57",
        provinceId: "2",
        provinceName: "Bangka Belitung",
        cityName: "Kabupaten Belitung Timur",
        postalCode: "33519",
        areaCode: "719",
        areaCodeDefinedManual: false
    },
    {
        cityId: "58",
        provinceId: "23",
        provinceName: "Nusa Tenggara Timur (NTT)",
        cityName: "Kabupaten Belu",
        postalCode: "85711",
        areaCode: "389",
        areaCodeDefinedManual: false
    },
    {
        cityId: "59",
        provinceId: "21",
        provinceName: "Nanggroe Aceh Darussalam (NAD)",
        cityName: "Kabupaten Bener Meriah",
        postalCode: "24581",
        areaCode: "643",
        areaCodeDefinedManual: false
    },
    {
        cityId: "60",
        provinceId: "26",
        provinceName: "Riau",
        cityName: "Kabupaten Bengkalis",
        postalCode: "28719",
        areaCode: "765",
        areaCodeDefinedManual: false
    },
    {
        cityId: "61",
        provinceId: "12",
        provinceName: "Kalimantan Barat",
        cityName: "Kabupaten Bengkayang",
        postalCode: "79213",
        areaCode: "562",
        areaCodeDefinedManual: false
    },
    {
        cityId: "62",
        provinceId: "4",
        provinceName: "Bengkulu",
        cityName: "Kota Bengkulu",
        postalCode: "38229",
        areaCode: "736",
        areaCodeDefinedManual: false
    },
    {
        cityId: "63",
        provinceId: "4",
        provinceName: "Bengkulu",
        cityName: "Kabupaten Bengkulu Selatan",
        postalCode: "38519",
        areaCode: "739",
        areaCodeDefinedManual: false
    },
    {
        cityId: "64",
        provinceId: "4",
        provinceName: "Bengkulu",
        cityName: "Kabupaten Bengkulu Tengah",
        postalCode: "38319",
        areaCode: "736",
        areaCodeDefinedManual: false
    },
    {
        cityId: "65",
        provinceId: "4",
        provinceName: "Bengkulu",
        cityName: "Kabupaten Bengkulu Utara",
        postalCode: "38619",
        areaCode: "736",
        areaCodeDefinedManual: false
    },
    {
        cityId: "66",
        provinceId: "15",
        provinceName: "Kalimantan Timur",
        cityName: "Kabupaten Berau",
        postalCode: "77311",
        areaCode: "554",
        areaCodeDefinedManual: false
    },
    {
        cityId: "67",
        provinceId: "24",
        provinceName: "Papua",
        cityName: "Kabupaten Biak Numfor",
        postalCode: "98119",
        areaCode: "981",
        areaCodeDefinedManual: false
    },
    {
        cityId: "68",
        provinceId: "22",
        provinceName: "Nusa Tenggara Barat (NTB)",
        cityName: "Kabupaten Bima",
        postalCode: "84171",
        areaCode: "374",
        areaCodeDefinedManual: false
    },
    {
        cityId: "69",
        provinceId: "22",
        provinceName: "Nusa Tenggara Barat (NTB)",
        cityName: "Kota Bima",
        postalCode: "84139",
        areaCode: "374",
        areaCodeDefinedManual: false
    },
    {
        cityId: "70",
        provinceId: "34",
        provinceName: "Sumatera Utara",
        cityName: "Kota Binjai",
        postalCode: "20712",
        areaCode: "61",
        areaCodeDefinedManual: false
    },
    {
        cityId: "71",
        provinceId: "17",
        provinceName: "Kepulauan Riau",
        cityName: "Kabupaten Bintan",
        postalCode: "29135",
        areaCode: "771",
        areaCodeDefinedManual: false
    },
    {
        cityId: "72",
        provinceId: "21",
        provinceName: "Nanggroe Aceh Darussalam (NAD)",
        cityName: "Kabupaten Bireuen",
        postalCode: "24219",
        areaCode: "644",
        areaCodeDefinedManual: false
    },
    {
        cityId: "73",
        provinceId: "31",
        provinceName: "Sulawesi Utara",
        cityName: "Kota Bitung",
        postalCode: "95512",
        areaCode: "438",
        areaCodeDefinedManual: false
    },
    {
        cityId: "74",
        provinceId: "11",
        provinceName: "Jawa Timur",
        cityName: "Kabupaten Blitar",
        postalCode: "66171",
        areaCode: "342",
        areaCodeDefinedManual: false
    },
    {
        cityId: "75",
        provinceId: "11",
        provinceName: "Jawa Timur",
        cityName: "Kota Blitar",
        postalCode: "66124",
        areaCode: "342",
        areaCodeDefinedManual: false
    },
    {
        cityId: "76",
        provinceId: "10",
        provinceName: "Jawa Tengah",
        cityName: "Kabupaten Blora",
        postalCode: "58219",
        areaCode: "296",
        areaCodeDefinedManual: false
    },
    {
        cityId: "77",
        provinceId: "7",
        provinceName: "Gorontalo",
        cityName: "Kabupaten Boalemo",
        postalCode: "96319",
        areaCode: "443",
        areaCodeDefinedManual: false
    },
    {
        cityId: "78",
        provinceId: "9",
        provinceName: "Jawa Barat",
        cityName: "Kabupaten Bogor",
        postalCode: "16911",
        areaCode: "21",
        areaCodeDefinedManual: false
    },
    {
        cityId: "79",
        provinceId: "9",
        provinceName: "Jawa Barat",
        cityName: "Kota Bogor",
        postalCode: "16119",
        areaCode: "251",
        areaCodeDefinedManual: false
    },
    {
        cityId: "80",
        provinceId: "11",
        provinceName: "Jawa Timur",
        cityName: "Kabupaten Bojonegoro",
        postalCode: "62119",
        areaCode: "353",
        areaCodeDefinedManual: false
    },
    {
        cityId: "81",
        provinceId: "31",
        provinceName: "Sulawesi Utara",
        cityName: "Kabupaten Bolaang Mongondow (Bolmong)",
        postalCode: "95755",
        areaCode: "434",
        areaCodeDefinedManual: false
    },
    {
        cityId: "82",
        provinceId: "31",
        provinceName: "Sulawesi Utara",
        cityName: "Kabupaten Bolaang Mongondow Selatan",
        postalCode: "95774",
        areaCode: "434",
        areaCodeDefinedManual: false
    },
    {
        cityId: "83",
        provinceId: "31",
        provinceName: "Sulawesi Utara",
        cityName: "Kabupaten Bolaang Mongondow Timur",
        postalCode: "95783",
        areaCode: "434",
        areaCodeDefinedManual: true
    },
    {
        cityId: "84",
        provinceId: "31",
        provinceName: "Sulawesi Utara",
        cityName: "Kabupaten Bolaang Mongondow Utara",
        postalCode: "95765",
        areaCode: "434",
        areaCodeDefinedManual: false
    },
    {
        cityId: "85",
        provinceId: "30",
        provinceName: "Sulawesi Tenggara",
        cityName: "Kabupaten Bombana",
        postalCode: "93771",
        areaCode: "405",
        areaCodeDefinedManual: true
    },
    {
        cityId: "86",
        provinceId: "11",
        provinceName: "Jawa Timur",
        cityName: "Kabupaten Bondowoso",
        postalCode: "68219",
        areaCode: "332",
        areaCodeDefinedManual: false
    },
    {
        cityId: "87",
        provinceId: "28",
        provinceName: "Sulawesi Selatan",
        cityName: "Kabupaten Bone",
        postalCode: "92713",
        areaCode: "481",
        areaCodeDefinedManual: false
    },
    {
        cityId: "88",
        provinceId: "7",
        provinceName: "Gorontalo",
        cityName: "Kabupaten Bone Bolango",
        postalCode: "96511",
        areaCode: "435",
        areaCodeDefinedManual: false
    },
    {
        cityId: "89",
        provinceId: "15",
        provinceName: "Kalimantan Timur",
        cityName: "Kota Bontang",
        postalCode: "75313",
        areaCode: "548",
        areaCodeDefinedManual: false
    },
    {
        cityId: "90",
        provinceId: "24",
        provinceName: "Papua",
        cityName: "Kabupaten Boven Digoel",
        postalCode: "99662",
        areaCode: "975",
        areaCodeDefinedManual: false
    },
    {
        cityId: "91",
        provinceId: "10",
        provinceName: "Jawa Tengah",
        cityName: "Kabupaten Boyolali",
        postalCode: "57312",
        areaCode: "271",
        areaCodeDefinedManual: false
    },
    {
        cityId: "92",
        provinceId: "10",
        provinceName: "Jawa Tengah",
        cityName: "Kabupaten Brebes",
        postalCode: "52212",
        areaCode: "283",
        areaCodeDefinedManual: false
    },
    {
        cityId: "93",
        provinceId: "32",
        provinceName: "Sumatera Barat",
        cityName: "Kota Bukittinggi",
        postalCode: "26115",
        areaCode: "752",
        areaCodeDefinedManual: false
    },
    {
        cityId: "94",
        provinceId: "1",
        provinceName: "Bali",
        cityName: "Kabupaten Buleleng",
        postalCode: "81111",
        areaCode: "362",
        areaCodeDefinedManual: false
    },
    {
        cityId: "95",
        provinceId: "28",
        provinceName: "Sulawesi Selatan",
        cityName: "Kabupaten Bulukumba",
        postalCode: "92511",
        areaCode: "413",
        areaCodeDefinedManual: false
    },
    {
        cityId: "96",
        provinceId: "16",
        provinceName: "Kalimantan Utara",
        cityName: "Kabupaten Bulungan (Bulongan)",
        postalCode: "77211",
        areaCode: "552",
        areaCodeDefinedManual: false
    },
    {
        cityId: "97",
        provinceId: "8",
        provinceName: "Jambi",
        cityName: "Kabupaten Bungo",
        postalCode: "37216",
        areaCode: "747",
        areaCodeDefinedManual: false
    },
    {
        cityId: "98",
        provinceId: "29",
        provinceName: "Sulawesi Tengah",
        cityName: "Kabupaten Buol",
        postalCode: "94564",
        areaCode: "445",
        areaCodeDefinedManual: false
    },
    {
        cityId: "99",
        provinceId: "19",
        provinceName: "Maluku",
        cityName: "Kabupaten Buru",
        postalCode: "97371",
        areaCode: "913",
        areaCodeDefinedManual: false
    },
    {
        cityId: "100",
        provinceId: "19",
        provinceName: "Maluku",
        cityName: "Kabupaten Buru Selatan",
        postalCode: "97351",
        areaCode: "913",
        areaCodeDefinedManual: false
    },
    {
        cityId: "101",
        provinceId: "30",
        provinceName: "Sulawesi Tenggara",
        cityName: "Kabupaten Buton",
        postalCode: "93754",
        areaCode: "402",
        areaCodeDefinedManual: false
    },
    {
        cityId: "102",
        provinceId: "30",
        provinceName: "Sulawesi Tenggara",
        cityName: "Kabupaten Buton Utara",
        postalCode: "93745",
        areaCode: "402",
        areaCodeDefinedManual: false
    },
    {
        cityId: "103",
        provinceId: "9",
        provinceName: "Jawa Barat",
        cityName: "Kabupaten Ciamis",
        postalCode: "46211",
        areaCode: "265",
        areaCodeDefinedManual: false
    },
    {
        cityId: "104",
        provinceId: "9",
        provinceName: "Jawa Barat",
        cityName: "Kabupaten Cianjur",
        postalCode: "43217",
        areaCode: "263",
        areaCodeDefinedManual: false
    },
    {
        cityId: "105",
        provinceId: "10",
        provinceName: "Jawa Tengah",
        cityName: "Kabupaten Cilacap",
        postalCode: "53211",
        areaCode: "280",
        areaCodeDefinedManual: false
    },
    {
        cityId: "106",
        provinceId: "3",
        provinceName: "Banten",
        cityName: "Kota Cilegon",
        postalCode: "42417",
        areaCode: "254",
        areaCodeDefinedManual: false
    },
    {
        cityId: "107",
        provinceId: "9",
        provinceName: "Jawa Barat",
        cityName: "Kota Cimahi",
        postalCode: "40512",
        areaCode: "22",
        areaCodeDefinedManual: false
    },
    {
        cityId: "108",
        provinceId: "9",
        provinceName: "Jawa Barat",
        cityName: "Kabupaten Cirebon",
        postalCode: "45611",
        areaCode: "231",
        areaCodeDefinedManual: false
    },
    {
        cityId: "109",
        provinceId: "9",
        provinceName: "Jawa Barat",
        cityName: "Kota Cirebon",
        postalCode: "45116",
        areaCode: "231",
        areaCodeDefinedManual: false
    },
    {
        cityId: "110",
        provinceId: "34",
        provinceName: "Sumatera Utara",
        cityName: "Kabupaten Dairi",
        postalCode: "22211",
        areaCode: "627",
        areaCodeDefinedManual: false
    },
    {
        cityId: "111",
        provinceId: "24",
        provinceName: "Papua",
        cityName: "Kabupaten Deiyai (Deliyai)",
        postalCode: "98784",
        areaCode: "901",
        areaCodeDefinedManual: true
    },
    {
        cityId: "112",
        provinceId: "34",
        provinceName: "Sumatera Utara",
        cityName: "Kabupaten Deli Serdang",
        postalCode: "20511",
        areaCode: "61",
        areaCodeDefinedManual: false
    },
    {
        cityId: "113",
        provinceId: "10",
        provinceName: "Jawa Tengah",
        cityName: "Kabupaten Demak",
        postalCode: "59519",
        areaCode: "24",
        areaCodeDefinedManual: false
    },
    {
        cityId: "114",
        provinceId: "1",
        provinceName: "Bali",
        cityName: "Kota Denpasar",
        postalCode: "80227",
        areaCode: "361",
        areaCodeDefinedManual: false
    },
    {
        cityId: "115",
        provinceId: "9",
        provinceName: "Jawa Barat",
        cityName: "Kota Depok",
        postalCode: "16416",
        areaCode: "21",
        areaCodeDefinedManual: false
    },
    {
        cityId: "116",
        provinceId: "32",
        provinceName: "Sumatera Barat",
        cityName: "Kabupaten Dharmasraya",
        postalCode: "27612",
        areaCode: "754",
        areaCodeDefinedManual: false
    },
    {
        cityId: "117",
        provinceId: "24",
        provinceName: "Papua",
        cityName: "Kabupaten Dogiyai",
        postalCode: "98866",
        areaCode: "901",
        areaCodeDefinedManual: true
    },
    {
        cityId: "118",
        provinceId: "22",
        provinceName: "Nusa Tenggara Barat (NTB)",
        cityName: "Kabupaten Dompu",
        postalCode: "84217",
        areaCode: "373",
        areaCodeDefinedManual: false
    },
    {
        cityId: "119",
        provinceId: "29",
        provinceName: "Sulawesi Tengah",
        cityName: "Kabupaten Donggala",
        postalCode: "94341",
        areaCode: "457",
        areaCodeDefinedManual: false
    },
    {
        cityId: "120",
        provinceId: "26",
        provinceName: "Riau",
        cityName: "Kota Dumai",
        postalCode: "28811",
        areaCode: "765",
        areaCodeDefinedManual: false
    },
    {
        cityId: "121",
        provinceId: "33",
        provinceName: "Sumatera Selatan",
        cityName: "Kabupaten Empat Lawang",
        postalCode: "31811",
        areaCode: "702",
        areaCodeDefinedManual: false
    },
    {
        cityId: "122",
        provinceId: "23",
        provinceName: "Nusa Tenggara Timur (NTT)",
        cityName: "Kabupaten Ende",
        postalCode: "86351",
        areaCode: "381",
        areaCodeDefinedManual: false
    },
    {
        cityId: "123",
        provinceId: "28",
        provinceName: "Sulawesi Selatan",
        cityName: "Kabupaten Enrekang",
        postalCode: "91719",
        areaCode: "420",
        areaCodeDefinedManual: false
    },
    {
        cityId: "124",
        provinceId: "25",
        provinceName: "Papua Barat",
        cityName: "Kabupaten Fakfak",
        postalCode: "98651",
        areaCode: "956",
        areaCodeDefinedManual: false
    },
    {
        cityId: "125",
        provinceId: "23",
        provinceName: "Nusa Tenggara Timur (NTT)",
        cityName: "Kabupaten Flores Timur",
        postalCode: "86213",
        areaCode: "383",
        areaCodeDefinedManual: false
    },
    {
        cityId: "126",
        provinceId: "9",
        provinceName: "Jawa Barat",
        cityName: "Kabupaten Garut",
        postalCode: "44126",
        areaCode: "262",
        areaCodeDefinedManual: false
    },
    {
        cityId: "127",
        provinceId: "21",
        provinceName: "Nanggroe Aceh Darussalam (NAD)",
        cityName: "Kabupaten Gayo Lues",
        postalCode: "24653",
        areaCode: "642",
        areaCodeDefinedManual: false
    },
    {
        cityId: "128",
        provinceId: "1",
        provinceName: "Bali",
        cityName: "Kabupaten Gianyar",
        postalCode: "80519",
        areaCode: "361",
        areaCodeDefinedManual: false
    },
    {
        cityId: "129",
        provinceId: "7",
        provinceName: "Gorontalo",
        cityName: "Kabupaten Gorontalo",
        postalCode: "96218",
        areaCode: "435",
        areaCodeDefinedManual: false
    },
    {
        cityId: "130",
        provinceId: "7",
        provinceName: "Gorontalo",
        cityName: "Kota Gorontalo",
        postalCode: "96115",
        areaCode: "435",
        areaCodeDefinedManual: false
    },
    {
        cityId: "131",
        provinceId: "7",
        provinceName: "Gorontalo",
        cityName: "Kabupaten Gorontalo Utara",
        postalCode: "96611",
        areaCode: "442",
        areaCodeDefinedManual: false
    },
    {
        cityId: "132",
        provinceId: "28",
        provinceName: "Sulawesi Selatan",
        cityName: "Kabupaten Gowa",
        postalCode: "92111",
        areaCode: "411",
        areaCodeDefinedManual: false
    },
    {
        cityId: "133",
        provinceId: "11",
        provinceName: "Jawa Timur",
        cityName: "Kabupaten Gresik",
        postalCode: "61115",
        areaCode: "31",
        areaCodeDefinedManual: false
    },
    {
        cityId: "134",
        provinceId: "10",
        provinceName: "Jawa Tengah",
        cityName: "Kabupaten Grobogan",
        postalCode: "58111",
        areaCode: "292",
        areaCodeDefinedManual: false
    },
    {
        cityId: "135",
        provinceId: "5",
        provinceName: "DI Yogyakarta",
        cityName: "Kabupaten Gunung Kidul",
        postalCode: "55812",
        areaCode: "274",
        areaCodeDefinedManual: false
    },
    {
        cityId: "136",
        provinceId: "14",
        provinceName: "Kalimantan Tengah",
        cityName: "Kabupaten Gunung Mas",
        postalCode: "74511",
        areaCode: "537",
        areaCodeDefinedManual: false
    },
    {
        cityId: "137",
        provinceId: "34",
        provinceName: "Sumatera Utara",
        cityName: "Kota Gunungsitoli",
        postalCode: "22813",
        areaCode: "639",
        areaCodeDefinedManual: false
    },
    {
        cityId: "138",
        provinceId: "20",
        provinceName: "Maluku Utara",
        cityName: "Kabupaten Halmahera Barat",
        postalCode: "97757",
        areaCode: "922",
        areaCodeDefinedManual: false
    },
    {
        cityId: "139",
        provinceId: "20",
        provinceName: "Maluku Utara",
        cityName: "Kabupaten Halmahera Selatan",
        postalCode: "97911",
        areaCode: "927",
        areaCodeDefinedManual: false
    },
    {
        cityId: "140",
        provinceId: "20",
        provinceName: "Maluku Utara",
        cityName: "Kabupaten Halmahera Tengah",
        postalCode: "97853",
        areaCode: "922",
        areaCodeDefinedManual: false
    },
    {
        cityId: "141",
        provinceId: "20",
        provinceName: "Maluku Utara",
        cityName: "Kabupaten Halmahera Timur",
        postalCode: "97862",
        areaCode: "922",
        areaCodeDefinedManual: false
    },
    {
        cityId: "142",
        provinceId: "20",
        provinceName: "Maluku Utara",
        cityName: "Kabupaten Halmahera Utara",
        postalCode: "97762",
        areaCode: "924",
        areaCodeDefinedManual: false
    },
    {
        cityId: "143",
        provinceId: "13",
        provinceName: "Kalimantan Selatan",
        cityName: "Kabupaten Hulu Sungai Selatan",
        postalCode: "71212",
        areaCode: "517",
        areaCodeDefinedManual: false
    },
    {
        cityId: "144",
        provinceId: "13",
        provinceName: "Kalimantan Selatan",
        cityName: "Kabupaten Hulu Sungai Tengah",
        postalCode: "71313",
        areaCode: "517",
        areaCodeDefinedManual: false
    },
    {
        cityId: "145",
        provinceId: "13",
        provinceName: "Kalimantan Selatan",
        cityName: "Kabupaten Hulu Sungai Utara",
        postalCode: "71419",
        areaCode: "527",
        areaCodeDefinedManual: false
    },
    {
        cityId: "146",
        provinceId: "34",
        provinceName: "Sumatera Utara",
        cityName: "Kabupaten Humbang Hasundutan",
        postalCode: "22457",
        areaCode: "633",
        areaCodeDefinedManual: false
    },
    {
        cityId: "147",
        provinceId: "26",
        provinceName: "Riau",
        cityName: "Kabupaten Indragiri Hilir",
        postalCode: "29212",
        areaCode: "768",
        areaCodeDefinedManual: false
    },
    {
        cityId: "148",
        provinceId: "26",
        provinceName: "Riau",
        cityName: "Kabupaten Indragiri Hulu",
        postalCode: "29319",
        areaCode: "769",
        areaCodeDefinedManual: false
    },
    {
        cityId: "149",
        provinceId: "9",
        provinceName: "Jawa Barat",
        cityName: "Kabupaten Indramayu",
        postalCode: "45214",
        areaCode: "234",
        areaCodeDefinedManual: false
    },
    {
        cityId: "150",
        provinceId: "24",
        provinceName: "Papua",
        cityName: "Kabupaten Intan Jaya",
        postalCode: "98771",
        areaCode: "901",
        areaCodeDefinedManual: true
    },
    {
        cityId: "151",
        provinceId: "6",
        provinceName: "DKI Jakarta",
        cityName: "Kota Jakarta Barat",
        postalCode: "11220",
        areaCode: "21",
        areaCodeDefinedManual: false
    },
    {
        cityId: "152",
        provinceId: "6",
        provinceName: "DKI Jakarta",
        cityName: "Kota Jakarta Pusat",
        postalCode: "10540",
        areaCode: "21",
        areaCodeDefinedManual: false
    },
    {
        cityId: "153",
        provinceId: "6",
        provinceName: "DKI Jakarta",
        cityName: "Kota Jakarta Selatan",
        postalCode: "12230",
        areaCode: "21",
        areaCodeDefinedManual: false
    },
    {
        cityId: "154",
        provinceId: "6",
        provinceName: "DKI Jakarta",
        cityName: "Kota Jakarta Timur",
        postalCode: "13330",
        areaCode: "21",
        areaCodeDefinedManual: false
    },
    {
        cityId: "155",
        provinceId: "6",
        provinceName: "DKI Jakarta",
        cityName: "Kota Jakarta Utara",
        postalCode: "14140",
        areaCode: "21",
        areaCodeDefinedManual: false
    },
    {
        cityId: "156",
        provinceId: "8",
        provinceName: "Jambi",
        cityName: "Kota Jambi",
        postalCode: "36111",
        areaCode: "741",
        areaCodeDefinedManual: false
    },
    {
        cityId: "157",
        provinceId: "24",
        provinceName: "Papua",
        cityName: "Kabupaten Jayapura",
        postalCode: "99352",
        areaCode: "967",
        areaCodeDefinedManual: false
    },
    {
        cityId: "158",
        provinceId: "24",
        provinceName: "Papua",
        cityName: "Kota Jayapura",
        postalCode: "99114",
        areaCode: "967",
        areaCodeDefinedManual: false
    },
    {
        cityId: "159",
        provinceId: "24",
        provinceName: "Papua",
        cityName: "Kabupaten Jayawijaya",
        postalCode: "99511",
        areaCode: "901",
        areaCodeDefinedManual: true
    },
    {
        cityId: "160",
        provinceId: "11",
        provinceName: "Jawa Timur",
        cityName: "Kabupaten Jember",
        postalCode: "68113",
        areaCode: "331",
        areaCodeDefinedManual: false
    },
    {
        cityId: "161",
        provinceId: "1",
        provinceName: "Bali",
        cityName: "Kabupaten Jembrana",
        postalCode: "82251",
        areaCode: "365",
        areaCodeDefinedManual: false
    },
    {
        cityId: "162",
        provinceId: "28",
        provinceName: "Sulawesi Selatan",
        cityName: "Kabupaten Jeneponto",
        postalCode: "92319",
        areaCode: "419",
        areaCodeDefinedManual: false
    },
    {
        cityId: "163",
        provinceId: "10",
        provinceName: "Jawa Tengah",
        cityName: "Kabupaten Jepara",
        postalCode: "59419",
        areaCode: "291",
        areaCodeDefinedManual: false
    },
    {
        cityId: "164",
        provinceId: "11",
        provinceName: "Jawa Timur",
        cityName: "Kabupaten Jombang",
        postalCode: "61415",
        areaCode: "321",
        areaCodeDefinedManual: false
    },
    {
        cityId: "165",
        provinceId: "25",
        provinceName: "Papua Barat",
        cityName: "Kabupaten Kaimana",
        postalCode: "98671",
        areaCode: "957",
        areaCodeDefinedManual: false
    },
    {
        cityId: "166",
        provinceId: "26",
        provinceName: "Riau",
        cityName: "Kabupaten Kampar",
        postalCode: "28411",
        areaCode: "762",
        areaCodeDefinedManual: false
    },
    {
        cityId: "167",
        provinceId: "14",
        provinceName: "Kalimantan Tengah",
        cityName: "Kabupaten Kapuas",
        postalCode: "73583",
        areaCode: "513",
        areaCodeDefinedManual: false
    },
    {
        cityId: "168",
        provinceId: "12",
        provinceName: "Kalimantan Barat",
        cityName: "Kabupaten Kapuas Hulu",
        postalCode: "78719",
        areaCode: "567",
        areaCodeDefinedManual: false
    },
    {
        cityId: "169",
        provinceId: "10",
        provinceName: "Jawa Tengah",
        cityName: "Kabupaten Karanganyar",
        postalCode: "57718",
        areaCode: "271",
        areaCodeDefinedManual: false
    },
    {
        cityId: "170",
        provinceId: "1",
        provinceName: "Bali",
        cityName: "Kabupaten Karangasem",
        postalCode: "80819",
        areaCode: "363",
        areaCodeDefinedManual: false
    },
    {
        cityId: "171",
        provinceId: "9",
        provinceName: "Jawa Barat",
        cityName: "Kabupaten Karawang",
        postalCode: "41311",
        areaCode: "264",
        areaCodeDefinedManual: false
    },
    {
        cityId: "172",
        provinceId: "17",
        provinceName: "Kepulauan Riau",
        cityName: "Kabupaten Karimun",
        postalCode: "29611",
        areaCode: "777",
        areaCodeDefinedManual: false
    },
    {
        cityId: "173",
        provinceId: "34",
        provinceName: "Sumatera Utara",
        cityName: "Kabupaten Karo",
        postalCode: "22119",
        areaCode: "628",
        areaCodeDefinedManual: false
    },
    {
        cityId: "174",
        provinceId: "14",
        provinceName: "Kalimantan Tengah",
        cityName: "Kabupaten Katingan",
        postalCode: "74411",
        areaCode: "536",
        areaCodeDefinedManual: true
    },
    {
        cityId: "175",
        provinceId: "4",
        provinceName: "Bengkulu",
        cityName: "Kabupaten Kaur",
        postalCode: "38911",
        areaCode: "739",
        areaCodeDefinedManual: false
    },
    {
        cityId: "176",
        provinceId: "12",
        provinceName: "Kalimantan Barat",
        cityName: "Kabupaten Kayong Utara",
        postalCode: "78852",
        areaCode: "534",
        areaCodeDefinedManual: true
    },
    {
        cityId: "177",
        provinceId: "10",
        provinceName: "Jawa Tengah",
        cityName: "Kabupaten Kebumen",
        postalCode: "54319",
        areaCode: "287",
        areaCodeDefinedManual: false
    },
    {
        cityId: "178",
        provinceId: "11",
        provinceName: "Jawa Timur",
        cityName: "Kabupaten Kediri",
        postalCode: "64184",
        areaCode: "354",
        areaCodeDefinedManual: false
    },
    {
        cityId: "179",
        provinceId: "11",
        provinceName: "Jawa Timur",
        cityName: "Kota Kediri",
        postalCode: "64125",
        areaCode: "354",
        areaCodeDefinedManual: false
    },
    {
        cityId: "180",
        provinceId: "24",
        provinceName: "Papua",
        cityName: "Kabupaten Keerom",
        postalCode: "99461",
        areaCode: "967",
        areaCodeDefinedManual: true
    },
    {
        cityId: "181",
        provinceId: "10",
        provinceName: "Jawa Tengah",
        cityName: "Kabupaten Kendal",
        postalCode: "51314",
        areaCode: "294",
        areaCodeDefinedManual: false
    },
    {
        cityId: "182",
        provinceId: "30",
        provinceName: "Sulawesi Tenggara",
        cityName: "Kota Kendari",
        postalCode: "93126",
        areaCode: "401",
        areaCodeDefinedManual: false
    },
    {
        cityId: "183",
        provinceId: "4",
        provinceName: "Bengkulu",
        cityName: "Kabupaten Kepahiang",
        postalCode: "39319",
        areaCode: "732",
        areaCodeDefinedManual: false
    },
    {
        cityId: "184",
        provinceId: "17",
        provinceName: "Kepulauan Riau",
        cityName: "Kabupaten Kepulauan Anambas",
        postalCode: "29991",
        areaCode: "772",
        areaCodeDefinedManual: false
    },
    {
        cityId: "185",
        provinceId: "19",
        provinceName: "Maluku",
        cityName: "Kabupaten Kepulauan Aru",
        postalCode: "97681",
        areaCode: "917",
        areaCodeDefinedManual: false
    },
    {
        cityId: "186",
        provinceId: "32",
        provinceName: "Sumatera Barat",
        cityName: "Kabupaten Kepulauan Mentawai",
        postalCode: "25771",
        areaCode: "759",
        areaCodeDefinedManual: false
    },
    {
        cityId: "187",
        provinceId: "26",
        provinceName: "Riau",
        cityName: "Kabupaten Kepulauan Meranti",
        postalCode: "28791",
        areaCode: "763",
        areaCodeDefinedManual: false
    },
    {
        cityId: "188",
        provinceId: "31",
        provinceName: "Sulawesi Utara",
        cityName: "Kabupaten Kepulauan Sangihe",
        postalCode: "95819",
        areaCode: "432",
        areaCodeDefinedManual: false
    },
    {
        cityId: "189",
        provinceId: "6",
        provinceName: "DKI Jakarta",
        cityName: "Kabupaten Kepulauan Seribu",
        postalCode: "14550",
        areaCode: "21",
        areaCodeDefinedManual: false
    },
    {
        cityId: "190",
        provinceId: "31",
        provinceName: "Sulawesi Utara",
        cityName: "Kabupaten Kepulauan Siau Tagulandang Biaro (Sitaro)",
        postalCode: "95862",
        areaCode: "431",
        areaCodeDefinedManual: true
    },
    {
        cityId: "191",
        provinceId: "20",
        provinceName: "Maluku Utara",
        cityName: "Kabupaten Kepulauan Sula",
        postalCode: "97995",
        areaCode: "929",
        areaCodeDefinedManual: false
    },
    {
        cityId: "192",
        provinceId: "31",
        provinceName: "Sulawesi Utara",
        cityName: "Kabupaten Kepulauan Talaud",
        postalCode: "95885",
        areaCode: "433",
        areaCodeDefinedManual: false
    },
    {
        cityId: "193",
        provinceId: "24",
        provinceName: "Papua",
        cityName: "Kabupaten Kepulauan Yapen (Yapen Waropen)",
        postalCode: "98211",
        areaCode: "983",
        areaCodeDefinedManual: false
    },
    {
        cityId: "194",
        provinceId: "8",
        provinceName: "Jambi",
        cityName: "Kabupaten Kerinci",
        postalCode: "37167",
        areaCode: "748",
        areaCodeDefinedManual: false
    },
    {
        cityId: "195",
        provinceId: "12",
        provinceName: "Kalimantan Barat",
        cityName: "Kabupaten Ketapang",
        postalCode: "78874",
        areaCode: "534",
        areaCodeDefinedManual: false
    },
    {
        cityId: "196",
        provinceId: "10",
        provinceName: "Jawa Tengah",
        cityName: "Kabupaten Klaten",
        postalCode: "57411",
        areaCode: "272",
        areaCodeDefinedManual: false
    },
    {
        cityId: "197",
        provinceId: "1",
        provinceName: "Bali",
        cityName: "Kabupaten Klungkung",
        postalCode: "80719",
        areaCode: "366",
        areaCodeDefinedManual: false
    },
    {
        cityId: "198",
        provinceId: "30",
        provinceName: "Sulawesi Tenggara",
        cityName: "Kabupaten Kolaka",
        postalCode: "93511",
        areaCode: "405",
        areaCodeDefinedManual: false
    },
    {
        cityId: "199",
        provinceId: "30",
        provinceName: "Sulawesi Tenggara",
        cityName: "Kabupaten Kolaka Utara",
        postalCode: "93911",
        areaCode: "405",
        areaCodeDefinedManual: false
    },
    {
        cityId: "200",
        provinceId: "30",
        provinceName: "Sulawesi Tenggara",
        cityName: "Kabupaten Konawe",
        postalCode: "93411",
        areaCode: "408",
        areaCodeDefinedManual: false
    },
    {
        cityId: "201",
        provinceId: "30",
        provinceName: "Sulawesi Tenggara",
        cityName: "Kabupaten Konawe Selatan",
        postalCode: "93811",
        areaCode: "401",
        areaCodeDefinedManual: true
    },
    {
        cityId: "202",
        provinceId: "30",
        provinceName: "Sulawesi Tenggara",
        cityName: "Kabupaten Konawe Utara",
        postalCode: "93311",
        areaCode: "401",
        areaCodeDefinedManual: true
    },
    {
        cityId: "203",
        provinceId: "13",
        provinceName: "Kalimantan Selatan",
        cityName: "Kabupaten Kotabaru",
        postalCode: "72119",
        areaCode: "518",
        areaCodeDefinedManual: false
    },
    {
        cityId: "204",
        provinceId: "31",
        provinceName: "Sulawesi Utara",
        cityName: "Kota Kotamobagu",
        postalCode: "95711",
        areaCode: "434",
        areaCodeDefinedManual: false
    },
    {
        cityId: "205",
        provinceId: "14",
        provinceName: "Kalimantan Tengah",
        cityName: "Kabupaten Kotawaringin Barat",
        postalCode: "74119",
        areaCode: "532",
        areaCodeDefinedManual: false
    },
    {
        cityId: "206",
        provinceId: "14",
        provinceName: "Kalimantan Tengah",
        cityName: "Kabupaten Kotawaringin Timur",
        postalCode: "74364",
        areaCode: "539",
        areaCodeDefinedManual: false
    },
    {
        cityId: "207",
        provinceId: "26",
        provinceName: "Riau",
        cityName: "Kabupaten Kuantan Singingi",
        postalCode: "29519",
        areaCode: "760",
        areaCodeDefinedManual: false
    },
    {
        cityId: "208",
        provinceId: "12",
        provinceName: "Kalimantan Barat",
        cityName: "Kabupaten Kubu Raya",
        postalCode: "78311",
        areaCode: "561",
        areaCodeDefinedManual: false
    },
    {
        cityId: "209",
        provinceId: "10",
        provinceName: "Jawa Tengah",
        cityName: "Kabupaten Kudus",
        postalCode: "59311",
        areaCode: "291",
        areaCodeDefinedManual: false
    },
    {
        cityId: "210",
        provinceId: "5",
        provinceName: "DI Yogyakarta",
        cityName: "Kabupaten Kulon Progo",
        postalCode: "55611",
        areaCode: "274",
        areaCodeDefinedManual: false
    },
    {
        cityId: "211",
        provinceId: "9",
        provinceName: "Jawa Barat",
        cityName: "Kabupaten Kuningan",
        postalCode: "45511",
        areaCode: "232",
        areaCodeDefinedManual: false
    },
    {
        cityId: "212",
        provinceId: "23",
        provinceName: "Nusa Tenggara Timur (NTT)",
        cityName: "Kabupaten Kupang",
        postalCode: "85362",
        areaCode: "380",
        areaCodeDefinedManual: false
    },
    {
        cityId: "213",
        provinceId: "23",
        provinceName: "Nusa Tenggara Timur (NTT)",
        cityName: "Kota Kupang",
        postalCode: "85119",
        areaCode: "380",
        areaCodeDefinedManual: false
    },
    {
        cityId: "214",
        provinceId: "15",
        provinceName: "Kalimantan Timur",
        cityName: "Kabupaten Kutai Barat",
        postalCode: "75711",
        areaCode: "545",
        areaCodeDefinedManual: false
    },
    {
        cityId: "215",
        provinceId: "15",
        provinceName: "Kalimantan Timur",
        cityName: "Kabupaten Kutai Kartanegara",
        postalCode: "75511",
        areaCode: "541",
        areaCodeDefinedManual: false
    },
    {
        cityId: "216",
        provinceId: "15",
        provinceName: "Kalimantan Timur",
        cityName: "Kabupaten Kutai Timur",
        postalCode: "75611",
        areaCode: "549",
        areaCodeDefinedManual: false
    },
    {
        cityId: "217",
        provinceId: "34",
        provinceName: "Sumatera Utara",
        cityName: "Kabupaten Labuhan Batu",
        postalCode: "21412",
        areaCode: "624",
        areaCodeDefinedManual: false
    },
    {
        cityId: "218",
        provinceId: "34",
        provinceName: "Sumatera Utara",
        cityName: "Kabupaten Labuhan Batu Selatan",
        postalCode: "21511",
        areaCode: "624",
        areaCodeDefinedManual: false
    },
    {
        cityId: "219",
        provinceId: "34",
        provinceName: "Sumatera Utara",
        cityName: "Kabupaten Labuhan Batu Utara",
        postalCode: "21711",
        areaCode: "624",
        areaCodeDefinedManual: false
    },
    {
        cityId: "220",
        provinceId: "33",
        provinceName: "Sumatera Selatan",
        cityName: "Kabupaten Lahat",
        postalCode: "31419",
        areaCode: "730",
        areaCodeDefinedManual: false
    },
    {
        cityId: "221",
        provinceId: "14",
        provinceName: "Kalimantan Tengah",
        cityName: "Kabupaten Lamandau",
        postalCode: "74611",
        areaCode: "539",
        areaCodeDefinedManual: true
    },
    {
        cityId: "222",
        provinceId: "11",
        provinceName: "Jawa Timur",
        cityName: "Kabupaten Lamongan",
        postalCode: "64125",
        areaCode: "322",
        areaCodeDefinedManual: false
    },
    {
        cityId: "223",
        provinceId: "18",
        provinceName: "Lampung",
        cityName: "Kabupaten Lampung Barat",
        postalCode: "34814",
        areaCode: "728",
        areaCodeDefinedManual: false
    },
    {
        cityId: "224",
        provinceId: "18",
        provinceName: "Lampung",
        cityName: "Kabupaten Lampung Selatan",
        postalCode: "35511",
        areaCode: "721",
        areaCodeDefinedManual: false
    },
    {
        cityId: "225",
        provinceId: "18",
        provinceName: "Lampung",
        cityName: "Kabupaten Lampung Tengah",
        postalCode: "34212",
        areaCode: "725",
        areaCodeDefinedManual: false
    },
    {
        cityId: "226",
        provinceId: "18",
        provinceName: "Lampung",
        cityName: "Kabupaten Lampung Timur",
        postalCode: "34319",
        areaCode: "725",
        areaCodeDefinedManual: false
    },
    {
        cityId: "227",
        provinceId: "18",
        provinceName: "Lampung",
        cityName: "Kabupaten Lampung Utara",
        postalCode: "34516",
        areaCode: "724",
        areaCodeDefinedManual: false
    },
    {
        cityId: "228",
        provinceId: "12",
        provinceName: "Kalimantan Barat",
        cityName: "Kabupaten Landak",
        postalCode: "78319",
        areaCode: "563",
        areaCodeDefinedManual: false
    },
    {
        cityId: "229",
        provinceId: "34",
        provinceName: "Sumatera Utara",
        cityName: "Kabupaten Langkat",
        postalCode: "20811",
        areaCode: "61",
        areaCodeDefinedManual: false
    },
    {
        cityId: "230",
        provinceId: "21",
        provinceName: "Nanggroe Aceh Darussalam (NAD)",
        cityName: "Kota Langsa",
        postalCode: "24412",
        areaCode: "641",
        areaCodeDefinedManual: false
    },
    {
        cityId: "231",
        provinceId: "24",
        provinceName: "Papua",
        cityName: "Kabupaten Lanny Jaya",
        postalCode: "99531",
        areaCode: "901",
        areaCodeDefinedManual: true
    },
    {
        cityId: "232",
        provinceId: "3",
        provinceName: "Banten",
        cityName: "Kabupaten Lebak",
        postalCode: "42319",
        areaCode: "252",
        areaCodeDefinedManual: false
    },
    {
        cityId: "233",
        provinceId: "4",
        provinceName: "Bengkulu",
        cityName: "Kabupaten Lebong",
        postalCode: "39264",
        areaCode: "738",
        areaCodeDefinedManual: false
    },
    {
        cityId: "234",
        provinceId: "23",
        provinceName: "Nusa Tenggara Timur (NTT)",
        cityName: "Kabupaten Lembata",
        postalCode: "86611",
        areaCode: "383",
        areaCodeDefinedManual: false
    },
    {
        cityId: "235",
        provinceId: "21",
        provinceName: "Nanggroe Aceh Darussalam (NAD)",
        cityName: "Kota Lhokseumawe",
        postalCode: "24352",
        areaCode: "645",
        areaCodeDefinedManual: false
    },
    {
        cityId: "236",
        provinceId: "32",
        provinceName: "Sumatera Barat",
        cityName: "Kabupaten Lima Puluh Koto/Kota",
        postalCode: "26671",
        areaCode: "752",
        areaCodeDefinedManual: false
    },
    {
        cityId: "237",
        provinceId: "17",
        provinceName: "Kepulauan Riau",
        cityName: "Kabupaten Lingga",
        postalCode: "29811",
        areaCode: "776",
        areaCodeDefinedManual: false
    },
    {
        cityId: "238",
        provinceId: "22",
        provinceName: "Nusa Tenggara Barat (NTB)",
        cityName: "Kabupaten Lombok Barat",
        postalCode: "83311",
        areaCode: "370",
        areaCodeDefinedManual: false
    },
    {
        cityId: "239",
        provinceId: "22",
        provinceName: "Nusa Tenggara Barat (NTB)",
        cityName: "Kabupaten Lombok Tengah",
        postalCode: "83511",
        areaCode: "370",
        areaCodeDefinedManual: false
    },
    {
        cityId: "240",
        provinceId: "22",
        provinceName: "Nusa Tenggara Barat (NTB)",
        cityName: "Kabupaten Lombok Timur",
        postalCode: "83612",
        areaCode: "376",
        areaCodeDefinedManual: false
    },
    {
        cityId: "241",
        provinceId: "22",
        provinceName: "Nusa Tenggara Barat (NTB)",
        cityName: "Kabupaten Lombok Utara",
        postalCode: "83711",
        areaCode: "370",
        areaCodeDefinedManual: false
    },
    {
        cityId: "242",
        provinceId: "33",
        provinceName: "Sumatera Selatan",
        cityName: "Kota Lubuk Linggau",
        postalCode: "31614",
        areaCode: "733",
        areaCodeDefinedManual: false
    },
    {
        cityId: "243",
        provinceId: "11",
        provinceName: "Jawa Timur",
        cityName: "Kabupaten Lumajang",
        postalCode: "67319",
        areaCode: "334",
        areaCodeDefinedManual: false
    },
    {
        cityId: "244",
        provinceId: "28",
        provinceName: "Sulawesi Selatan",
        cityName: "Kabupaten Luwu",
        postalCode: "91994",
        areaCode: "471",
        areaCodeDefinedManual: false
    },
    {
        cityId: "245",
        provinceId: "28",
        provinceName: "Sulawesi Selatan",
        cityName: "Kabupaten Luwu Timur",
        postalCode: "92981",
        areaCode: "474",
        areaCodeDefinedManual: false
    },
    {
        cityId: "246",
        provinceId: "28",
        provinceName: "Sulawesi Selatan",
        cityName: "Kabupaten Luwu Utara",
        postalCode: "92911",
        areaCode: "473",
        areaCodeDefinedManual: false
    },
    {
        cityId: "247",
        provinceId: "11",
        provinceName: "Jawa Timur",
        cityName: "Kabupaten Madiun",
        postalCode: "63153",
        areaCode: "351",
        areaCodeDefinedManual: false
    },
    {
        cityId: "248",
        provinceId: "11",
        provinceName: "Jawa Timur",
        cityName: "Kota Madiun",
        postalCode: "63122",
        areaCode: "351",
        areaCodeDefinedManual: false
    },
    {
        cityId: "249",
        provinceId: "10",
        provinceName: "Jawa Tengah",
        cityName: "Kabupaten Magelang",
        postalCode: "56519",
        areaCode: "293",
        areaCodeDefinedManual: false
    },
    {
        cityId: "250",
        provinceId: "10",
        provinceName: "Jawa Tengah",
        cityName: "Kota Magelang",
        postalCode: "56133",
        areaCode: "293",
        areaCodeDefinedManual: false
    },
    {
        cityId: "251",
        provinceId: "11",
        provinceName: "Jawa Timur",
        cityName: "Kabupaten Magetan",
        postalCode: "63314",
        areaCode: "351",
        areaCodeDefinedManual: false
    },
    {
        cityId: "252",
        provinceId: "9",
        provinceName: "Jawa Barat",
        cityName: "Kabupaten Majalengka",
        postalCode: "45412",
        areaCode: "233",
        areaCodeDefinedManual: false
    },
    {
        cityId: "253",
        provinceId: "27",
        provinceName: "Sulawesi Barat",
        cityName: "Kabupaten Majene",
        postalCode: "91411",
        areaCode: "422",
        areaCodeDefinedManual: false
    },
    {
        cityId: "254",
        provinceId: "28",
        provinceName: "Sulawesi Selatan",
        cityName: "Kota Makassar",
        postalCode: "90111",
        areaCode: "411",
        areaCodeDefinedManual: false
    },
    {
        cityId: "255",
        provinceId: "11",
        provinceName: "Jawa Timur",
        cityName: "Kabupaten Malang",
        postalCode: "65163",
        areaCode: "341",
        areaCodeDefinedManual: false
    },
    {
        cityId: "256",
        provinceId: "11",
        provinceName: "Jawa Timur",
        cityName: "Kota Malang",
        postalCode: "65112",
        areaCode: "341",
        areaCodeDefinedManual: false
    },
    {
        cityId: "257",
        provinceId: "16",
        provinceName: "Kalimantan Utara",
        cityName: "Kabupaten Malinau",
        postalCode: "77511",
        areaCode: "553",
        areaCodeDefinedManual: false
    },
    {
        cityId: "258",
        provinceId: "19",
        provinceName: "Maluku",
        cityName: "Kabupaten Maluku Barat Daya",
        postalCode: "97451",
        areaCode: "918",
        areaCodeDefinedManual: false
    },
    {
        cityId: "259",
        provinceId: "19",
        provinceName: "Maluku",
        cityName: "Kabupaten Maluku Tengah",
        postalCode: "97513",
        areaCode: "910",
        areaCodeDefinedManual: false
    },
    {
        cityId: "260",
        provinceId: "19",
        provinceName: "Maluku",
        cityName: "Kabupaten Maluku Tenggara",
        postalCode: "97651",
        areaCode: "916",
        areaCodeDefinedManual: false
    },
    {
        cityId: "261",
        provinceId: "19",
        provinceName: "Maluku",
        cityName: "Kabupaten Maluku Tenggara Barat",
        postalCode: "97465",
        areaCode: "918",
        areaCodeDefinedManual: false
    },
    {
        cityId: "262",
        provinceId: "27",
        provinceName: "Sulawesi Barat",
        cityName: "Kabupaten Mamasa",
        postalCode: "91362",
        areaCode: "426",
        areaCodeDefinedManual: true
    },
    {
        cityId: "263",
        provinceId: "24",
        provinceName: "Papua",
        cityName: "Kabupaten Mamberamo Raya",
        postalCode: "99381",
        areaCode: "967",
        areaCodeDefinedManual: true
    },
    {
        cityId: "264",
        provinceId: "24",
        provinceName: "Papua",
        cityName: "Kabupaten Mamberamo Tengah",
        postalCode: "99553",
        areaCode: "967",
        areaCodeDefinedManual: true
    },
    {
        cityId: "265",
        provinceId: "27",
        provinceName: "Sulawesi Barat",
        cityName: "Kabupaten Mamuju",
        postalCode: "91519",
        areaCode: "426",
        areaCodeDefinedManual: false
    },
    {
        cityId: "266",
        provinceId: "27",
        provinceName: "Sulawesi Barat",
        cityName: "Kabupaten Mamuju Utara",
        postalCode: "91571",
        areaCode: "426",
        areaCodeDefinedManual: false
    },
    {
        cityId: "267",
        provinceId: "31",
        provinceName: "Sulawesi Utara",
        cityName: "Kota Manado",
        postalCode: "95247",
        areaCode: "431",
        areaCodeDefinedManual: false
    },
    {
        cityId: "268",
        provinceId: "34",
        provinceName: "Sumatera Utara",
        cityName: "Kabupaten Mandailing Natal",
        postalCode: "22916",
        areaCode: "636",
        areaCodeDefinedManual: false
    },
    {
        cityId: "269",
        provinceId: "23",
        provinceName: "Nusa Tenggara Timur (NTT)",
        cityName: "Kabupaten Manggarai",
        postalCode: "86551",
        areaCode: "385",
        areaCodeDefinedManual: false
    },
    {
        cityId: "270",
        provinceId: "23",
        provinceName: "Nusa Tenggara Timur (NTT)",
        cityName: "Kabupaten Manggarai Barat",
        postalCode: "86711",
        areaCode: "385",
        areaCodeDefinedManual: false
    },
    {
        cityId: "271",
        provinceId: "23",
        provinceName: "Nusa Tenggara Timur (NTT)",
        cityName: "Kabupaten Manggarai Timur",
        postalCode: "86811",
        areaCode: "381",
        areaCodeDefinedManual: true
    },
    {
        cityId: "272",
        provinceId: "25",
        provinceName: "Papua Barat",
        cityName: "Kabupaten Manokwari",
        postalCode: "98311",
        areaCode: "986",
        areaCodeDefinedManual: false
    },
    {
        cityId: "273",
        provinceId: "25",
        provinceName: "Papua Barat",
        cityName: "Kabupaten Manokwari Selatan",
        postalCode: "98355",
        areaCode: "980",
        areaCodeDefinedManual: false
    },
    {
        cityId: "274",
        provinceId: "24",
        provinceName: "Papua",
        cityName: "Kabupaten Mappi",
        postalCode: "99853",
        areaCode: "971",
        areaCodeDefinedManual: true
    },
    {
        cityId: "275",
        provinceId: "28",
        provinceName: "Sulawesi Selatan",
        cityName: "Kabupaten Maros",
        postalCode: "90511",
        areaCode: "411",
        areaCodeDefinedManual: false
    },
    {
        cityId: "276",
        provinceId: "22",
        provinceName: "Nusa Tenggara Barat (NTB)",
        cityName: "Kota Mataram",
        postalCode: "83131",
        areaCode: "364",
        areaCodeDefinedManual: false
    },
    {
        cityId: "277",
        provinceId: "25",
        provinceName: "Papua Barat",
        cityName: "Kabupaten Maybrat",
        postalCode: "98051",
        areaCode: "951",
        areaCodeDefinedManual: true
    },
    {
        cityId: "278",
        provinceId: "34",
        provinceName: "Sumatera Utara",
        cityName: "Kota Medan",
        postalCode: "20228",
        areaCode: "61",
        areaCodeDefinedManual: false
    },
    {
        cityId: "279",
        provinceId: "12",
        provinceName: "Kalimantan Barat",
        cityName: "Kabupaten Melawi",
        postalCode: "78619",
        areaCode: "568",
        areaCodeDefinedManual: false
    },
    {
        cityId: "280",
        provinceId: "8",
        provinceName: "Jambi",
        cityName: "Kabupaten Merangin",
        postalCode: "37319",
        areaCode: "746",
        areaCodeDefinedManual: false
    },
    {
        cityId: "281",
        provinceId: "24",
        provinceName: "Papua",
        cityName: "Kabupaten Merauke",
        postalCode: "99613",
        areaCode: "971",
        areaCodeDefinedManual: false
    },
    {
        cityId: "282",
        provinceId: "18",
        provinceName: "Lampung",
        cityName: "Kabupaten Mesuji",
        postalCode: "34911",
        areaCode: "726",
        areaCodeDefinedManual: false
    },
    {
        cityId: "283",
        provinceId: "18",
        provinceName: "Lampung",
        cityName: "Kota Metro",
        postalCode: "34111",
        areaCode: "725",
        areaCodeDefinedManual: false
    },
    {
        cityId: "284",
        provinceId: "24",
        provinceName: "Papua",
        cityName: "Kabupaten Mimika",
        postalCode: "99962",
        areaCode: "901",
        areaCodeDefinedManual: false
    },
    {
        cityId: "285",
        provinceId: "31",
        provinceName: "Sulawesi Utara",
        cityName: "Kabupaten Minahasa",
        postalCode: "95614",
        areaCode: "431",
        areaCodeDefinedManual: false
    },
    {
        cityId: "286",
        provinceId: "31",
        provinceName: "Sulawesi Utara",
        cityName: "Kabupaten Minahasa Selatan",
        postalCode: "95914",
        areaCode: "430",
        areaCodeDefinedManual: false
    },
    {
        cityId: "287",
        provinceId: "31",
        provinceName: "Sulawesi Utara",
        cityName: "Kabupaten Minahasa Tenggara",
        postalCode: "95995",
        areaCode: "431",
        areaCodeDefinedManual: false
    },
    {
        cityId: "288",
        provinceId: "31",
        provinceName: "Sulawesi Utara",
        cityName: "Kabupaten Minahasa Utara",
        postalCode: "95316",
        areaCode: "431",
        areaCodeDefinedManual: false
    },
    {
        cityId: "289",
        provinceId: "11",
        provinceName: "Jawa Timur",
        cityName: "Kabupaten Mojokerto",
        postalCode: "61382",
        areaCode: "31",
        areaCodeDefinedManual: false
    },
    {
        cityId: "290",
        provinceId: "11",
        provinceName: "Jawa Timur",
        cityName: "Kota Mojokerto",
        postalCode: "61316",
        areaCode: "321",
        areaCodeDefinedManual: false
    },
    {
        cityId: "291",
        provinceId: "29",
        provinceName: "Sulawesi Tengah",
        cityName: "Kabupaten Morowali",
        postalCode: "94911",
        areaCode: "452",
        areaCodeDefinedManual: true
    },
    {
        cityId: "292",
        provinceId: "33",
        provinceName: "Sumatera Selatan",
        cityName: "Kabupaten Muara Enim",
        postalCode: "31315",
        areaCode: "713",
        areaCodeDefinedManual: false
    },
    {
        cityId: "293",
        provinceId: "8",
        provinceName: "Jambi",
        cityName: "Kabupaten Muaro Jambi",
        postalCode: "36311",
        areaCode: "741",
        areaCodeDefinedManual: false
    },
    {
        cityId: "294",
        provinceId: "4",
        provinceName: "Bengkulu",
        cityName: "Kabupaten Muko Muko",
        postalCode: "38715",
        areaCode: "737",
        areaCodeDefinedManual: false
    },
    {
        cityId: "295",
        provinceId: "30",
        provinceName: "Sulawesi Tenggara",
        cityName: "Kabupaten Muna",
        postalCode: "93611",
        areaCode: "403",
        areaCodeDefinedManual: false
    },
    {
        cityId: "296",
        provinceId: "14",
        provinceName: "Kalimantan Tengah",
        cityName: "Kabupaten Murung Raya",
        postalCode: "73911",
        areaCode: "528",
        areaCodeDefinedManual: false
    },
    {
        cityId: "297",
        provinceId: "33",
        provinceName: "Sumatera Selatan",
        cityName: "Kabupaten Musi Banyuasin",
        postalCode: "30719",
        areaCode: "714",
        areaCodeDefinedManual: false
    },
    {
        cityId: "298",
        provinceId: "33",
        provinceName: "Sumatera Selatan",
        cityName: "Kabupaten Musi Rawas",
        postalCode: "31661",
        areaCode: "733",
        areaCodeDefinedManual: false
    },
    {
        cityId: "299",
        provinceId: "24",
        provinceName: "Papua",
        cityName: "Kabupaten Nabire",
        postalCode: "98816",
        areaCode: "984",
        areaCodeDefinedManual: false
    },
    {
        cityId: "300",
        provinceId: "21",
        provinceName: "Nanggroe Aceh Darussalam (NAD)",
        cityName: "Kabupaten Nagan Raya",
        postalCode: "23674",
        areaCode: "655",
        areaCodeDefinedManual: false
    },
    {
        cityId: "301",
        provinceId: "23",
        provinceName: "Nusa Tenggara Timur (NTT)",
        cityName: "Kabupaten Nagekeo",
        postalCode: "86911",
        areaCode: "381",
        areaCodeDefinedManual: true
    },
    {
        cityId: "302",
        provinceId: "17",
        provinceName: "Kepulauan Riau",
        cityName: "Kabupaten Natuna",
        postalCode: "29711",
        areaCode: "773",
        areaCodeDefinedManual: false
    },
    {
        cityId: "303",
        provinceId: "24",
        provinceName: "Papua",
        cityName: "Kabupaten Nduga",
        postalCode: "99541",
        areaCode: "969",
        areaCodeDefinedManual: true
    },
    {
        cityId: "304",
        provinceId: "23",
        provinceName: "Nusa Tenggara Timur (NTT)",
        cityName: "Kabupaten Ngada",
        postalCode: "86413",
        areaCode: "384",
        areaCodeDefinedManual: false
    },
    {
        cityId: "305",
        provinceId: "11",
        provinceName: "Jawa Timur",
        cityName: "Kabupaten Nganjuk",
        postalCode: "64414",
        areaCode: "358",
        areaCodeDefinedManual: false
    },
    {
        cityId: "306",
        provinceId: "11",
        provinceName: "Jawa Timur",
        cityName: "Kabupaten Ngawi",
        postalCode: "63219",
        areaCode: "351",
        areaCodeDefinedManual: false
    },
    {
        cityId: "307",
        provinceId: "34",
        provinceName: "Sumatera Utara",
        cityName: "Kabupaten Nias",
        postalCode: "22876",
        areaCode: "639",
        areaCodeDefinedManual: false
    },
    {
        cityId: "308",
        provinceId: "34",
        provinceName: "Sumatera Utara",
        cityName: "Kabupaten Nias Barat",
        postalCode: "22895",
        areaCode: "639",
        areaCodeDefinedManual: false
    },
    {
        cityId: "309",
        provinceId: "34",
        provinceName: "Sumatera Utara",
        cityName: "Kabupaten Nias Selatan",
        postalCode: "22865",
        areaCode: "630",
        areaCodeDefinedManual: false
    },
    {
        cityId: "310",
        provinceId: "34",
        provinceName: "Sumatera Utara",
        cityName: "Kabupaten Nias Utara",
        postalCode: "22856",
        areaCode: "639",
        areaCodeDefinedManual: false
    },
    {
        cityId: "311",
        provinceId: "16",
        provinceName: "Kalimantan Utara",
        cityName: "Kabupaten Nunukan",
        postalCode: "77421",
        areaCode: "556",
        areaCodeDefinedManual: false
    },
    {
        cityId: "312",
        provinceId: "33",
        provinceName: "Sumatera Selatan",
        cityName: "Kabupaten Ogan Ilir",
        postalCode: "30811",
        areaCode: "711",
        areaCodeDefinedManual: false
    },
    {
        cityId: "313",
        provinceId: "33",
        provinceName: "Sumatera Selatan",
        cityName: "Kabupaten Ogan Komering Ilir",
        postalCode: "30618",
        areaCode: "712",
        areaCodeDefinedManual: false
    },
    {
        cityId: "314",
        provinceId: "33",
        provinceName: "Sumatera Selatan",
        cityName: "Kabupaten Ogan Komering Ulu",
        postalCode: "32112",
        areaCode: "735",
        areaCodeDefinedManual: false
    },
    {
        cityId: "315",
        provinceId: "33",
        provinceName: "Sumatera Selatan",
        cityName: "Kabupaten Ogan Komering Ulu Selatan",
        postalCode: "32211",
        areaCode: "735",
        areaCodeDefinedManual: false
    },
    {
        cityId: "316",
        provinceId: "33",
        provinceName: "Sumatera Selatan",
        cityName: "Kabupaten Ogan Komering Ulu Timur",
        postalCode: "32312",
        areaCode: "735",
        areaCodeDefinedManual: false
    },
    {
        cityId: "317",
        provinceId: "11",
        provinceName: "Jawa Timur",
        cityName: "Kabupaten Pacitan",
        postalCode: "63512",
        areaCode: "357",
        areaCodeDefinedManual: false
    },
    {
        cityId: "318",
        provinceId: "32",
        provinceName: "Sumatera Barat",
        cityName: "Kota Padang",
        postalCode: "25112",
        areaCode: "751",
        areaCodeDefinedManual: false
    },
    {
        cityId: "319",
        provinceId: "34",
        provinceName: "Sumatera Utara",
        cityName: "Kabupaten Padang Lawas",
        postalCode: "22763",
        areaCode: "636",
        areaCodeDefinedManual: false
    },
    {
        cityId: "320",
        provinceId: "34",
        provinceName: "Sumatera Utara",
        cityName: "Kabupaten Padang Lawas Utara",
        postalCode: "22753",
        areaCode: "635",
        areaCodeDefinedManual: false
    },
    {
        cityId: "321",
        provinceId: "32",
        provinceName: "Sumatera Barat",
        cityName: "Kota Padang Panjang",
        postalCode: "27122",
        areaCode: "752",
        areaCodeDefinedManual: false
    },
    {
        cityId: "322",
        provinceId: "32",
        provinceName: "Sumatera Barat",
        cityName: "Kabupaten Padang Pariaman",
        postalCode: "25583",
        areaCode: "751",
        areaCodeDefinedManual: false
    },
    {
        cityId: "323",
        provinceId: "34",
        provinceName: "Sumatera Utara",
        cityName: "Kota Padang Sidempuan",
        postalCode: "22727",
        areaCode: "634",
        areaCodeDefinedManual: false
    },
    {
        cityId: "324",
        provinceId: "33",
        provinceName: "Sumatera Selatan",
        cityName: "Kota Pagar Alam",
        postalCode: "31512",
        areaCode: "730",
        areaCodeDefinedManual: false
    },
    {
        cityId: "325",
        provinceId: "34",
        provinceName: "Sumatera Utara",
        cityName: "Kabupaten Pakpak Bharat",
        postalCode: "22272",
        areaCode: "627",
        areaCodeDefinedManual: false
    },
    {
        cityId: "326",
        provinceId: "14",
        provinceName: "Kalimantan Tengah",
        cityName: "Kota Palangka Raya",
        postalCode: "73112",
        areaCode: "536",
        areaCodeDefinedManual: false
    },
    {
        cityId: "327",
        provinceId: "33",
        provinceName: "Sumatera Selatan",
        cityName: "Kota Palembang",
        postalCode: "30111",
        areaCode: "711",
        areaCodeDefinedManual: false
    },
    {
        cityId: "328",
        provinceId: "28",
        provinceName: "Sulawesi Selatan",
        cityName: "Kota Palopo",
        postalCode: "91911",
        areaCode: "471",
        areaCodeDefinedManual: false
    },
    {
        cityId: "329",
        provinceId: "29",
        provinceName: "Sulawesi Tengah",
        cityName: "Kota Palu",
        postalCode: "94111",
        areaCode: "451",
        areaCodeDefinedManual: false
    },
    {
        cityId: "330",
        provinceId: "11",
        provinceName: "Jawa Timur",
        cityName: "Kabupaten Pamekasan",
        postalCode: "69319",
        areaCode: "324",
        areaCodeDefinedManual: false
    },
    {
        cityId: "331",
        provinceId: "3",
        provinceName: "Banten",
        cityName: "Kabupaten Pandeglang",
        postalCode: "42212",
        areaCode: "253",
        areaCodeDefinedManual: false
    },
    {
        cityId: "332",
        provinceId: "9",
        provinceName: "Jawa Barat",
        cityName: "Kabupaten Pangandaran",
        postalCode: "46511",
        areaCode: "265",
        areaCodeDefinedManual: false
    },
    {
        cityId: "333",
        provinceId: "28",
        provinceName: "Sulawesi Selatan",
        cityName: "Kabupaten Pangkajene Kepulauan",
        postalCode: "90611",
        areaCode: "21",
        areaCodeDefinedManual: false
    },
    {
        cityId: "334",
        provinceId: "2",
        provinceName: "Bangka Belitung",
        cityName: "Kota Pangkal Pinang",
        postalCode: "33115",
        areaCode: "717",
        areaCodeDefinedManual: false
    },
    {
        cityId: "335",
        provinceId: "24",
        provinceName: "Papua",
        cityName: "Kabupaten Paniai",
        postalCode: "98765",
        areaCode: "984",
        areaCodeDefinedManual: true
    },
    {
        cityId: "336",
        provinceId: "28",
        provinceName: "Sulawesi Selatan",
        cityName: "Kota Parepare",
        postalCode: "91123",
        areaCode: "421",
        areaCodeDefinedManual: false
    },
    {
        cityId: "337",
        provinceId: "32",
        provinceName: "Sumatera Barat",
        cityName: "Kota Pariaman",
        postalCode: "25511",
        areaCode: "751",
        areaCodeDefinedManual: false
    },
    {
        cityId: "338",
        provinceId: "29",
        provinceName: "Sulawesi Tengah",
        cityName: "Kabupaten Parigi Moutong",
        postalCode: "94411",
        areaCode: "450",
        areaCodeDefinedManual: false
    },
    {
        cityId: "339",
        provinceId: "32",
        provinceName: "Sumatera Barat",
        cityName: "Kabupaten Pasaman",
        postalCode: "26318",
        areaCode: "753",
        areaCodeDefinedManual: false
    },
    {
        cityId: "340",
        provinceId: "32",
        provinceName: "Sumatera Barat",
        cityName: "Kabupaten Pasaman Barat",
        postalCode: "26511",
        areaCode: "753",
        areaCodeDefinedManual: false
    },
    {
        cityId: "341",
        provinceId: "15",
        provinceName: "Kalimantan Timur",
        cityName: "Kabupaten Paser",
        postalCode: "76211",
        areaCode: "556",
        areaCodeDefinedManual: false
    },
    {
        cityId: "342",
        provinceId: "11",
        provinceName: "Jawa Timur",
        cityName: "Kabupaten Pasuruan",
        postalCode: "67153",
        areaCode: "343",
        areaCodeDefinedManual: false
    },
    {
        cityId: "343",
        provinceId: "11",
        provinceName: "Jawa Timur",
        cityName: "Kota Pasuruan",
        postalCode: "67118",
        areaCode: "343",
        areaCodeDefinedManual: false
    },
    {
        cityId: "344",
        provinceId: "10",
        provinceName: "Jawa Tengah",
        cityName: "Kabupaten Pati",
        postalCode: "59114",
        areaCode: "295",
        areaCodeDefinedManual: false
    },
    {
        cityId: "345",
        provinceId: "32",
        provinceName: "Sumatera Barat",
        cityName: "Kota Payakumbuh",
        postalCode: "26213",
        areaCode: "752",
        areaCodeDefinedManual: false
    },
    {
        cityId: "346",
        provinceId: "25",
        provinceName: "Papua Barat",
        cityName: "Kabupaten Pegunungan Arfak",
        postalCode: "98354",
        areaCode: "986",
        areaCodeDefinedManual: true
    },
    {
        cityId: "347",
        provinceId: "24",
        provinceName: "Papua",
        cityName: "Kabupaten Pegunungan Bintang",
        postalCode: "99573",
        areaCode: "967",
        areaCodeDefinedManual: true
    },
    {
        cityId: "348",
        provinceId: "10",
        provinceName: "Jawa Tengah",
        cityName: "Kabupaten Pekalongan",
        postalCode: "51161",
        areaCode: "285",
        areaCodeDefinedManual: false
    },
    {
        cityId: "349",
        provinceId: "10",
        provinceName: "Jawa Tengah",
        cityName: "Kota Pekalongan",
        postalCode: "51122",
        areaCode: "285",
        areaCodeDefinedManual: false
    },
    {
        cityId: "350",
        provinceId: "26",
        provinceName: "Riau",
        cityName: "Kota Pekanbaru",
        postalCode: "28112",
        areaCode: "761",
        areaCodeDefinedManual: false
    },
    {
        cityId: "351",
        provinceId: "26",
        provinceName: "Riau",
        cityName: "Kabupaten Pelalawan",
        postalCode: "28311",
        areaCode: "761",
        areaCodeDefinedManual: false
    },
    {
        cityId: "352",
        provinceId: "10",
        provinceName: "Jawa Tengah",
        cityName: "Kabupaten Pemalang",
        postalCode: "52319",
        areaCode: "284",
        areaCodeDefinedManual: false
    },
    {
        cityId: "353",
        provinceId: "34",
        provinceName: "Sumatera Utara",
        cityName: "Kota Pematang Siantar",
        postalCode: "21126",
        areaCode: "622",
        areaCodeDefinedManual: false
    },
    {
        cityId: "354",
        provinceId: "15",
        provinceName: "Kalimantan Timur",
        cityName: "Kabupaten Penajam Paser Utara",
        postalCode: "76311",
        areaCode: "542",
        areaCodeDefinedManual: false
    },
    {
        cityId: "355",
        provinceId: "18",
        provinceName: "Lampung",
        cityName: "Kabupaten Pesawaran",
        postalCode: "35312",
        areaCode: "721",
        areaCodeDefinedManual: false
    },
    {
        cityId: "356",
        provinceId: "18",
        provinceName: "Lampung",
        cityName: "Kabupaten Pesisir Barat",
        postalCode: "35974",
        areaCode: "728",
        areaCodeDefinedManual: false
    },
    {
        cityId: "357",
        provinceId: "32",
        provinceName: "Sumatera Barat",
        cityName: "Kabupaten Pesisir Selatan",
        postalCode: "25611",
        areaCode: "756",
        areaCodeDefinedManual: false
    },
    {
        cityId: "358",
        provinceId: "21",
        provinceName: "Nanggroe Aceh Darussalam (NAD)",
        cityName: "Kabupaten Pidie",
        postalCode: "24116",
        areaCode: "653",
        areaCodeDefinedManual: false
    },
    {
        cityId: "359",
        provinceId: "21",
        provinceName: "Nanggroe Aceh Darussalam (NAD)",
        cityName: "Kabupaten Pidie Jaya",
        postalCode: "24186",
        areaCode: "653",
        areaCodeDefinedManual: false
    },
    {
        cityId: "360",
        provinceId: "28",
        provinceName: "Sulawesi Selatan",
        cityName: "Kabupaten Pinrang",
        postalCode: "91251",
        areaCode: "421",
        areaCodeDefinedManual: false
    },
    {
        cityId: "361",
        provinceId: "7",
        provinceName: "Gorontalo",
        cityName: "Kabupaten Pohuwato",
        postalCode: "96419",
        areaCode: "443",
        areaCodeDefinedManual: false
    },
    {
        cityId: "362",
        provinceId: "27",
        provinceName: "Sulawesi Barat",
        cityName: "Kabupaten Polewali Mandar",
        postalCode: "91311",
        areaCode: "428",
        areaCodeDefinedManual: false
    },
    {
        cityId: "363",
        provinceId: "11",
        provinceName: "Jawa Timur",
        cityName: "Kabupaten Ponorogo",
        postalCode: "63411",
        areaCode: "352",
        areaCodeDefinedManual: false
    },
    {
        cityId: "364",
        provinceId: "12",
        provinceName: "Kalimantan Barat",
        cityName: "Kabupaten Pontianak",
        postalCode: "78971",
        areaCode: "561",
        areaCodeDefinedManual: false
    },
    {
        cityId: "365",
        provinceId: "12",
        provinceName: "Kalimantan Barat",
        cityName: "Kota Pontianak",
        postalCode: "78112",
        areaCode: "561",
        areaCodeDefinedManual: false
    },
    {
        cityId: "366",
        provinceId: "29",
        provinceName: "Sulawesi Tengah",
        cityName: "Kabupaten Poso",
        postalCode: "94615",
        areaCode: "452",
        areaCodeDefinedManual: false
    },
    {
        cityId: "367",
        provinceId: "33",
        provinceName: "Sumatera Selatan",
        cityName: "Kota Prabumulih",
        postalCode: "31121",
        areaCode: "713",
        areaCodeDefinedManual: false
    },
    {
        cityId: "368",
        provinceId: "18",
        provinceName: "Lampung",
        cityName: "Kabupaten Pringsewu",
        postalCode: "35719",
        areaCode: "729",
        areaCodeDefinedManual: false
    },
    {
        cityId: "369",
        provinceId: "11",
        provinceName: "Jawa Timur",
        cityName: "Kabupaten Probolinggo",
        postalCode: "67282",
        areaCode: "335",
        areaCodeDefinedManual: false
    },
    {
        cityId: "370",
        provinceId: "11",
        provinceName: "Jawa Timur",
        cityName: "Kota Probolinggo",
        postalCode: "67215",
        areaCode: "335",
        areaCodeDefinedManual: false
    },
    {
        cityId: "371",
        provinceId: "14",
        provinceName: "Kalimantan Tengah",
        cityName: "Kabupaten Pulang Pisau",
        postalCode: "74811",
        areaCode: "536",
        areaCodeDefinedManual: true
    },
    {
        cityId: "372",
        provinceId: "20",
        provinceName: "Maluku Utara",
        cityName: "Kabupaten Pulau Morotai",
        postalCode: "97771",
        areaCode: "923",
        areaCodeDefinedManual: false
    },
    {
        cityId: "373",
        provinceId: "24",
        provinceName: "Papua",
        cityName: "Kabupaten Puncak",
        postalCode: "98981",
        areaCode: "901",
        areaCodeDefinedManual: true
    },
    {
        cityId: "374",
        provinceId: "24",
        provinceName: "Papua",
        cityName: "Kabupaten Puncak Jaya",
        postalCode: "98979",
        areaCode: "901",
        areaCodeDefinedManual: true
    },
    {
        cityId: "375",
        provinceId: "10",
        provinceName: "Jawa Tengah",
        cityName: "Kabupaten Purbalingga",
        postalCode: "53312",
        areaCode: "281",
        areaCodeDefinedManual: false
    },
    {
        cityId: "376",
        provinceId: "9",
        provinceName: "Jawa Barat",
        cityName: "Kabupaten Purwakarta",
        postalCode: "41119",
        areaCode: "264",
        areaCodeDefinedManual: false
    },
    {
        cityId: "377",
        provinceId: "10",
        provinceName: "Jawa Tengah",
        cityName: "Kabupaten Purworejo",
        postalCode: "54111",
        areaCode: "275",
        areaCodeDefinedManual: false
    },
    {
        cityId: "378",
        provinceId: "25",
        provinceName: "Papua Barat",
        cityName: "Kabupaten Raja Ampat",
        postalCode: "98489",
        areaCode: "923",
        areaCodeDefinedManual: false
    },
    {
        cityId: "379",
        provinceId: "4",
        provinceName: "Bengkulu",
        cityName: "Kabupaten Rejang Lebong",
        postalCode: "39112",
        areaCode: "732",
        areaCodeDefinedManual: false
    },
    {
        cityId: "380",
        provinceId: "10",
        provinceName: "Jawa Tengah",
        cityName: "Kabupaten Rembang",
        postalCode: "59219",
        areaCode: "295",
        areaCodeDefinedManual: false
    },
    {
        cityId: "381",
        provinceId: "26",
        provinceName: "Riau",
        cityName: "Kabupaten Rokan Hilir",
        postalCode: "28992",
        areaCode: "624",
        areaCodeDefinedManual: false
    },
    {
        cityId: "382",
        provinceId: "26",
        provinceName: "Riau",
        cityName: "Kabupaten Rokan Hulu",
        postalCode: "28511",
        areaCode: "762",
        areaCodeDefinedManual: false
    },
    {
        cityId: "383",
        provinceId: "23",
        provinceName: "Nusa Tenggara Timur (NTT)",
        cityName: "Kabupaten Rote Ndao",
        postalCode: "85982",
        areaCode: "380",
        areaCodeDefinedManual: false
    },
    {
        cityId: "384",
        provinceId: "21",
        provinceName: "Nanggroe Aceh Darussalam (NAD)",
        cityName: "Kota Sabang",
        postalCode: "23512",
        areaCode: "652",
        areaCodeDefinedManual: false
    },
    {
        cityId: "385",
        provinceId: "23",
        provinceName: "Nusa Tenggara Timur (NTT)",
        cityName: "Kabupaten Sabu Raijua",
        postalCode: "85391",
        areaCode: "380",
        areaCodeDefinedManual: false
    },
    {
        cityId: "386",
        provinceId: "10",
        provinceName: "Jawa Tengah",
        cityName: "Kota Salatiga",
        postalCode: "50711",
        areaCode: "298",
        areaCodeDefinedManual: false
    },
    {
        cityId: "387",
        provinceId: "15",
        provinceName: "Kalimantan Timur",
        cityName: "Kota Samarinda",
        postalCode: "75133",
        areaCode: "541",
        areaCodeDefinedManual: false
    },
    {
        cityId: "388",
        provinceId: "12",
        provinceName: "Kalimantan Barat",
        cityName: "Kabupaten Sambas",
        postalCode: "79453",
        areaCode: "562",
        areaCodeDefinedManual: false
    },
    {
        cityId: "389",
        provinceId: "34",
        provinceName: "Sumatera Utara",
        cityName: "Kabupaten Samosir",
        postalCode: "22392",
        areaCode: "625",
        areaCodeDefinedManual: false
    },
    {
        cityId: "390",
        provinceId: "11",
        provinceName: "Jawa Timur",
        cityName: "Kabupaten Sampang",
        postalCode: "69219",
        areaCode: "323",
        areaCodeDefinedManual: false
    },
    {
        cityId: "391",
        provinceId: "12",
        provinceName: "Kalimantan Barat",
        cityName: "Kabupaten Sanggau",
        postalCode: "78557",
        areaCode: "564",
        areaCodeDefinedManual: false
    },
    {
        cityId: "392",
        provinceId: "24",
        provinceName: "Papua",
        cityName: "Kabupaten Sarmi",
        postalCode: "99373",
        areaCode: "966",
        areaCodeDefinedManual: false
    },
    {
        cityId: "393",
        provinceId: "8",
        provinceName: "Jambi",
        cityName: "Kabupaten Sarolangun",
        postalCode: "37419",
        areaCode: "745",
        areaCodeDefinedManual: false
    },
    {
        cityId: "394",
        provinceId: "32",
        provinceName: "Sumatera Barat",
        cityName: "Kota Sawah Lunto",
        postalCode: "27416",
        areaCode: "754",
        areaCodeDefinedManual: false
    },
    {
        cityId: "395",
        provinceId: "12",
        provinceName: "Kalimantan Barat",
        cityName: "Kabupaten Sekadau",
        postalCode: "79583",
        areaCode: "534",
        areaCodeDefinedManual: true
    },
    {
        cityId: "396",
        provinceId: "28",
        provinceName: "Sulawesi Selatan",
        cityName: "Kabupaten Selayar (Kepulauan Selayar)",
        postalCode: "92812",
        areaCode: "414",
        areaCodeDefinedManual: false
    },
    {
        cityId: "397",
        provinceId: "4",
        provinceName: "Bengkulu",
        cityName: "Kabupaten Seluma",
        postalCode: "38811",
        areaCode: "736",
        areaCodeDefinedManual: false
    },
    {
        cityId: "398",
        provinceId: "10",
        provinceName: "Jawa Tengah",
        cityName: "Kabupaten Semarang",
        postalCode: "50511",
        areaCode: "24",
        areaCodeDefinedManual: false
    },
    {
        cityId: "399",
        provinceId: "10",
        provinceName: "Jawa Tengah",
        cityName: "Kota Semarang",
        postalCode: "50135",
        areaCode: "24",
        areaCodeDefinedManual: false
    },
    {
        cityId: "400",
        provinceId: "19",
        provinceName: "Maluku",
        cityName: "Kabupaten Seram Bagian Barat",
        postalCode: "97561",
        areaCode: "911",
        areaCodeDefinedManual: false
    },
    {
        cityId: "401",
        provinceId: "19",
        provinceName: "Maluku",
        cityName: "Kabupaten Seram Bagian Timur",
        postalCode: "97581",
        areaCode: "915",
        areaCodeDefinedManual: false
    },
    {
        cityId: "402",
        provinceId: "3",
        provinceName: "Banten",
        cityName: "Kabupaten Serang",
        postalCode: "42182",
        areaCode: "254",
        areaCodeDefinedManual: false
    },
    {
        cityId: "403",
        provinceId: "3",
        provinceName: "Banten",
        cityName: "Kota Serang",
        postalCode: "42111",
        areaCode: "254",
        areaCodeDefinedManual: false
    },
    {
        cityId: "404",
        provinceId: "34",
        provinceName: "Sumatera Utara",
        cityName: "Kabupaten Serdang Bedagai",
        postalCode: "20915",
        areaCode: "61",
        areaCodeDefinedManual: false
    },
    {
        cityId: "405",
        provinceId: "14",
        provinceName: "Kalimantan Tengah",
        cityName: "Kabupaten Seruyan",
        postalCode: "74211",
        areaCode: "536",
        areaCodeDefinedManual: true
    },
    {
        cityId: "406",
        provinceId: "26",
        provinceName: "Riau",
        cityName: "Kabupaten Siak",
        postalCode: "28623",
        areaCode: "761",
        areaCodeDefinedManual: false
    },
    {
        cityId: "407",
        provinceId: "34",
        provinceName: "Sumatera Utara",
        cityName: "Kota Sibolga",
        postalCode: "22522",
        areaCode: "631",
        areaCodeDefinedManual: false
    },
    {
        cityId: "408",
        provinceId: "28",
        provinceName: "Sulawesi Selatan",
        cityName: "Kabupaten Sidenreng Rappang/Rapang",
        postalCode: "91613",
        areaCode: "420",
        areaCodeDefinedManual: true
    },
    {
        cityId: "409",
        provinceId: "11",
        provinceName: "Jawa Timur",
        cityName: "Kabupaten Sidoarjo",
        postalCode: "61219",
        areaCode: "31",
        areaCodeDefinedManual: false
    },
    {
        cityId: "410",
        provinceId: "29",
        provinceName: "Sulawesi Tengah",
        cityName: "Kabupaten Sigi",
        postalCode: "94364",
        areaCode: "451",
        areaCodeDefinedManual: true
    },
    {
        cityId: "411",
        provinceId: "32",
        provinceName: "Sumatera Barat",
        cityName: "Kabupaten Sijunjung (Sawah Lunto Sijunjung)",
        postalCode: "27511",
        areaCode: "754",
        areaCodeDefinedManual: false
    },
    {
        cityId: "412",
        provinceId: "23",
        provinceName: "Nusa Tenggara Timur (NTT)",
        cityName: "Kabupaten Sikka",
        postalCode: "86121",
        areaCode: "382",
        areaCodeDefinedManual: false
    },
    {
        cityId: "413",
        provinceId: "34",
        provinceName: "Sumatera Utara",
        cityName: "Kabupaten Simalungun",
        postalCode: "21162",
        areaCode: "622",
        areaCodeDefinedManual: false
    },
    {
        cityId: "414",
        provinceId: "21",
        provinceName: "Nanggroe Aceh Darussalam (NAD)",
        cityName: "Kabupaten Simeulue",
        postalCode: "23891",
        areaCode: "650",
        areaCodeDefinedManual: false
    },
    {
        cityId: "415",
        provinceId: "12",
        provinceName: "Kalimantan Barat",
        cityName: "Kota Singkawang",
        postalCode: "79117",
        areaCode: "562",
        areaCodeDefinedManual: false
    },
    {
        cityId: "416",
        provinceId: "28",
        provinceName: "Sulawesi Selatan",
        cityName: "Kabupaten Sinjai",
        postalCode: "92615",
        areaCode: "482",
        areaCodeDefinedManual: false
    },
    {
        cityId: "417",
        provinceId: "12",
        provinceName: "Kalimantan Barat",
        cityName: "Kabupaten Sintang",
        postalCode: "78619",
        areaCode: "565",
        areaCodeDefinedManual: false
    },
    {
        cityId: "418",
        provinceId: "11",
        provinceName: "Jawa Timur",
        cityName: "Kabupaten Situbondo",
        postalCode: "68316",
        areaCode: "338",
        areaCodeDefinedManual: false
    },
    {
        cityId: "419",
        provinceId: "5",
        provinceName: "DI Yogyakarta",
        cityName: "Kabupaten Sleman",
        postalCode: "55513",
        areaCode: "274",
        areaCodeDefinedManual: false
    },
    {
        cityId: "420",
        provinceId: "32",
        provinceName: "Sumatera Barat",
        cityName: "Kabupaten Solok",
        postalCode: "27365",
        areaCode: "755",
        areaCodeDefinedManual: false
    },
    {
        cityId: "421",
        provinceId: "32",
        provinceName: "Sumatera Barat",
        cityName: "Kota Solok",
        postalCode: "27315",
        areaCode: "755",
        areaCodeDefinedManual: false
    },
    {
        cityId: "422",
        provinceId: "32",
        provinceName: "Sumatera Barat",
        cityName: "Kabupaten Solok Selatan",
        postalCode: "27779",
        areaCode: "755",
        areaCodeDefinedManual: false
    },
    {
        cityId: "423",
        provinceId: "28",
        provinceName: "Sulawesi Selatan",
        cityName: "Kabupaten Soppeng",
        postalCode: "90812",
        areaCode: "484",
        areaCodeDefinedManual: false
    },
    {
        cityId: "424",
        provinceId: "25",
        provinceName: "Papua Barat",
        cityName: "Kabupaten Sorong",
        postalCode: "98431",
        areaCode: "951",
        areaCodeDefinedManual: false
    },
    {
        cityId: "425",
        provinceId: "25",
        provinceName: "Papua Barat",
        cityName: "Kota Sorong",
        postalCode: "98411",
        areaCode: "951",
        areaCodeDefinedManual: false
    },
    {
        cityId: "426",
        provinceId: "25",
        provinceName: "Papua Barat",
        cityName: "Kabupaten Sorong Selatan",
        postalCode: "98454",
        areaCode: "951",
        areaCodeDefinedManual: false
    },
    {
        cityId: "427",
        provinceId: "10",
        provinceName: "Jawa Tengah",
        cityName: "Kabupaten Sragen",
        postalCode: "57211",
        areaCode: "271",
        areaCodeDefinedManual: false
    },
    {
        cityId: "428",
        provinceId: "9",
        provinceName: "Jawa Barat",
        cityName: "Kabupaten Subang",
        postalCode: "41215",
        areaCode: "260",
        areaCodeDefinedManual: false
    },
    {
        cityId: "429",
        provinceId: "21",
        provinceName: "Nanggroe Aceh Darussalam (NAD)",
        cityName: "Kota Subulussalam",
        postalCode: "24882",
        areaCode: "627",
        areaCodeDefinedManual: false
    },
    {
        cityId: "430",
        provinceId: "9",
        provinceName: "Jawa Barat",
        cityName: "Kabupaten Sukabumi",
        postalCode: "43311",
        areaCode: "266",
        areaCodeDefinedManual: false
    },
    {
        cityId: "431",
        provinceId: "9",
        provinceName: "Jawa Barat",
        cityName: "Kota Sukabumi",
        postalCode: "43114",
        areaCode: "266",
        areaCodeDefinedManual: false
    },
    {
        cityId: "432",
        provinceId: "14",
        provinceName: "Kalimantan Tengah",
        cityName: "Kabupaten Sukamara",
        postalCode: "74712",
        areaCode: "532",
        areaCodeDefinedManual: true
    },
    {
        cityId: "433",
        provinceId: "10",
        provinceName: "Jawa Tengah",
        cityName: "Kabupaten Sukoharjo",
        postalCode: "57514",
        areaCode: "271",
        areaCodeDefinedManual: false
    },
    {
        cityId: "434",
        provinceId: "23",
        provinceName: "Nusa Tenggara Timur (NTT)",
        cityName: "Kabupaten Sumba Barat",
        postalCode: "87219",
        areaCode: "387",
        areaCodeDefinedManual: false
    },
    {
        cityId: "435",
        provinceId: "23",
        provinceName: "Nusa Tenggara Timur (NTT)",
        cityName: "Kabupaten Sumba Barat Daya",
        postalCode: "87453",
        areaCode: "387",
        areaCodeDefinedManual: false
    },
    {
        cityId: "436",
        provinceId: "23",
        provinceName: "Nusa Tenggara Timur (NTT)",
        cityName: "Kabupaten Sumba Tengah",
        postalCode: "87358",
        areaCode: "387",
        areaCodeDefinedManual: false
    },
    {
        cityId: "437",
        provinceId: "23",
        provinceName: "Nusa Tenggara Timur (NTT)",
        cityName: "Kabupaten Sumba Timur",
        postalCode: "87112",
        areaCode: "387",
        areaCodeDefinedManual: false
    },
    {
        cityId: "438",
        provinceId: "22",
        provinceName: "Nusa Tenggara Barat (NTB)",
        cityName: "Kabupaten Sumbawa",
        postalCode: "84315",
        areaCode: "371",
        areaCodeDefinedManual: false
    },
    {
        cityId: "439",
        provinceId: "22",
        provinceName: "Nusa Tenggara Barat (NTB)",
        cityName: "Kabupaten Sumbawa Barat",
        postalCode: "84419",
        areaCode: "371",
        areaCodeDefinedManual: false
    },
    {
        cityId: "440",
        provinceId: "9",
        provinceName: "Jawa Barat",
        cityName: "Kabupaten Sumedang",
        postalCode: "45326",
        areaCode: "22",
        areaCodeDefinedManual: false
    },
    {
        cityId: "441",
        provinceId: "11",
        provinceName: "Jawa Timur",
        cityName: "Kabupaten Sumenep",
        postalCode: "69413",
        areaCode: "328",
        areaCodeDefinedManual: false
    },
    {
        cityId: "442",
        provinceId: "8",
        provinceName: "Jambi",
        cityName: "Kota Sungaipenuh",
        postalCode: "37113",
        areaCode: "748",
        areaCodeDefinedManual: false
    },
    {
        cityId: "443",
        provinceId: "24",
        provinceName: "Papua",
        cityName: "Kabupaten Supiori",
        postalCode: "98164",
        areaCode: "967",
        areaCodeDefinedManual: true
    },
    {
        cityId: "444",
        provinceId: "11",
        provinceName: "Jawa Timur",
        cityName: "Kota Surabaya",
        postalCode: "60119",
        areaCode: "31",
        areaCodeDefinedManual: false
    },
    {
        cityId: "445",
        provinceId: "10",
        provinceName: "Jawa Tengah",
        cityName: "Kota Surakarta (Solo)",
        postalCode: "57113",
        areaCode: "271",
        areaCodeDefinedManual: false
    },
    {
        cityId: "446",
        provinceId: "13",
        provinceName: "Kalimantan Selatan",
        cityName: "Kabupaten Tabalong",
        postalCode: "71513",
        areaCode: "526",
        areaCodeDefinedManual: false
    },
    {
        cityId: "447",
        provinceId: "1",
        provinceName: "Bali",
        cityName: "Kabupaten Tabanan",
        postalCode: "82119",
        areaCode: "361",
        areaCodeDefinedManual: false
    },
    {
        cityId: "448",
        provinceId: "28",
        provinceName: "Sulawesi Selatan",
        cityName: "Kabupaten Takalar",
        postalCode: "92212",
        areaCode: "418",
        areaCodeDefinedManual: false
    },
    {
        cityId: "449",
        provinceId: "25",
        provinceName: "Papua Barat",
        cityName: "Kabupaten Tambrauw",
        postalCode: "98475",
        areaCode: "951",
        areaCodeDefinedManual: true
    },
    {
        cityId: "450",
        provinceId: "16",
        provinceName: "Kalimantan Utara",
        cityName: "Kabupaten Tana Tidung",
        postalCode: "77611",
        areaCode: "552",
        areaCodeDefinedManual: false
    },
    {
        cityId: "451",
        provinceId: "28",
        provinceName: "Sulawesi Selatan",
        cityName: "Kabupaten Tana Toraja",
        postalCode: "91819",
        areaCode: "423",
        areaCodeDefinedManual: false
    },
    {
        cityId: "452",
        provinceId: "13",
        provinceName: "Kalimantan Selatan",
        cityName: "Kabupaten Tanah Bumbu",
        postalCode: "72211",
        areaCode: "518",
        areaCodeDefinedManual: false
    },
    {
        cityId: "453",
        provinceId: "32",
        provinceName: "Sumatera Barat",
        cityName: "Kabupaten Tanah Datar",
        postalCode: "27211",
        areaCode: "752",
        areaCodeDefinedManual: false
    },
    {
        cityId: "454",
        provinceId: "13",
        provinceName: "Kalimantan Selatan",
        cityName: "Kabupaten Tanah Laut",
        postalCode: "70811",
        areaCode: "512",
        areaCodeDefinedManual: false
    },
    {
        cityId: "455",
        provinceId: "3",
        provinceName: "Banten",
        cityName: "Kabupaten Tangerang",
        postalCode: "15914",
        areaCode: "21",
        areaCodeDefinedManual: false
    },
    {
        cityId: "456",
        provinceId: "3",
        provinceName: "Banten",
        cityName: "Kota Tangerang",
        postalCode: "15111",
        areaCode: "21",
        areaCodeDefinedManual: false
    },
    {
        cityId: "457",
        provinceId: "3",
        provinceName: "Banten",
        cityName: "Kota Tangerang Selatan",
        postalCode: "15332",
        areaCode: "21",
        areaCodeDefinedManual: false
    },
    {
        cityId: "458",
        provinceId: "18",
        provinceName: "Lampung",
        cityName: "Kabupaten Tanggamus",
        postalCode: "35619",
        areaCode: "722",
        areaCodeDefinedManual: false
    },
    {
        cityId: "459",
        provinceId: "34",
        provinceName: "Sumatera Utara",
        cityName: "Kota Tanjung Balai",
        postalCode: "21321",
        areaCode: "623",
        areaCodeDefinedManual: false
    },
    {
        cityId: "460",
        provinceId: "8",
        provinceName: "Jambi",
        cityName: "Kabupaten Tanjung Jabung Barat",
        postalCode: "36513",
        areaCode: "742",
        areaCodeDefinedManual: false
    },
    {
        cityId: "461",
        provinceId: "8",
        provinceName: "Jambi",
        cityName: "Kabupaten Tanjung Jabung Timur",
        postalCode: "36719",
        areaCode: "740",
        areaCodeDefinedManual: false
    },
    {
        cityId: "462",
        provinceId: "17",
        provinceName: "Kepulauan Riau",
        cityName: "Kota Tanjung Pinang",
        postalCode: "29111",
        areaCode: "771",
        areaCodeDefinedManual: false
    },
    {
        cityId: "463",
        provinceId: "34",
        provinceName: "Sumatera Utara",
        cityName: "Kabupaten Tapanuli Selatan",
        postalCode: "22742",
        areaCode: "634",
        areaCodeDefinedManual: false
    },
    {
        cityId: "464",
        provinceId: "34",
        provinceName: "Sumatera Utara",
        cityName: "Kabupaten Tapanuli Tengah",
        postalCode: "22611",
        areaCode: "631",
        areaCodeDefinedManual: false
    },
    {
        cityId: "465",
        provinceId: "34",
        provinceName: "Sumatera Utara",
        cityName: "Kabupaten Tapanuli Utara",
        postalCode: "22414",
        areaCode: "633",
        areaCodeDefinedManual: false
    },
    {
        cityId: "466",
        provinceId: "13",
        provinceName: "Kalimantan Selatan",
        cityName: "Kabupaten Tapin",
        postalCode: "71119",
        areaCode: "517",
        areaCodeDefinedManual: false
    },
    {
        cityId: "467",
        provinceId: "16",
        provinceName: "Kalimantan Utara",
        cityName: "Kota Tarakan",
        postalCode: "77114",
        areaCode: "551",
        areaCodeDefinedManual: false
    },
    {
        cityId: "468",
        provinceId: "9",
        provinceName: "Jawa Barat",
        cityName: "Kabupaten Tasikmalaya",
        postalCode: "46411",
        areaCode: "265",
        areaCodeDefinedManual: false
    },
    {
        cityId: "469",
        provinceId: "9",
        provinceName: "Jawa Barat",
        cityName: "Kota Tasikmalaya",
        postalCode: "46116",
        areaCode: "265",
        areaCodeDefinedManual: false
    },
    {
        cityId: "470",
        provinceId: "34",
        provinceName: "Sumatera Utara",
        cityName: "Kota Tebing Tinggi",
        postalCode: "20632",
        areaCode: "621",
        areaCodeDefinedManual: false
    },
    {
        cityId: "471",
        provinceId: "8",
        provinceName: "Jambi",
        cityName: "Kabupaten Tebo",
        postalCode: "37519",
        areaCode: "744",
        areaCodeDefinedManual: false
    },
    {
        cityId: "472",
        provinceId: "10",
        provinceName: "Jawa Tengah",
        cityName: "Kabupaten Tegal",
        postalCode: "52419",
        areaCode: "283",
        areaCodeDefinedManual: false
    },
    {
        cityId: "473",
        provinceId: "10",
        provinceName: "Jawa Tengah",
        cityName: "Kota Tegal",
        postalCode: "52114",
        areaCode: "283",
        areaCodeDefinedManual: false
    },
    {
        cityId: "474",
        provinceId: "25",
        provinceName: "Papua Barat",
        cityName: "Kabupaten Teluk Bintuni",
        postalCode: "98551",
        areaCode: "923",
        areaCodeDefinedManual: false
    },
    {
        cityId: "475",
        provinceId: "25",
        provinceName: "Papua Barat",
        cityName: "Kabupaten Teluk Wondama",
        postalCode: "98591",
        areaCode: "980",
        areaCodeDefinedManual: false
    },
    {
        cityId: "476",
        provinceId: "10",
        provinceName: "Jawa Tengah",
        cityName: "Kabupaten Temanggung",
        postalCode: "56212",
        areaCode: "293",
        areaCodeDefinedManual: false
    },
    {
        cityId: "477",
        provinceId: "20",
        provinceName: "Maluku Utara",
        cityName: "Kota Ternate",
        postalCode: "97714",
        areaCode: "921",
        areaCodeDefinedManual: false
    },
    {
        cityId: "478",
        provinceId: "20",
        provinceName: "Maluku Utara",
        cityName: "Kota Tidore Kepulauan",
        postalCode: "97815",
        areaCode: "921",
        areaCodeDefinedManual: true
    },
    {
        cityId: "479",
        provinceId: "23",
        provinceName: "Nusa Tenggara Timur (NTT)",
        cityName: "Kabupaten Timor Tengah Selatan",
        postalCode: "85562",
        areaCode: "388",
        areaCodeDefinedManual: false
    },
    {
        cityId: "480",
        provinceId: "23",
        provinceName: "Nusa Tenggara Timur (NTT)",
        cityName: "Kabupaten Timor Tengah Utara",
        postalCode: "85612",
        areaCode: "388",
        areaCodeDefinedManual: false
    },
    {
        cityId: "481",
        provinceId: "34",
        provinceName: "Sumatera Utara",
        cityName: "Kabupaten Toba Samosir",
        postalCode: "22316",
        areaCode: "632",
        areaCodeDefinedManual: false
    },
    {
        cityId: "482",
        provinceId: "29",
        provinceName: "Sulawesi Tengah",
        cityName: "Kabupaten Tojo Una-Una",
        postalCode: "94683",
        areaCode: "464",
        areaCodeDefinedManual: false
    },
    {
        cityId: "483",
        provinceId: "29",
        provinceName: "Sulawesi Tengah",
        cityName: "Kabupaten Toli-Toli",
        postalCode: "94542",
        areaCode: "453",
        areaCodeDefinedManual: false
    },
    {
        cityId: "484",
        provinceId: "24",
        provinceName: "Papua",
        cityName: "Kabupaten Tolikara",
        postalCode: "99411",
        areaCode: "969",
        areaCodeDefinedManual: false
    },
    {
        cityId: "485",
        provinceId: "31",
        provinceName: "Sulawesi Utara",
        cityName: "Kota Tomohon",
        postalCode: "95416",
        areaCode: "431",
        areaCodeDefinedManual: false
    },
    {
        cityId: "486",
        provinceId: "28",
        provinceName: "Sulawesi Selatan",
        cityName: "Kabupaten Toraja Utara",
        postalCode: "91831",
        areaCode: "423",
        areaCodeDefinedManual: false
    },
    {
        cityId: "487",
        provinceId: "11",
        provinceName: "Jawa Timur",
        cityName: "Kabupaten Trenggalek",
        postalCode: "66312",
        areaCode: "355",
        areaCodeDefinedManual: false
    },
    {
        cityId: "488",
        provinceId: "19",
        provinceName: "Maluku",
        cityName: "Kota Tual",
        postalCode: "97612",
        areaCode: "916",
        areaCodeDefinedManual: false
    },
    {
        cityId: "489",
        provinceId: "11",
        provinceName: "Jawa Timur",
        cityName: "Kabupaten Tuban",
        postalCode: "62319",
        areaCode: "356",
        areaCodeDefinedManual: false
    },
    {
        cityId: "490",
        provinceId: "18",
        provinceName: "Lampung",
        cityName: "Kabupaten Tulang Bawang",
        postalCode: "34613",
        areaCode: "726",
        areaCodeDefinedManual: false
    },
    {
        cityId: "491",
        provinceId: "18",
        provinceName: "Lampung",
        cityName: "Kabupaten Tulang Bawang Barat",
        postalCode: "34419",
        areaCode: "726",
        areaCodeDefinedManual: false
    },
    {
        cityId: "492",
        provinceId: "11",
        provinceName: "Jawa Timur",
        cityName: "Kabupaten Tulungagung",
        postalCode: "66212",
        areaCode: "355",
        areaCodeDefinedManual: false
    },
    {
        cityId: "493",
        provinceId: "28",
        provinceName: "Sulawesi Selatan",
        cityName: "Kabupaten Wajo",
        postalCode: "90911",
        areaCode: "485",
        areaCodeDefinedManual: false
    },
    {
        cityId: "494",
        provinceId: "30",
        provinceName: "Sulawesi Tenggara",
        cityName: "Kabupaten Wakatobi",
        postalCode: "93791",
        areaCode: "402",
        areaCodeDefinedManual: true
    },
    {
        cityId: "495",
        provinceId: "24",
        provinceName: "Papua",
        cityName: "Kabupaten Waropen",
        postalCode: "98269",
        areaCode: "967",
        areaCodeDefinedManual: true
    },
    {
        cityId: "496",
        provinceId: "18",
        provinceName: "Lampung",
        cityName: "Kabupaten Way Kanan",
        postalCode: "34711",
        areaCode: "723",
        areaCodeDefinedManual: false
    },
    {
        cityId: "497",
        provinceId: "10",
        provinceName: "Jawa Tengah",
        cityName: "Kabupaten Wonogiri",
        postalCode: "57619",
        areaCode: "273",
        areaCodeDefinedManual: false
    },
    {
        cityId: "498",
        provinceId: "10",
        provinceName: "Jawa Tengah",
        cityName: "Kabupaten Wonosobo",
        postalCode: "56311",
        areaCode: "286",
        areaCodeDefinedManual: false
    },
    {
        cityId: "499",
        provinceId: "24",
        provinceName: "Papua",
        cityName: "Kabupaten Yahukimo",
        postalCode: "99041",
        areaCode: "967",
        areaCodeDefinedManual: true
    },
    {
        cityId: "500",
        provinceId: "24",
        provinceName: "Papua",
        cityName: "Kabupaten Yalimo",
        postalCode: "99481",
        areaCode: "967",
        areaCodeDefinedManual: true
    },
    {
        cityId: "501",
        provinceId: "5",
        provinceName: "DI Yogyakarta",
        cityName: "Kota Yogyakarta",
        postalCode: "55111",
        areaCode: "274",
        areaCodeDefinedManual: false
    }
]

const getCitiesByProvinceName = (provinceName: string)=>{
    return CITIES.filter((item)=>item.provinceName === provinceName);
}
export {
    getCitiesByProvinceName
}
export default CITIES;
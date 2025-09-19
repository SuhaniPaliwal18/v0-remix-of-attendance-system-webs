"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Building2,
  Clock,
  LogOut,
  Moon,
  Sun,
  ArrowLeft,
  Users,
  GraduationCap,
  TrendingUp,
  MapPin,
  School,
  BarChart3,
} from "lucide-react"
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"
import { useTheme } from "@/components/theme-provider"
import { useAuth } from "@/components/auth-provider"

const stateDistrictData = {
  "Andhra Pradesh": [
    "Anantapur",
    "Chittoor",
    "East Godavari",
    "Guntur",
    "Krishna",
    "Kurnool",
    "Nellore",
    "Prakasam",
    "Srikakulam",
    "Visakhapatnam",
    "Vizianagaram",
    "West Godavari",
    "YSR Kadapa",
    "Alluri Sitharama Raju",
    "Anakapalli",
    "Annamayya",
    "Bapatla",
    "Eluru",
    "Kakinada",
    "Konaseema",
    "Manyam",
    "NTR",
    "Palnadu",
    "Parvathipuram Manyam",
    "Sri Sathya Sai",
    "Tirupati",
  ],
  "Arunachal Pradesh": [
    "Anjaw",
    "Changlang",
    "Dibang Valley",
    "East Kameng",
    "East Siang",
    "Kamle",
    "Kra Daadi",
    "Kurung Kumey",
    "Lepa Rada",
    "Lohit",
    "Longding",
    "Lower Dibang Valley",
    "Lower Siang",
    "Lower Subansiri",
    "Namsai",
    "Pakke Kessang",
    "Papum Pare",
    "Shi Yomi",
    "Siang",
    "Tawang",
    "Tirap",
    "Upper Siang",
    "Upper Subansiri",
    "West Kameng",
    "West Siang",
    "Itanagar",
    "Keyi Panyor",
  ],
  Assam: [
    "Baksa",
    "Barpeta",
    "Biswanath",
    "Bongaigaon",
    "Cachar",
    "Charaideo",
    "Chirang",
    "Darrang",
    "Dhemaji",
    "Dhubri",
    "Dibrugarh",
    "Goalpara",
    "Golaghat",
    "Hailakandi",
    "Hojai",
    "Jorhat",
    "Kamrup",
    "Kamrup Metropolitan",
    "Karbi Anglong",
    "Karimganj",
    "Kokrajhar",
    "Lakhimpur",
    "Majuli",
    "Morigaon",
    "Nagaon",
    "Nalbari",
    "Dima Hasao",
    "Sivasagar",
    "Sonitpur",
    "South Salmara-Mankachar",
    "Tinsukia",
    "Udalguri",
    "West Karbi Anglong",
    "Bajali",
    "Tamulpur",
  ],
  Bihar: [
    "Araria",
    "Arwal",
    "Aurangabad",
    "Banka",
    "Begusarai",
    "Bhagalpur",
    "Bhojpur",
    "Buxar",
    "Darbhanga",
    "East Champaran",
    "Gaya",
    "Gopalganj",
    "Jamui",
    "Jehanabad",
    "Kaimur",
    "Katihar",
    "Khagaria",
    "Kishanganj",
    "Lakhisarai",
    "Madhepura",
    "Madhubani",
    "Munger",
    "Muzaffarpur",
    "Nalanda",
    "Nawada",
    "Patna",
    "Purnia",
    "Rohtas",
    "Saharsa",
    "Samastipur",
    "Saran",
    "Sheikhpura",
    "Sheohar",
    "Sitamarhi",
    "Siwan",
    "Supaul",
    "Vaishali",
    "West Champaran",
  ],
  Chhattisgarh: [
    "Balod",
    "Baloda Bazar",
    "Balrampur",
    "Bastar",
    "Bemetara",
    "Bijapur",
    "Bilaspur",
    "Dantewada",
    "Dhamtari",
    "Durg",
    "Gariaband",
    "Gaurela Pendra Marwahi",
    "Janjgir Champa",
    "Jashpur",
    "Kabirdham",
    "Kanker",
    "Kondagaon",
    "Korba",
    "Koriya",
    "Mahasamund",
    "Mungeli",
    "Narayanpur",
    "Raigarh",
    "Raipur",
    "Rajnandgaon",
    "Sukma",
    "Surajpur",
    "Surguja",
    "Khairagarh Chhuikhadan Gandai",
    "Mohla Manpur Ambagarh Chowki",
    "Sarangarh Bilaigarh",
    "Shakti",
    "Manendragarh Chirmiri Bharatpur",
  ],
  Goa: ["North Goa", "South Goa"],
  Gujarat: [
    "Ahmedabad",
    "Amreli",
    "Anand",
    "Aravalli",
    "Banaskantha",
    "Bharuch",
    "Bhavnagar",
    "Botad",
    "Chhota Udepur",
    "Dahod",
    "Dang",
    "Devbhoomi Dwarka",
    "Gandhinagar",
    "Gir Somnath",
    "Jamnagar",
    "Junagadh",
    "Kheda",
    "Kutch",
    "Mahisagar",
    "Mehsana",
    "Morbi",
    "Narmada",
    "Navsari",
    "Panchmahal",
    "Patan",
    "Porbandar",
    "Rajkot",
    "Sabarkantha",
    "Surat",
    "Surendranagar",
    "Tapi",
    "Vadodara",
    "Valsad",
  ],
  Haryana: [
    "Ambala",
    "Bhiwani",
    "Charkhi Dadri",
    "Faridabad",
    "Fatehabad",
    "Gurugram",
    "Hisar",
    "Jhajjar",
    "Jind",
    "Kaithal",
    "Karnal",
    "Kurukshetra",
    "Mahendragarh",
    "Nuh",
    "Palwal",
    "Panchkula",
    "Panipat",
    "Rewari",
    "Rohtak",
    "Sirsa",
    "Sonipat",
    "Yamunanagar",
  ],
  "Himachal Pradesh": [
    "Bilaspur",
    "Chamba",
    "Hamirpur",
    "Kangra",
    "Kinnaur",
    "Kullu",
    "Lahaul Spiti",
    "Mandi",
    "Shimla",
    "Sirmaur",
    "Solan",
    "Una",
  ],
  Jharkhand: [
    "Bokaro",
    "Chatra",
    "Deoghar",
    "Dhanbad",
    "Dumka",
    "East Singhbhum",
    "Garhwa",
    "Giridih",
    "Godda",
    "Gumla",
    "Hazaribagh",
    "Jamtara",
    "Khunti",
    "Koderma",
    "Latehar",
    "Lohardaga",
    "Pakur",
    "Palamu",
    "Ramgarh",
    "Ranchi",
    "Sahebganj",
    "Seraikela Kharsawan",
    "Simdega",
    "West Singhbhum",
  ],
  Karnataka: [
    "Bagalkot",
    "Ballari",
    "Belagavi",
    "Bengaluru Rural",
    "Bengaluru Urban",
    "Bidar",
    "Chamarajanagar",
    "Chikballapur",
    "Chikkamagaluru",
    "Chitradurga",
    "Dakshina Kannada",
    "Davanagere",
    "Dharwad",
    "Gadag",
    "Hassan",
    "Haveri",
    "Kalaburagi",
    "Kodagu",
    "Kolar",
    "Koppal",
    "Mandya",
    "Mysuru",
    "Raichur",
    "Ramanagara",
    "Shivamogga",
    "Tumakuru",
    "Udupi",
    "Uttara Kannada",
    "Vijayapura",
    "Yadgir",
    "Vijayanagara",
  ],
  Kerala: [
    "Alappuzha",
    "Ernakulam",
    "Idukki",
    "Kannur",
    "Kasaragod",
    "Kollam",
    "Kottayam",
    "Kozhikode",
    "Malappuram",
    "Palakkad",
    "Pathanamthitta",
    "Thiruvananthapuram",
    "Thrissur",
    "Wayanad",
  ],
  "Madhya Pradesh": [
    "Agar Malwa",
    "Alirajpur",
    "Anuppur",
    "Ashoknagar",
    "Balaghat",
    "Barwani",
    "Betul",
    "Bhind",
    "Bhopal",
    "Burhanpur",
    "Chachaura",
    "Chhatarpur",
    "Chhindwara",
    "Damoh",
    "Datia",
    "Dewas",
    "Dhar",
    "Dindori",
    "Guna",
    "Gwalior",
    "Harda",
    "Hoshangabad",
    "Indore",
    "Jabalpur",
    "Jhabua",
    "Katni",
    "Khandwa",
    "Khargone",
    "Maihar",
    "Mandla",
    "Mandsaur",
    "Morena",
    "Narsinghpur",
    "Neemuch",
    "Niwari",
    "Panna",
    "Raisen",
    "Rajgarh",
    "Ratlam",
    "Rewa",
    "Sagar",
    "Satna",
    "Sehore",
    "Seoni",
    "Shahdol",
    "Shajapur",
    "Sheopur",
    "Shivpuri",
    "Sidhi",
    "Singrauli",
    "Tikamgarh",
    "Ujjain",
    "Umaria",
    "Vidisha",
  ],
  Maharashtra: [
    "Ahmednagar",
    "Akola",
    "Amravati",
    "Aurangabad",
    "Beed",
    "Bhandara",
    "Buldhana",
    "Chandrapur",
    "Dhule",
    "Gadchiroli",
    "Gondia",
    "Hingoli",
    "Jalgaon",
    "Jalna",
    "Kolhapur",
    "Latur",
    "Mumbai City",
    "Mumbai Suburban",
    "Nagpur",
    "Nanded",
    "Nandurbar",
    "Nashik",
    "Osmanabad",
    "Palghar",
    "Parbhani",
    "Pune",
    "Raigad",
    "Ratnagiri",
    "Sangli",
    "Satara",
    "Sindhudurg",
    "Solapur",
    "Thane",
    "Wardha",
    "Washim",
    "Yavatmal",
  ],
  Manipur: [
    "Bishnupur",
    "Chandel",
    "Churachandpur",
    "Imphal East",
    "Imphal West",
    "Jiribam",
    "Kakching",
    "Kamjong",
    "Kangpokpi",
    "Noney",
    "Pherzawl",
    "Senapati",
    "Tamenglong",
    "Tengnoupal",
    "Thoubal",
    "Ukhrul",
  ],
  Meghalaya: [
    "East Garo Hills",
    "East Jaintia Hills",
    "East Khasi Hills",
    "North Garo Hills",
    "Ri Bhoi",
    "South Garo Hills",
    "South West Garo Hills",
    "South West Khasi Hills",
    "West Garo Hills",
    "West Jaintia Hills",
    "West Khasi Hills",
    "Eastern West Khasi Hills",
  ],
  Mizoram: [
    "Aizawl",
    "Champhai",
    "Hnahthial",
    "Khawzawl",
    "Kolasib",
    "Lawngtlai",
    "Lunglei",
    "Mamit",
    "Saiha",
    "Saitual",
    "Serchhip",
  ],
  Nagaland: [
    "Chumoukedima",
    "Dimapur",
    "Kiphire",
    "Kohima",
    "Longleng",
    "Mokokchung",
    "Mon",
    "Niuland",
    "Noklak",
    "Peren",
    "Phek",
    "Shamator",
    "Tseminyu",
    "Tuensang",
    "Wokha",
    "Zunheboto",
  ],
  Odisha: [
    "Angul",
    "Balangir",
    "Balasore",
    "Bargarh",
    "Bhadrak",
    "Boudh",
    "Cuttack",
    "Deogarh",
    "Dhenkanal",
    "Gajapati",
    "Ganjam",
    "Jagatsinghpur",
    "Jajpur",
    "Jharsuguda",
    "Kalahandi",
    "Kandhamal",
    "Kendrapara",
    "Kendujhar",
    "Khordha",
    "Koraput",
    "Malkangiri",
    "Mayurbhanj",
    "Nabarangpur",
    "Nayagarh",
    "Nuapada",
    "Puri",
    "Rayagada",
    "Sambalpur",
    "Subarnapur",
    "Sundargarh",
  ],
  Punjab: [
    "Amritsar",
    "Barnala",
    "Bathinda",
    "Faridkot",
    "Fatehgarh Sahib",
    "Fazilka",
    "Ferozepur",
    "Gurdaspur",
    "Hoshiarpur",
    "Jalandhar",
    "Kapurthala",
    "Ludhiana",
    "Malerkotla",
    "Mansa",
    "Moga",
    "Mohali",
    "Muktsar",
    "Pathankot",
    "Patiala",
    "Rupnagar",
    "Sangrur",
    "Shaheed Bhagat Singh Nagar",
    "Tarn Taran",
  ],
  Rajasthan: [
    "Ajmer",
    "Alwar",
    "Banswara",
    "Baran",
    "Barmer",
    "Bharatpur",
    "Bhilwara",
    "Bikaner",
    "Bundi",
    "Chittorgarh",
    "Churu",
    "Dausa",
    "Dholpur",
    "Dungarpur",
    "Ganganagar",
    "Hanumangarh",
    "Jaipur",
    "Jaisalmer",
    "Jalore",
    "Jhalawar",
    "Jhunjhunu",
    "Jodhpur",
    "Karauli",
    "Kota",
    "Nagaur",
    "Pali",
    "Pratapgarh",
    "Rajsamand",
    "Sawai Madhopur",
    "Sikar",
    "Sirohi",
    "Tonk",
    "Udaipur",
    "Anupgarh",
    "Balotra",
    "Beawar",
    "Deeg",
    "Didwana Kuchaman",
    "Dudu",
    "Gangapur City",
    "Jaipur Rural",
    "Jaipur Urban",
    "Kekri",
    "Khairthal Tijara",
    "Kotputli Behror",
    "Malpura",
    "Neem Ka Thana",
    "Phalodi",
    "Salumbar",
    "Sanchore",
    "Shahpura",
  ],
  Sikkim: ["East Sikkim", "North Sikkim", "South Sikkim", "West Sikkim", "Pakyong", "Soreng"],
  "Tamil Nadu": [
    "Ariyalur",
    "Chengalpattu",
    "Chennai",
    "Coimbatore",
    "Cuddalore",
    "Dharmapuri",
    "Dindigul",
    "Erode",
    "Kallakurichi",
    "Kanchipuram",
    "Kanyakumari",
    "Karur",
    "Krishnagiri",
    "Madurai",
    "Mayiladuthurai",
    "Nagapattinam",
    "Namakkal",
    "Nilgiris",
    "Perambalur",
    "Pudukkottai",
    "Ramanathapuram",
    "Ranipet",
    "Salem",
    "Sivaganga",
    "Tenkasi",
    "Thanjavur",
    "Theni",
    "Thoothukudi",
    "Tiruchirappalli",
    "Tirunelveli",
    "Tirupattur",
    "Tiruppur",
    "Tiruvallur",
    "Tiruvannamalai",
    "Tiruvarur",
    "Vellore",
    "Viluppuram",
    "Virudhunagar",
  ],
  Telangana: [
    "Adilabad",
    "Bhadradri Kothagudem",
    "Hyderabad",
    "Jagtial",
    "Jangaon",
    "Jayashankar Bhupalpally",
    "Jogulamba Gadwal",
    "Kamareddy",
    "Karimnagar",
    "Khammam",
    "Komaram Bheem Asifabad",
    "Mahabubabad",
    "Mahabubnagar",
    "Mancherial",
    "Medak",
    "Medchal Malkajgiri",
    "Mulugu",
    "Nagarkurnool",
    "Nalgonda",
    "Narayanpet",
    "Nirmal",
    "Nizamabad",
    "Peddapalli",
    "Rajanna Sircilla",
    "Rangareddy",
    "Sangareddy",
    "Siddipet",
    "Suryapet",
    "Vikarabad",
    "Wanaparthy",
    "Warangal Rural",
    "Warangal Urban",
    "Yadadri Bhuvanagiri",
  ],
  Tripura: ["Dhalai", "Gomati", "Khowai", "North Tripura", "Sepahijala", "South Tripura", "Unakoti", "West Tripura"],
  "Uttar Pradesh": [
    "Agra",
    "Aligarh",
    "Ambedkar Nagar",
    "Amethi",
    "Amroha",
    "Auraiya",
    "Ayodhya",
    "Azamgarh",
    "Baghpat",
    "Bahraich",
    "Ballia",
    "Balrampur",
    "Banda",
    "Barabanki",
    "Bareilly",
    "Basti",
    "Bhadohi",
    "Bijnor",
    "Budaun",
    "Bulandshahr",
    "Chandauli",
    "Chitrakoot",
    "Deoria",
    "Etah",
    "Etawah",
    "Farrukhabad",
    "Fatehpur",
    "Firozabad",
    "Gautam Buddha Nagar",
    "Ghaziabad",
    "Ghazipur",
    "Gonda",
    "Gorakhpur",
    "Hamirpur",
    "Hapur",
    "Hardoi",
    "Hathras",
    "Jalaun",
    "Jaunpur",
    "Jhansi",
    "Kannauj",
    "Kanpur Dehat",
    "Kanpur Nagar",
    "Kasganj",
    "Kaushambi",
    "Kheri",
    "Kushinagar",
    "Lalitpur",
    "Lucknow",
    "Maharajganj",
    "Mahoba",
    "Mainpuri",
    "Mathura",
    "Mau",
    "Meerut",
    "Mirzapur",
    "Moradabad",
    "Muzaffarnagar",
    "Pilibhit",
    "Pratapgarh",
    "Prayagraj",
    "Raebareli",
    "Rampur",
    "Saharanpur",
    "Sambhal",
    "Sant Kabir Nagar",
    "Shahjahanpur",
    "Shamli",
    "Shrawasti",
    "Siddharthnagar",
    "Sitapur",
    "Sonbhadra",
    "Sultanpur",
    "Unnao",
    "Varanasi",
  ],
  Uttarakhand: [
    "Almora",
    "Bageshwar",
    "Chamoli",
    "Champawat",
    "Dehradun",
    "Haridwar",
    "Nainital",
    "Pauri Garhwal",
    "Pithoragarh",
    "Rudraprayag",
    "Tehri Garhwal",
    "Udham Singh Nagar",
    "Uttarkashi",
  ],
  "West Bengal": [
    "Alipurduar",
    "Bankura",
    "Birbhum",
    "Cooch Behar",
    "Dakshin Dinajpur",
    "Darjeeling",
    "Hooghly",
    "Howrah",
    "Jalpaiguri",
    "Jhargram",
    "Kalimpong",
    "Kolkata",
    "Malda",
    "Murshidabad",
    "Nadia",
    "North 24 Parganas",
    "Paschim Bardhaman",
    "Paschim Medinipur",
    "Purba Bardhaman",
    "Purba Medinipur",
    "Purulia",
    "South 24 Parganas",
    "Uttar Dinajpur",
  ],
  // Union Territories
  "Andaman and Nicobar Islands": ["Nicobar", "North and Middle Andaman", "South Andaman"],
  Chandigarh: ["Chandigarh"],
  "Dadra and Nagar Haveli and Daman and Diu": ["Dadra and Nagar Haveli", "Daman", "Diu"],
  Delhi: [
    "Central Delhi",
    "East Delhi",
    "New Delhi",
    "North Delhi",
    "North East Delhi",
    "North West Delhi",
    "Shahdara",
    "South Delhi",
    "South East Delhi",
    "South West Delhi",
    "West Delhi",
  ],
  "Jammu and Kashmir": [
    "Anantnag",
    "Bandipora",
    "Baramulla",
    "Budgam",
    "Doda",
    "Ganderbal",
    "Jammu",
    "Kathua",
    "Kishtwar",
    "Kulgam",
    "Kupwara",
    "Poonch",
    "Pulwama",
    "Rajouri",
    "Ramban",
    "Reasi",
    "Samba",
    "Shopian",
    "Srinagar",
    "Udhampur",
  ],
  Ladakh: ["Kargil", "Leh"],
  Lakshadweep: ["Lakshadweep"],
  Puducherry: ["Karaikal", "Mahe", "Puducherry", "Yanam"],
}

// Mock school data
const generateSchoolData = (district: string) => [
  {
    id: 1,
    name: `${district} Government High School`,
    type: "Government",
    students: 450,
    teachers: 25,
    attendance: 87.5,
    established: 1985,
  },
  {
    id: 2,
    name: `${district} Public School`,
    type: "Private",
    students: 320,
    teachers: 18,
    attendance: 92.3,
    established: 1998,
  },
  {
    id: 3,
    name: `${district} Kendriya Vidyalaya`,
    type: "Central",
    students: 280,
    teachers: 16,
    attendance: 89.7,
    established: 1990,
  },
  {
    id: 4,
    name: `${district} Model School`,
    type: "Government",
    students: 380,
    teachers: 22,
    attendance: 85.2,
    established: 1975,
  },
]

const attendanceTrendData = [
  { month: "Jan", attendance: 85.2 },
  { month: "Feb", attendance: 87.8 },
  { month: "Mar", attendance: 89.1 },
  { month: "Apr", attendance: 86.5 },
  { month: "May", attendance: 88.9 },
  { month: "Jun", attendance: 90.2 },
]

const statesData = {
  "Andhra Pradesh": {
    districts: [
      { name: "Anantapur", schools: 2847, totalStudents: 485000, averageAttendance: 82.5 },
      { name: "Chittoor", schools: 3124, totalStudents: 520000, averageAttendance: 85.0 },
      { name: "East Godavari", schools: 2956, totalStudents: 495000, averageAttendance: 83.8 },
      { name: "Guntur", schools: 3245, totalStudents: 540000, averageAttendance: 84.2 },
      { name: "Krishna", schools: 2834, totalStudents: 475000, averageAttendance: 86.1 },
      { name: "Kurnool", schools: 2756, totalStudents: 460000, averageAttendance: 81.9 },
      { name: "Nellore", schools: 2645, totalStudents: 445000, averageAttendance: 83.5 },
      { name: "Prakasam", schools: 2534, totalStudents: 425000, averageAttendance: 82.8 },
      { name: "Srikakulam", schools: 2423, totalStudents: 405000, averageAttendance: 84.6 },
      { name: "Visakhapatnam", schools: 3456, totalStudents: 580000, averageAttendance: 87.2 },
      { name: "Vizianagaram", schools: 2312, totalStudents: 385000, averageAttendance: 83.4 },
      { name: "West Godavari", schools: 2867, totalStudents: 480000, averageAttendance: 85.7 },
      { name: "YSR Kadapa", schools: 2234, totalStudents: 375000, averageAttendance: 82.1 },
    ],
    totalSchools: 35333,
    totalStudents: 6170000,
    averageAttendance: 84.1,
    literacyRate: 67.4,
    pupilTeacherRatio: 18.5,
  },
  "Uttar Pradesh": {
    districts: [
      { name: "Agra", schools: 4567, totalStudents: 765000, averageAttendance: 76.5 },
      { name: "Aligarh", schools: 3845, totalStudents: 645000, averageAttendance: 78.2 },
      { name: "Prayagraj", schools: 4234, totalStudents: 710000, averageAttendance: 77.8 },
      { name: "Lucknow", schools: 3956, totalStudents: 665000, averageAttendance: 82.4 },
      { name: "Kanpur Nagar", schools: 4123, totalStudents: 690000, averageAttendance: 79.6 },
      { name: "Ghaziabad", schools: 3678, totalStudents: 615000, averageAttendance: 81.3 },
      { name: "Varanasi", schools: 3234, totalStudents: 540000, averageAttendance: 78.9 },
      { name: "Meerut", schools: 3567, totalStudents: 595000, averageAttendance: 80.1 },
      { name: "Bareilly", schools: 3123, totalStudents: 525000, averageAttendance: 77.4 },
      { name: "Moradabad", schools: 2945, totalStudents: 495000, averageAttendance: 76.8 },
    ],
    totalSchools: 158000,
    totalStudents: 32500000,
    averageAttendance: 78.2,
    literacyRate: 67.7,
    pupilTeacherRatio: 22.1,
  },
  Maharashtra: {
    districts: [
      { name: "Mumbai City", schools: 2456, totalStudents: 412000, averageAttendance: 89.5 },
      { name: "Mumbai Suburban", schools: 3234, totalStudents: 542000, averageAttendance: 88.7 },
      { name: "Pune", schools: 4567, totalStudents: 765000, averageAttendance: 87.3 },
      { name: "Thane", schools: 3845, totalStudents: 645000, averageAttendance: 86.9 },
      { name: "Nashik", schools: 3456, totalStudents: 580000, averageAttendance: 85.4 },
      { name: "Nagpur", schools: 3234, totalStudents: 542000, averageAttendance: 84.8 },
      { name: "Aurangabad", schools: 2967, totalStudents: 498000, averageAttendance: 83.6 },
      { name: "Solapur", schools: 2756, totalStudents: 462000, averageAttendance: 82.9 },
      { name: "Ahmednagar", schools: 3123, totalStudents: 524000, averageAttendance: 84.2 },
      { name: "Kolhapur", schools: 2645, totalStudents: 444000, averageAttendance: 85.7 },
    ],
    totalSchools: 108000,
    totalStudents: 18200000,
    averageAttendance: 85.9,
    literacyRate: 82.3,
    pupilTeacherRatio: 19.8,
  },
  "Tamil Nadu": {
    districts: [
      { name: "Chennai", schools: 2845, totalStudents: 477000, averageAttendance: 91.2 },
      { name: "Coimbatore", schools: 3456, totalStudents: 580000, averageAttendance: 89.8 },
      { name: "Madurai", schools: 3234, totalStudents: 542000, averageAttendance: 88.5 },
      { name: "Tiruchirappalli", schools: 2967, totalStudents: 498000, averageAttendance: 87.9 },
      { name: "Salem", schools: 3123, totalStudents: 524000, averageAttendance: 88.7 },
      { name: "Tirunelveli", schools: 2756, totalStudents: 462000, averageAttendance: 87.3 },
      { name: "Vellore", schools: 2645, totalStudents: 444000, averageAttendance: 86.8 },
      { name: "Erode", schools: 2534, totalStudents: 425000, averageAttendance: 88.1 },
      { name: "Thanjavur", schools: 2423, totalStudents: 406000, averageAttendance: 87.6 },
      { name: "Dindigul", schools: 2312, totalStudents: 388000, averageAttendance: 86.4 },
    ],
    totalSchools: 65000,
    totalStudents: 11800000,
    averageAttendance: 88.2,
    literacyRate: 80.1,
    pupilTeacherRatio: 17.9,
  },
  Karnataka: {
    districts: [
      { name: "Bengaluru Urban", schools: 3567, totalStudents: 598000, averageAttendance: 89.4 },
      { name: "Mysuru", schools: 2845, totalStudents: 477000, averageAttendance: 87.8 },
      { name: "Belagavi", schools: 3234, totalStudents: 542000, averageAttendance: 85.6 },
      { name: "Ballari", schools: 2756, totalStudents: 462000, averageAttendance: 84.2 },
      { name: "Dakshina Kannada", schools: 2456, totalStudents: 412000, averageAttendance: 88.9 },
      { name: "Tumakuru", schools: 2345, totalStudents: 393000, averageAttendance: 86.7 },
      { name: "Shivamogga", schools: 2234, totalStudents: 375000, averageAttendance: 85.3 },
      { name: "Dharwad", schools: 2123, totalStudents: 356000, averageAttendance: 87.1 },
      { name: "Kalaburagi", schools: 2967, totalStudents: 498000, averageAttendance: 83.8 },
      { name: "Vijayapura", schools: 2645, totalStudents: 444000, averageAttendance: 82.9 },
    ],
    totalSchools: 58000,
    totalStudents: 9800000,
    averageAttendance: 86.2,
    literacyRate: 75.4,
    pupilTeacherRatio: 18.7,
  },
  Gujarat: {
    districts: [
      { name: "Ahmedabad", schools: 4234, totalStudents: 710000, averageAttendance: 87.5 },
      { name: "Surat", schools: 3845, totalStudents: 645000, averageAttendance: 86.8 },
      { name: "Vadodara", schools: 3456, totalStudents: 580000, averageAttendance: 88.2 },
      { name: "Rajkot", schools: 3123, totalStudents: 524000, averageAttendance: 85.9 },
      { name: "Bhavnagar", schools: 2756, totalStudents: 462000, averageAttendance: 84.6 },
      { name: "Jamnagar", schools: 2534, totalStudents: 425000, averageAttendance: 85.3 },
      { name: "Junagadh", schools: 2423, totalStudents: 406000, averageAttendance: 84.8 },
      { name: "Gandhinagar", schools: 2234, totalStudents: 375000, averageAttendance: 89.1 },
      { name: "Kutch", schools: 2845, totalStudents: 477000, averageAttendance: 82.7 },
      { name: "Mehsana", schools: 2345, totalStudents: 393000, averageAttendance: 86.4 },
    ],
    totalSchools: 52000,
    totalStudents: 8900000,
    averageAttendance: 86.1,
    literacyRate: 78.0,
    pupilTeacherRatio: 19.2,
  },
  Rajasthan: {
    districts: [
      { name: "Jaipur", schools: 4567, totalStudents: 765000, averageAttendance: 79.8 },
      { name: "Jodhpur", schools: 3456, totalStudents: 580000, averageAttendance: 78.5 },
      { name: "Kota", schools: 2845, totalStudents: 477000, averageAttendance: 82.3 },
      { name: "Bikaner", schools: 2756, totalStudents: 462000, averageAttendance: 77.9 },
      { name: "Udaipur", schools: 3123, totalStudents: 524000, averageAttendance: 80.6 },
      { name: "Ajmer", schools: 2645, totalStudents: 444000, averageAttendance: 81.2 },
      { name: "Bharatpur", schools: 2534, totalStudents: 425000, averageAttendance: 79.4 },
      { name: "Alwar", schools: 2967, totalStudents: 498000, averageAttendance: 78.7 },
      { name: "Sikar", schools: 2423, totalStudents: 406000, averageAttendance: 80.1 },
      { name: "Pali", schools: 2234, totalStudents: 375000, averageAttendance: 79.6 },
    ],
    totalSchools: 78000,
    totalStudents: 13200000,
    averageAttendance: 79.8,
    literacyRate: 66.1,
    pupilTeacherRatio: 21.3,
  },
  "West Bengal": {
    districts: [
      { name: "Kolkata", schools: 2456, totalStudents: 412000, averageAttendance: 88.9 },
      { name: "North 24 Parganas", schools: 4234, totalStudents: 710000, averageAttendance: 84.6 },
      { name: "South 24 Parganas", schools: 3845, totalStudents: 645000, averageAttendance: 83.8 },
      { name: "Howrah", schools: 3123, totalStudents: 524000, averageAttendance: 86.2 },
      { name: "Hooghly", schools: 2967, totalStudents: 498000, averageAttendance: 85.4 },
      { name: "Murshidabad", schools: 3456, totalStudents: 580000, averageAttendance: 82.7 },
      { name: "Nadia", schools: 2845, totalStudents: 477000, averageAttendance: 84.1 },
      { name: "Paschim Bardhaman", schools: 2756, totalStudents: 462000, averageAttendance: 83.5 },
      { name: "Purba Bardhaman", schools: 2645, totalStudents: 444000, averageAttendance: 84.8 },
      { name: "Malda", schools: 2534, totalStudents: 425000, averageAttendance: 81.9 },
    ],
    totalSchools: 85000,
    totalStudents: 14500000,
    averageAttendance: 84.6,
    literacyRate: 76.3,
    pupilTeacherRatio: 20.1,
  },
  "Madhya Pradesh": {
    districts: [
      { name: "Indore", schools: 3567, totalStudents: 598000, averageAttendance: 82.4 },
      { name: "Bhopal", schools: 3234, totalStudents: 542000, averageAttendance: 84.7 },
      { name: "Jabalpur", schools: 2967, totalStudents: 498000, averageAttendance: 81.8 },
      { name: "Gwalior", schools: 2845, totalStudents: 477000, averageAttendance: 80.9 },
      { name: "Ujjain", schools: 2756, totalStudents: 462000, averageAttendance: 82.1 },
      { name: "Sagar", schools: 2645, totalStudents: 444000, averageAttendance: 79.6 },
      { name: "Dewas", schools: 2534, totalStudents: 425000, averageAttendance: 81.3 },
      { name: "Satna", schools: 2423, totalStudents: 406000, averageAttendance: 78.8 },
      { name: "Ratlam", schools: 2312, totalStudents: 388000, averageAttendance: 80.5 },
      { name: "Rewa", schools: 2234, totalStudents: 375000, averageAttendance: 79.2 },
    ],
    totalSchools: 125000,
    totalStudents: 21000000,
    averageAttendance: 81.1,
    literacyRate: 69.3,
    pupilTeacherRatio: 20.8,
  },
  Assam: {
    districts: [
      { name: "Kamrup Metropolitan", schools: 2456, totalStudents: 412000, averageAttendance: 85.6 },
      { name: "Nagaon", schools: 3234, totalStudents: 542000, averageAttendance: 82.3 },
      { name: "Sonitpur", schools: 2845, totalStudents: 477000, averageAttendance: 83.8 },
      { name: "Dibrugarh", schools: 2534, totalStudents: 425000, averageAttendance: 84.2 },
      { name: "Cachar", schools: 2756, totalStudents: 462000, averageAttendance: 81.9 },
      { name: "Barpeta", schools: 2645, totalStudents: 444000, averageAttendance: 82.7 },
      { name: "Dhubri", schools: 2967, totalStudents: 498000, averageAttendance: 80.4 },
      { name: "Golaghat", schools: 2234, totalStudents: 375000, averageAttendance: 83.5 },
      { name: "Jorhat", schools: 2123, totalStudents: 356000, averageAttendance: 84.8 },
      { name: "Sivasagar", schools: 2012, totalStudents: 337000, averageAttendance: 85.1 },
    ],
    totalSchools: 48000,
    totalStudents: 8100000,
    averageAttendance: 83.4,
    literacyRate: 72.2,
    pupilTeacherRatio: 19.6,
  },
  Bihar: {
    districts: [
      { name: "Patna", schools: 3456, totalStudents: 580000, averageAttendance: 78.9 },
      { name: "Gaya", schools: 3234, totalStudents: 542000, averageAttendance: 76.5 },
      { name: "Muzaffarpur", schools: 2967, totalStudents: 498000, averageAttendance: 77.8 },
      { name: "Bhagalpur", schools: 2845, totalStudents: 477000, averageAttendance: 75.6 },
      { name: "Purnia", schools: 2756, totalStudents: 462000, averageAttendance: 74.9 },
      { name: "Darbhanga", schools: 2645, totalStudents: 444000, averageAttendance: 76.2 },
      { name: "Bihar Sharif", schools: 2534, totalStudents: 425000, averageAttendance: 77.4 },
      { name: "Arrah", schools: 2423, totalStudents: 406000, averageAttendance: 75.8 },
      { name: "Begusarai", schools: 2312, totalStudents: 388000, averageAttendance: 76.7 },
      { name: "Katihar", schools: 2234, totalStudents: 375000, averageAttendance: 74.3 },
    ],
    totalSchools: 72000,
    totalStudents: 24500000,
    averageAttendance: 76.4,
    literacyRate: 61.8,
    pupilTeacherRatio: 23.4,
  },
}

export default function GovernmentPortal() {
  const { theme, setTheme } = useTheme()
  const { logout } = useAuth()
  const [currentTime, setCurrentTime] = useState(new Date())
  const [selectedState, setSelectedState] = useState("")
  const [selectedDistrict, setSelectedDistrict] = useState("")
  const [selectedSchool, setSelectedSchool] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [viewLevel, setViewLevel] = useState<"states" | "districts" | "schools" | "school-details">("states")

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [theme])

  const states = Object.keys(stateDistrictData)
  const districts = selectedState ? stateDistrictData[selectedState as keyof typeof stateDistrictData] || [] : []
  const schools = selectedDistrict ? generateSchoolData(selectedDistrict) : []

  const filteredStates = states.filter((state) => state.toLowerCase().includes(searchTerm.toLowerCase()))

  const filteredDistricts = districts.filter((district) => district.toLowerCase().includes(searchTerm.toLowerCase()))

  const filteredSchools = schools.filter((school) => school.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const handleStateSelect = (state: string) => {
    setSelectedState(state)
    setSelectedDistrict("")
    setSelectedSchool(null)
    setViewLevel("districts")
    setSearchTerm("")
  }

  const handleDistrictSelect = (district: string) => {
    setSelectedDistrict(district)
    setSelectedSchool(null)
    setViewLevel("schools")
    setSearchTerm("")
  }

  const handleSchoolSelect = (school: any) => {
    setSelectedSchool(school)
    setViewLevel("school-details")
  }

  const handleBack = () => {
    if (viewLevel === "school-details") {
      setViewLevel("schools")
      setSelectedSchool(null)
    } else if (viewLevel === "schools") {
      setViewLevel("districts")
      setSelectedDistrict("")
    } else if (viewLevel === "districts") {
      setViewLevel("states")
      setSelectedState("")
    }
    setSearchTerm("")
  }

  const getBreadcrumb = () => {
    const parts = []
    if (selectedState) parts.push(selectedState)
    if (selectedDistrict) parts.push(selectedDistrict)
    if (selectedSchool) parts.push(selectedSchool.name)
    return parts.join(" > ")
  }

  return (
    <div className="min-h-screen bg-background transition-all duration-500">
      {/* Header */}
      <header className="bg-card shadow-sm border-b border-border animate-in slide-in-from-top duration-300">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4 animate-in fade-in slide-in-from-left duration-500">
            <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center animate-pulse">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Government Portal</h1>
              <p className="text-sm text-muted-foreground">Educational Analytics Dashboard</p>
            </div>
          </div>

          <div className="flex items-center space-x-4 animate-in fade-in slide-in-from-right duration-500">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4 animate-spin" style={{ animationDuration: "60s" }} />
              <span className="font-mono">{currentTime.toLocaleTimeString()}</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 hover:scale-110 transition-transform duration-200"
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4 animate-in spin-in-180 duration-300" />
              ) : (
                <Moon className="w-4 h-4 animate-in spin-in-180 duration-300" />
              )}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={logout}
              className="hover:bg-destructive hover:text-destructive-foreground transition-all duration-200 hover:scale-105 bg-transparent"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center space-x-2 mb-6 animate-in fade-in slide-in-from-bottom duration-500">
          {viewLevel !== "states" && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                if (viewLevel === "school-details") {
                  setViewLevel("schools")
                  setSelectedSchool(null)
                } else if (viewLevel === "schools") {
                  setViewLevel("districts")
                  setSelectedDistrict("")
                } else if (viewLevel === "districts") {
                  setViewLevel("states")
                  setSelectedState("")
                }
              }}
              className="hover:scale-105 transition-transform duration-200"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          )}
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <span className={viewLevel === "states" ? "font-medium text-foreground" : ""}>States</span>
            {selectedState && (
              <>
                <span>/</span>
                <span className={viewLevel === "districts" ? "font-medium text-foreground" : ""}>{selectedState}</span>
              </>
            )}
            {selectedDistrict && (
              <>
                <span>/</span>
                <span className={viewLevel === "schools" ? "font-medium text-foreground" : ""}>{selectedDistrict}</span>
              </>
            )}
            {selectedSchool && (
              <>
                <span>/</span>
                <span className="font-medium text-foreground">{selectedSchool.name}</span>
              </>
            )}
          </div>
        </div>

        {/* States View */}
        {viewLevel === "states" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center animate-in fade-in slide-in-from-bottom duration-500">
              <h2 className="text-2xl font-bold">Indian States & Union Territories</h2>
              <Input
                placeholder="Search states..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64 transition-all duration-200 focus:scale-[1.02]"
              />
            </div>

            {/* National Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {[
                {
                  title: "Total States/UTs",
                  value: "36",
                  icon: MapPin,
                  color: "text-blue-600",
                  subtitle: "28 States + 8 UTs",
                },
                {
                  title: "Total Districts",
                  value: "788",
                  icon: Building2,
                  color: "text-green-600",
                  subtitle: "Administrative Units",
                },
                {
                  title: "Total Schools",
                  value: "15.1L",
                  icon: School,
                  color: "text-purple-600",
                  subtitle: "All Categories",
                },
                {
                  title: "Total Students",
                  value: "264M",
                  icon: Users,
                  color: "text-orange-600",
                  subtitle: "Enrolled Students",
                },
              ].map((stat, index) => (
                <Card
                  key={index}
                  className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-in fade-in slide-in-from-bottom duration-500 bg-gradient-to-br from-card to-card/80"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <div>
                      <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                      <p className="text-xs text-muted-foreground/70">{stat.subtitle}</p>
                    </div>
                    <stat.icon className={`h-5 w-5 ${stat.color}`} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {Object.entries(statesData)
                .filter(([state]) => state.toLowerCase().includes(searchTerm.toLowerCase()))
                .sort(([, a], [, b]) => b.totalStudents - a.totalStudents) // Sort by student population
                .map(([state, data], index) => (
                  <Card
                    key={state}
                    className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-2 hover:scale-105 animate-in fade-in slide-in-from-bottom duration-500 bg-gradient-to-br from-card to-card/90 border-l-4 border-l-blue-500"
                    onClick={() => {
                      setSelectedState(state)
                      setViewLevel("districts")
                    }}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg flex items-center justify-between">
                        <span className="truncate">{state}</span>
                        <Badge variant="outline" className="ml-2 bg-blue-50 text-blue-700 border-blue-200">
                          {stateDistrictData[state]?.length || 0} districts
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Schools:</span>
                          <span className="font-medium">{(data.totalSchools / 1000).toFixed(0)}K</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Students:</span>
                          <span className="font-medium">{(data.totalStudents / 1000000).toFixed(1)}M</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Attendance:</span>
                          <Badge
                            variant={data.averageAttendance >= 80 ? "default" : "destructive"}
                            className={
                              data.averageAttendance >= 80
                                ? "bg-green-500 hover:bg-green-600"
                                : "bg-red-500 hover:bg-red-600"
                            }
                          >
                            {data.averageAttendance}%
                          </Badge>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Literacy:</span>
                          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                            {data.literacyRate}%
                          </Badge>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">P-T Ratio:</span>
                          <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
                            1:{data.pupilTeacherRatio}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        )}

        {/* Districts View */}
        {viewLevel === "districts" && selectedState && (
          <div className="space-y-6">
            <div className="flex justify-between items-center animate-in fade-in slide-in-from-bottom duration-500">
              <h2 className="text-2xl font-bold">Districts in {selectedState}</h2>
              <Input
                placeholder="Search districts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64 transition-all duration-200 focus:scale-[1.02]"
              />
            </div>

            {/* State Overview */}
            <Card className="animate-in fade-in slide-in-from-bottom duration-500 delay-200">
              <CardHeader>
                <CardTitle>State Overview - {selectedState}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{statesData[selectedState].districts.length}</div>
                    <div className="text-sm text-muted-foreground">Districts</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      {statesData[selectedState].totalSchools.toLocaleString()}
                    </div>
                    <div className="text-sm text-muted-foreground">Schools</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">
                      {statesData[selectedState].totalStudents.toLocaleString()}
                    </div>
                    <div className="text-sm text-muted-foreground">Students</div>
                  </div>
                  <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">
                      {statesData[selectedState].averageAttendance}%
                    </div>
                    <div className="text-sm text-muted-foreground">Avg Attendance</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {statesData[selectedState].districts
                .filter((district: any) => district.name.toLowerCase().includes(searchTerm.toLowerCase()))
                .map((district: any, index: number) => (
                  <Card
                    key={district.name}
                    className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-2 hover:scale-105 animate-in fade-in slide-in-from-bottom duration-500"
                    onClick={() => {
                      setSelectedDistrict(district.name)
                      setViewLevel("schools")
                    }}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg flex items-center justify-between">
                        {district.name}
                        <Badge variant="outline">{district.schools} schools</Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Students:</span>
                          <span className="font-medium">{district.totalStudents.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Attendance:</span>
                          <Badge
                            variant={district.averageAttendance >= 80 ? "default" : "destructive"}
                            className={district.averageAttendance >= 80 ? "bg-green-500" : ""}
                          >
                            {district.averageAttendance}%
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        )}

        {/* Schools View */}
        {viewLevel === "schools" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Schools</CardTitle>
                  <School className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{schools.length}</div>
                  <p className="text-xs text-muted-foreground">in {selectedDistrict}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                  <Users className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {schools.reduce((sum, school) => sum + school.students, 0).toLocaleString()}
                  </div>
                  <p className="text-xs text-muted-foreground">Across all schools</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Teachers</CardTitle>
                  <GraduationCap className="h-4 w-4 text-purple-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{schools.reduce((sum, school) => sum + school.teachers, 0)}</div>
                  <p className="text-xs text-muted-foreground">Teaching staff</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Avg Attendance</CardTitle>
                  <TrendingUp className="h-4 w-4 text-orange-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {(schools.reduce((sum, school) => sum + school.attendance, 0) / schools.length).toFixed(1)}%
                  </div>
                  <p className="text-xs text-muted-foreground">District average</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Schools in {selectedDistrict}</CardTitle>
                <CardDescription>Select a school to view detailed information</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredSchools.map((school) => (
                    <Card
                      key={school.id}
                      className="cursor-pointer hover:shadow-md transition-shadow border-2 hover:border-green-300 dark:hover:border-green-600"
                      onClick={() => handleSchoolSelect(school)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                              <School className="w-6 h-6 text-green-600" />
                            </div>
                            <div>
                              <h3 className="font-medium">{school.name}</h3>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {school.type} • Est. {school.established}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center space-x-4">
                              <div>
                                <p className="text-sm font-medium">{school.students} Students</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">{school.teachers} Teachers</p>
                              </div>
                              <Badge
                                variant={school.attendance >= 85 ? "default" : "destructive"}
                                className={school.attendance >= 85 ? "bg-green-500" : ""}
                              >
                                {school.attendance}% Attendance
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* School Details View */}
        {viewLevel === "school-details" && selectedSchool && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                    <School className="w-8 h-8 text-green-600" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">{selectedSchool.name}</CardTitle>
                    <CardDescription>
                      {selectedSchool.type} School • Established {selectedSchool.established}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                  <Users className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{selectedSchool.students}</div>
                  <p className="text-xs text-muted-foreground">Enrolled students</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Teaching Staff</CardTitle>
                  <GraduationCap className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{selectedSchool.teachers}</div>
                  <p className="text-xs text-muted-foreground">Faculty members</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Student-Teacher Ratio</CardTitle>
                  <BarChart3 className="h-4 w-4 text-purple-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {Math.round(selectedSchool.students / selectedSchool.teachers)}
                  </div>
                  <p className="text-xs text-muted-foreground">Students per teacher</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
                  <TrendingUp className="h-4 w-4 text-orange-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{selectedSchool.attendance}%</div>
                  <p className="text-xs text-muted-foreground">Current month</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Attendance Trend</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={attendanceTrendData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="attendance" stroke="#f97316" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>School Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">School Type</p>
                      <p className="font-medium">{selectedSchool.type}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Established</p>
                      <p className="font-medium">{selectedSchool.established}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">District</p>
                      <p className="font-medium">{selectedDistrict}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">State</p>
                      <p className="font-medium">{selectedState}</p>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <h4 className="font-medium mb-2">Performance Metrics</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Daily Attendance</span>
                        <Badge variant="outline">{selectedSchool.attendance}%</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Weekly Average</span>
                        <Badge variant="outline">{(selectedSchool.attendance - 2).toFixed(1)}%</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Monthly Average</span>
                        <Badge variant="outline">{(selectedSchool.attendance - 1).toFixed(1)}%</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

const mongoose = require('mongoose');
const axios = require('axios');
const bcrypt = require('bcrypt');
const { Dietitian, DietitianInfo } = require('../models/userModel');

const dietitians = [
    {
        name: "Dr. Anjali Sharma",
        email: "anjali.sharma@nutriconnect.com",
        password: "password123",
        licenseNumber:12345678,
        age: 35,
        phone: "+919876543210",
        interestedField: "Nutritional Dermatology",
        degreeType: "MD",
        licenseIssuer: "Medical Council of India",
        idProofType: "Aadhaar",
        specializationDomain: "Skin and Hair Health",
        profileImage: "https://images.apollo247.in/images/consult_home/icons/female.png",
        files: {
            resume: null,
            degree_certificate: null,
            license_document: null,
            id_proof: null,
            experience_certificates: null,
            specialization_certifications: null,
            internship_certificate: null,
            research_papers: null,
            finalReport: null
        },
        verificationStatus: {
            resume: "Verified",
            degree_certificate: "Verified",
            license_document: "Verified",
            id_proof: "Verified",
            experience_certificates: "Verified",
            specialization_certifications: "Verified",
            internship_certificate: "Verified",
            research_papers: "Verified",
            finalReport: "Verified"
        },
        specialization: ["Skin Health", "Hair Care", "Nutritional Dermatology"],
        experience: 7,
        fees: 1500,
        languages: ["English", "Hindi", "Telugu"],
        location: "Mumbai",
        rating: 5.0,
        online: true,
        offline: false,
        about: "Specialist in nutrition-based interventions for skin and hair health.",
        education: ["MD in Dermatology", "Certified in Nutritional Medicine"]
    },
    {
        name: "Dr. Priya Singh",
        email: "priya.singh@nutriconnect.com",
        password: "password123",
        licenseNumber:12345671,
        age: 32,
        phone: "+919876543211",
        interestedField: "Women's Health",
        degreeType: "MBBS",
        licenseIssuer: "Medical Council of India",
        idProofType: "Aadhaar",
        specializationDomain: "PCOS Management",
        profileImage: "https://images.apollo247.in/images/consult_home/icons/female.png",
        files: {
            resume: null,
            degree_certificate: null,
            license_document: null,
            id_proof: null,
            experience_certificates: null,
            specialization_certifications: null,
            internship_certificate: null,
            research_papers: null,
            finalReport: null
        },
        verificationStatus: {
            resume: "Verified",
            degree_certificate: "Verified",
            license_document: "Verified",
            id_proof: "Verified",
            experience_certificates: "Verified",
            specialization_certifications: "Verified",
            internship_certificate: "Verified",
            research_papers: "Verified",
            finalReport: "Verified"
        },
        specialization: ["PCOS Management", "Hormonal Balance", "Women's Health"],
        experience: 5,
        fees: 1000,
        languages: ["English", "Hindi"],
        location: "Hyderabad",
        rating: 4.0,
        online: true,
        offline: true,
        about: "Expert in managing PCOS through diet and lifestyle modifications.",
        education: ["MBBS", "Specialization in Women's Health Nutrition"]
    },
    {
        name: "Dr. Vikas Gupta",
        email: "vikas.gupta@nutriconnect.com",
        password: "password123",
        licenseNumber:12345621,
        age: 30,
        phone: "+919876543212",
        interestedField: "Thyroid Management",
        degreeType: "MD",
        licenseIssuer: "Medical Council of India",
        idProofType: "Aadhaar",
        specializationDomain: "Metabolic Health",
        profileImage: "https://images.apollo247.in/images/consult_home/icons/male.png?tr=w-150,c-at_max,f-auto,q=80,dpr-2",
        files: {
            resume: null,
            degree_certificate: null,
            license_document: null,
            id_proof: null,
            experience_certificates: null,
            specialization_certifications: null,
            internship_certificate: null,
            research_papers: null,
            finalReport: null
        },
        verificationStatus: {
            resume: "Verified",
            degree_certificate: "Verified",
            license_document: "Verified",
            id_proof: "Verified",
            experience_certificates: "Verified",
            specialization_certifications: "Verified",
            internship_certificate: "Verified",
            research_papers: "Verified",
            finalReport: "Verified"
        },
        specialization: ["Thyroid Management", "Metabolic Health"],
        experience: 3,
        fees: 800,
        languages: ["Hindi"],
        location: "Pune",
        rating: 5.0,
        online: false,
        offline: true,
        about: "Focused on thyroid health management through nutritional therapy.",
        education: ["MD in Endocrinology", "Certification in Dietary Management"]
    },
    {
        name: "Dr. Deepak Chowdary",
        email: "deepak.chowdary@nutriconnect.com",
        password: "password123",
        licenseNumber:12344321,
        age: 38,
        phone: "+919876543213",
        interestedField: "Weight Loss",
        degreeType: "PhD",
        licenseIssuer: "Medical Council of India",
        idProofType: "Aadhaar",
        specializationDomain: "Obesity Management",
        profileImage: "https://images.apollo247.in/images/consult_home/icons/male.png",
        files: {
            resume: null,
            degree_certificate: null,
            license_document: null,
            id_proof: null,
            experience_certificates: null,
            specialization_certifications: null,
            internship_certificate: null,
            research_papers: null,
            finalReport: null
        },
        verificationStatus: {
            resume: "Verified",
            degree_certificate: "Verified",
            license_document: "Verified",
            id_proof: "Verified",
            experience_certificates: "Verified",
            specialization_certifications: "Verified",
            internship_certificate: "Verified",
            research_papers: "Verified",
            finalReport: "Verified"
        },
        specialization: ["Weight Loss"],
        experience: 7,
        fees: 2000,
        languages: ["Telugu", "Hindi", "English", "Tamil"],
        location: "Chennai",
        rating: 4.0,
        online: false,
        offline: true,
        about: "Weight management specialist with holistic approach to sustainable weight loss.",
        education: ["PhD in Nutrition Science", "Specialization in Obesity Management"]
    },
    {
        name: "Dr. Shriya Patel",
        email: "shriya.patel@nutriconnect.com",
        password: "password123",
        licenseNumber:12332112,
        age: 28,
        phone: "+919876543214",
        interestedField: "Pregnancy Care",
        degreeType: "MSc",
        licenseIssuer: "Medical Council of India",
        idProofType: "Aadhaar",
        specializationDomain: "Maternal Nutrition",
        profileImage: "https://images.apollo247.in/images/consult_home/icons/female.png",
        files: {
            resume: null,
            degree_certificate: null,
            license_document: null,
            id_proof: null,
            experience_certificates: null,
            specialization_certifications: null,
            internship_certificate: null,
            research_papers: null,
            finalReport: null
        },
        verificationStatus: {
            resume: "Verified",
            degree_certificate: "Verified",
            license_document: "Verified",
            id_proof: "Verified",
            experience_certificates: "Verified",
            specialization_certifications: "Verified",
            internship_certificate: "Verified",
            research_papers: "Verified",
            finalReport: "Verified"
        },
        specialization: ["Pregnancy Care"],
        experience: 1,
        fees: 500,
        languages: ["Telugu", "Hindi", "Tamil"],
        location: "Tanjavur",
        rating: 4.0,
        online: false,
        offline: true,
        about: "Specialist in prenatal and postnatal nutrition for mother and child health.",
        education: ["MSc in Nutrition", "Certification in Maternal Health"]
    },
    {
        name: "Dr. Laura Sen",
        email: "laura.sen@nutriconnect.com",
        password: "password123",
        licenseNumber:87654321,
        age: 40,
        phone: "+919876543215",
        interestedField: "Cardiac Health",
        degreeType: "MD",
        licenseIssuer: "Medical Council of India",
        idProofType: "Aadhaar",
        specializationDomain: "Cardiac Nutrition",
        profileImage: "https://images.apollo247.in/images/consult_home/icons/female.png",
        files: {
            resume: null,
            degree_certificate: null,
            license_document: null,
            id_proof: null,
            experience_certificates: null,
            specialization_certifications: null,
            internship_certificate: null,
            research_papers: null,
            finalReport: null
        },
        verificationStatus: {
            resume: "Verified",
            degree_certificate: "Verified",
            license_document: "Verified",
            id_proof: "Verified",
            experience_certificates: "Verified",
            specialization_certifications: "Verified",
            internship_certificate: "Verified",
            research_papers: "Verified",
            finalReport: "Verified"
        },
        specialization: ["Cardiac Health Nutrition"],
        experience: 7,
        fees: 1800,
        languages: ["Telugu"],
        location: "Vijayawada",
        rating: 5.0,
        online: true,
        offline: false,
        about: "Focused on heart-healthy diet plans for cardiac patients and preventive care.",
        education: ["MD in Cardiology", "Specialization in Cardiac Nutrition"]
    },
    {
        name: "Dr. Reyansh Gupta",
        email: "reyansh.gupta@nutriconnect.com",
        password: "password123",
        licenseNumber:87654323,
        age: 33,
        phone: "+919876543216",
        interestedField: "Cholesterol Management",
        degreeType: "MBBS",
        licenseIssuer: "Medical Council of India",
        idProofType: "Aadhaar",
        specializationDomain: "Lipid Management",
        profileImage: "https://ui-avatars.com/api/?name=Reyansh+Gupta&size=150&background=0D8ABC&color=fff",
        files: {
            resume: null,
            degree_certificate: null,
            license_document: null,
            id_proof: null,
            experience_certificates: null,
            specialization_certifications: null,
            internship_certificate: null,
            research_papers: null,
            finalReport: null
        },
        verificationStatus: {
            resume: "Verified",
            degree_certificate: "Verified",
            license_document: "Verified",
            id_proof: "Verified",
            experience_certificates: "Verified",
            specialization_certifications: "Verified",
            internship_certificate: "Verified",
            research_papers: "Verified",
            finalReport: "Verified"
        },
        specialization: ["Cholesterol Control"],
        experience: 3,
        fees: 700,
        languages: ["Hindi", "English"],
        location: "Bangalore",
        rating: 5.0,
        online: true,
        offline: true,
        about: "Expert in managing cholesterol levels through dietary interventions.",
        education: ["MBBS", "Certification in Lipid Management"]
    },
    {
        name: "Dr. Bhaskar Rao",
        email: "bhaskar.rao@nutriconnect.com",
        licenseNumber:87654342,
        password: "password123",
        age: 42,
        phone: "+919876543217",
        interestedField: "Weight Loss",
        degreeType: "MD",
        licenseIssuer: "Medical Council of India",
        idProofType: "Aadhaar",
        specializationDomain: "Obesity Management",
        profileImage: "https://ui-avatars.com/api/?name=Bhaskar+Rao&size=150&background=0D8ABC&color=fff",
        files: {
            resume: null,
            degree_certificate: null,
            license_document: null,
            id_proof: null,
            experience_certificates: null,
            specialization_certifications: null,
            internship_certificate: null,
            research_papers: null,
            finalReport: null
        },
        verificationStatus: {
            resume: "Verified",
            degree_certificate: "Verified",
            license_document: "Verified",
            id_proof: "Verified",
            experience_certificates: "Verified",
            specialization_certifications: "Verified",
            internship_certificate: "Verified",
            research_papers: "Verified",
            finalReport: "Verified"
        },
        specialization: ["Weight Loss"],
        experience: 7,
        fees: 2000,
        languages: ["Telugu", "Hindi", "English"],
        location: "Warangal",
        rating: 4.0,
        online: false,
        offline: true,
        about: "Specializing in clinical weight management with personalized diet plans.",
        education: ["MD in Medicine", "Certification in Obesity Management"]
    },
    {
        name: "Dr. Rahul Sharma",
        email: "rahul.sharma@nutriconnect.com",
        password: "password123",
        licenseNumber:87612395,
        age: 36,
        phone: "+919876543218",
        interestedField: "Sports Nutrition",
        degreeType: "MSc",
        licenseIssuer: "Medical Council of India",
        idProofType: "Aadhaar",
        specializationDomain: "Sports Nutrition",
        profileImage: "https://ui-avatars.com/api/?name=Rahul+Sharma&size=150&background=0D8ABC&color=fff",
        files: {
            resume: null,
            degree_certificate: null,
            license_document: null,
            id_proof: null,
            experience_certificates: null,
            specialization_certifications: null,
            internship_certificate: null,
            research_papers: null,
            finalReport: null
        },
        verificationStatus: {
            resume: "Verified",
            degree_certificate: "Verified",
            license_document: "Verified",
            id_proof: "Verified",
            experience_certificates: "Verified",
            specialization_certifications: "Verified",
            internship_certificate: "Verified",
            research_papers: "Verified",
            finalReport: "Verified"
        },
        specialization: ["Sports Nutrition"],
        experience: 5,
        fees: 1100,
        languages: ["English", "Hindi"],
        location: "Delhi",
        rating: 5.0,
        online: true,
        offline: false,
        about: "Sports nutrition expert helping athletes optimize performance through diet.",
        education: ["MSc in Sports Science", "Certified Sports Nutritionist"]
    },
    {
        "name": "Dr. Neha Reddy",
        "email": "neha.reddy@nutriconnect.com",
        "password": "password123",
        licenseNumber:98767812,
        "age": 29,
        "phone": "+919876543219",
        "interestedField": "Women's Health Nutrition",
        "degreeType": "MD",
        "licenseIssuer": "Medical Council of India",
        "idProofType": "Aadhaar",
        "specializationDomain": "Women's Nutrition",
        "profileImage": "https://ui-avatars.com/api/?name=Neha+Reddy&size=150&background=0D8ABC&color=fff",
        "files": {
            "resume": null,
            "degree_certificate": null,
            "license_document": null,
            "id_proof": null,
            "experience_certificates": null,
            "specialization_certifications": null,
            "internship_certificate": null,
            "research_papers": null,
            "finalReport": null
        },
        "verificationStatus": {
            "resume": "Verified",
            "degree_certificate": "Verified",
            "license_document": "Verified",
            "id_proof": "Verified",
            "experience_certificates": "Verified",
            "specialization_certifications": "Verified",
            "internship_certificate": "Verified",
            "research_papers": "Verified",
            "finalReport": "Verified"
        },
        "specialization": ["Women's Health Nutrition"],
        "experience": 1,
        "fees": 600,
        "languages": ["Telugu"],
        "location": "Visakhapatnam",
        "rating": 4.0,
        "online": false,
        "offline": true,
        "about": "Committed to empowering women through tailored nutrition strategies for hormonal balance, reproductive health, and overall wellness.",
        "education": ["MD in Women's Health", "Certification in Women's Nutrition"]
    },
    {
        name: "Dr. Rajiv Sharma",
        email: "rajiv.sharma@nutriconnect.com",
        licenseNumber:90821786,
        password: "hearthealth2023",
        age: 45,
        phone: "+919876543211",
        interestedField: "Cardiac Nutrition",
        degreeType: "MD",
        licenseIssuer: "Medical Council of India",
        idProofType: "Aadhaar",
        specializationDomain: "Heart Health",
        profileImage: "https://images.apollo247.in/images/consult_home/icons/male.png?tr=w-150,c-at_max,f-auto,q=80,dpr-2",
        files: {
            resume: null,
            degree_certificate: null,
            license_document: null,
            id_proof: null,
            experience_certificates: null,
            specialization_certifications: null,
            internship_certificate: null,
            research_papers: null,
            finalReport: null
        },
        verificationStatus: {
            resume: "Verified",
            degree_certificate: "Verified",
            license_document: "Verified",
            id_proof: "Verified",
            experience_certificates: "Verified",
            specialization_certifications: "Verified",
            internship_certificate: "Verified",
            research_papers: "Verified",
            finalReport: "Verified"
        },
        specialization: ["Cholesterol Management", "Hypertension"],
        experience: 12,
        fees: 1200,
        languages: ["English", "Hindi"],
        location: "Mumbai",
        rating: 4.8,
        online: true,
        offline: true,
        about: "Cardiologist with over 12 years of experience specializing in nutrition-based interventions for heart health.",
        education: ["MD in Cardiology", "Certified in Nutritional Medicine"]
    },
    {
        name: "Dr. Meera Iyer",
        email: "meera.iyer@nutriconnect.com",
        password: "cardiaccare456",
        licenseNumber:78921346,
        age: 38,
        phone: "+919876543212",
        interestedField: "Cardiac Nutrition",
        degreeType: "MD",
        licenseIssuer: "Medical Council of India",
        idProofType: "Aadhaar",
        specializationDomain: "Heart Health",
        profileImage: "https://images.apollo247.in/images/consult_home/icons/female.png",
        files: {
            resume: null,
            degree_certificate: null,
            license_document: null,
            id_proof: null,
            experience_certificates: null,
            specialization_certifications: null,
            internship_certificate: null,
            research_papers: null,
            finalReport: null
        },
        verificationStatus: {
            resume: "Verified",
            degree_certificate: "Verified",
            license_document: "Verified",
            id_proof: "Verified",
            experience_certificates: "Verified",
            specialization_certifications: "Verified",
            internship_certificate: "Verified",
            research_papers: "Verified",
            finalReport: "Verified"
        },
        specialization: ["Post-Cardiac Surgery", "Hypertension"],
        experience: 8,
        fees: 900,
        languages: ["English", "Tamil", "Telugu"],
        location: "Chennai",
        rating: 4.7,
        online: true,
        offline: true,
        about: "Specialized in post-cardiac surgery dietary management and hypertension control through nutrition.",
        education: ["MBBS", "MD (Nutrition)", "Fellowship in Cardiac Rehabilitation"]
    },
    {
        name: "Anita Desai",
        email: "anita.desai@nutriconnect.com",
        password: "nutrition789",
        licenseNumber:65127892,
        age: 32,
        phone: "+919876543213",
        interestedField: "Cardiac Nutrition",
        degreeType: "MSc",
        licenseIssuer: "Indian Dietetic Association",
        idProofType: "Aadhaar",
        specializationDomain: "Heart Health",
        profileImage: "https://images.apollo247.in/images/consult_home/icons/female.png",
        files: {
            resume: null,
            degree_certificate: null,
            license_document: null,
            id_proof: null,
            experience_certificates: null,
            specialization_certifications: null,
            internship_certificate: null,
            research_papers: null,
            finalReport: null
        },
        verificationStatus: {
            resume: "Verified",
            degree_certificate: "Verified",
            license_document: "Verified",
            id_proof: "Verified",
            experience_certificates: "Verified",
            specialization_certifications: "Verified",
            internship_certificate: "Verified",
            research_papers: "Verified",
            finalReport: "Verified"
        },
        specialization: ["Cholesterol Management", "Post-Cardiac Surgery"],
        experience: 6,
        fees: 800,
        languages: ["English", "Hindi", "Gujarati"],
        location: "Ahmedabad",
        rating: 4.5,
        online: true,
        offline: false,
        about: "Dedicated to helping cardiac patients improve their heart health through evidence-based nutrition plans.",
        education: ["MSc in Clinical Nutrition", "Specialized Cardiac Nutritionist"]
    },
    {
        name: "Dr. Vikram Naidu",
        email: "vikram.naidu@nutriconnect.com",
        password: "heartcare101",
        licenseNumber:96532781,
        age: 50,
        phone: "+919876543214",
        interestedField: "Cardiac Nutrition",
        degreeType: "MD",
        licenseIssuer: "Medical Council of India",
        idProofType: "Aadhaar",
        specializationDomain: "Heart Health",
        profileImage: "https://images.apollo247.in/images/consult_home/icons/male.png?tr=w-150,c-at_max,f-auto,q=80,dpr-2",
        files: {
            resume: null,
            degree_certificate: null,
            license_document: null,
            id_proof: null,
            experience_certificates: null,
            specialization_certifications: null,
            internship_certificate: null,
            research_papers: null,
            finalReport: null
        },
        verificationStatus: {
            resume: "Verified",
            degree_certificate: "Verified",
            license_document: "Verified",
            id_proof: "Verified",
            experience_certificates: "Verified",
            specialization_certifications: "Verified",
            internship_certificate: "Verified",
            research_papers: "Verified",
            finalReport: "Verified"
        },
        specialization: ["Hypertension", "Cholesterol Management"],
        experience: 15,
        fees: 1500,
        languages: ["English", "Telugu"],
        location: "Hyderabad",
        rating: 4.9,
        online: true,
        offline: true,
        about: "Expert in managing cardiac conditions through lifestyle and nutrition interventions with 15+ years experience.",
        education: ["MD in Cardiology", "PhD in Nutritional Sciences"]
    },
    {
        name: "Priya Malhotra",
        email: "priya.malhotra@nutriconnect.com",
        password: "dietplan2022",
        licenseNumber:35247892,
        age: 29,
        phone: "+919876543215",
        interestedField: "Cardiac Nutrition",
        degreeType: "BSc",
        licenseIssuer: "Indian Dietetic Association",
        idProofType: "Aadhaar",
        specializationDomain: "Heart Health",
        profileImage: "https://images.apollo247.in/images/consult_home/icons/female.png",
        files: {
            resume: null,
            degree_certificate: null,
            license_document: null,
            id_proof: null,
            experience_certificates: null,
            specialization_certifications: null,
            internship_certificate: null,
            research_papers: null,
            finalReport: null
        },
        verificationStatus: {
            resume: "Verified",
            degree_certificate: "Verified",
            license_document: "Verified",
            id_proof: "Verified",
            experience_certificates: "Verified",
            specialization_certifications: "Verified",
            internship_certificate: "Verified",
            research_papers: "Verified",
            finalReport: "Verified"
        },
        specialization: ["Post-Cardiac Surgery", "Cholesterol Management"],
        experience: 4,
        fees: 600,
        languages: ["English", "Hindi", "Punjabi"],
        location: "Delhi",
        rating: 4.3,
        online: true,
        offline: true,
        about: "Focused on preventive cardiac nutrition and post-surgery dietary management for optimal recovery.",
        education: ["BSc in Nutrition", "Certified in Cardiac Rehabilitation Nutrition"]
    },
    {
        name: "Dr. Sunita Sharma",
        email: "sunita.sharma@nutriconnect.com",
        password: "diabetes2023",
        licenseNumber:69812472,
        age: 42,
        phone: "+919876543216",
        interestedField: "Diabetes Nutrition",
        degreeType: "MD",
        licenseIssuer: "Medical Council of India",
        idProofType: "Aadhaar",
        specializationDomain: "Diabetes Management",
        profileImage: "https://images.apollo247.in/images/consult_home/icons/female.png",
        files: {
            resume: null,
            degree_certificate: null,
            license_document: null,
            id_proof: null,
            experience_certificates: null,
            specialization_certifications: null,
            internship_certificate: null,
            research_papers: null,
            finalReport: null
        },
        verificationStatus: {
            resume: "Verified",
            degree_certificate: "Verified",
            license_document: "Verified",
            id_proof: "Verified",
            experience_certificates: "Verified",
            specialization_certifications: "Verified",
            internship_certificate: "Verified",
            research_papers: "Verified",
            finalReport: "Verified"
        },
        specialization: ["Type 2 Diabetes", "Insulin Management", "Diabetic Diet"],
        experience: 12,
        fees: 2000,
        languages: ["English", "Hindi", "Marathi"],
        location: "Mumbai",
        rating: 4.9,
        online: true,
        offline: true,
        about: "Diabetes management expert specializing in nutrition therapy for blood sugar control.",
        education: ["MBBS", "MD in Endocrinology", "Certification in Diabetes Education"]
    },
    {
        name: "Dr. Ajay Verma",
        email: "ajay.verma@nutriconnect.com",
        password: "thyroidcare456",
        licenseNumber:75246319,
        age: 39,
        phone: "+919876543217",
        interestedField: "Thyroid Nutrition",
        degreeType: "MBBS",
        licenseIssuer: "Medical Council of India",
        idProofType: "Aadhaar",
        specializationDomain: "Thyroid Disorders",
        profileImage: "https://images.apollo247.in/images/consult_home/icons/male.png?tr=w-150,c-at_max,f-auto,q=80,dpr-2",
        files: {
            resume: null,
            degree_certificate: null,
            license_document: null,
            id_proof: null,
            experience_certificates: null,
            specialization_certifications: null,
            internship_certificate: null,
            research_papers: null,
            finalReport: null
        },
        verificationStatus: {
            resume: "Verified",
            degree_certificate: "Verified",
            license_document: "Verified",
            id_proof: "Verified",
            experience_certificates: "Verified",
            specialization_certifications: "Verified",
            internship_certificate: "Verified",
            research_papers: "Verified",
            finalReport: "Verified"
        },
        specialization: ["Thyroid Disorders", "Hypothyroidism"],
        experience: 9,
        fees: 1600,
        languages: ["English", "Hindi"],
        location: "Delhi",
        rating: 4.7,
        online: true,
        offline: true,
        about: "Specializes in nutritional management of thyroid disorders, particularly hypothyroidism.",
        education: ["MBBS", "Diploma in Endocrinology", "Thyroid Nutrition Specialist"]
    },
    {
        name: "Dr. Meera Krishnan",
        email: "meera.krishnan@nutriconnect.com",
        password: "diabetes789",
        licenseNumber:78412698,
        age: 47,
        phone: "+919876543218",
        interestedField: "Diabetes Nutrition",
        degreeType: "MD",
        licenseIssuer: "Medical Council of India",
        idProofType: "Aadhaar",
        specializationDomain: "Diabetes Management",
        profileImage: "https://images.apollo247.in/images/consult_home/icons/female.png",
        files: {
            resume: null,
            degree_certificate: null,
            license_document: null,
            id_proof: null,
            experience_certificates: null,
            specialization_certifications: null,
            internship_certificate: null,
            research_papers: null,
            finalReport: null
        },
        verificationStatus: {
            resume: "Verified",
            degree_certificate: "Verified",
            license_document: "Verified",
            id_proof: "Verified",
            experience_certificates: "Verified",
            specialization_certifications: "Verified",
            internship_certificate: "Verified",
            research_papers: "Verified",
            finalReport: "Verified"
        },
        specialization: ["Type 1 Diabetes", "Gestational Diabetes"],
        experience: 15,
        fees: 2200,
        languages: ["English", "Kannada", "Tamil"],
        location: "Bangalore",
        rating: 4.9,
        online: true,
        offline: true,
        about: "Specialist in type 1 diabetes management and gestational diabetes care.",
        education: ["MBBS", "MD in Internal Medicine", "Fellowship in Diabetology"]
    },
    {
        name: "Rahul Kapoor",
        email: "rahul.kapoor@nutriconnect.com",
        password: "prediabetes101",
        licenseNumber:18074503,
        age: 34,
        phone: "+919876543219",
        interestedField: "Diabetes Prevention",
        degreeType: "MSc",
        licenseIssuer: "Indian Dietetic Association",
        idProofType: "Aadhaar",
        specializationDomain: "Pre-Diabetes Management",
        profileImage:"https://images.apollo247.in/images/consult_home/icons/male.png?tr=w-150,c-at_max,f-auto,q=80,dpr-2",
        files: {
            resume: null,
            degree_certificate: null,
            license_document: null,
            id_proof: null,
            experience_certificates: null,
            specialization_certifications: null,
            internship_certificate: null,
            research_papers: null,
            finalReport: null
        },
        verificationStatus: {
            resume: "Verified",
            degree_certificate: "Verified",
            license_document: "Verified",
            id_proof: "Verified",
            experience_certificates: "Verified",
            specialization_certifications: "Verified",
            internship_certificate: "Verified",
            research_papers: "Verified",
            finalReport: "Verified"
        },
        specialization: ["Pre-Diabetes", "Metabolic Syndrome"],
        experience: 7,
        fees: 1200,
        languages: ["English", "Hindi", "Telugu"],
        location: "Hyderabad",
        rating: 4.6,
        online: true,
        offline: false,
        about: "Focuses on preventing diabetes progression through nutrition and lifestyle modifications.",
        education: ["MSc in Clinical Nutrition", "Certification in Diabetes Prevention"]
    },
    {
        name: "Dr. Priya Nair",
        email: "priya.nair@nutriconnect.com",
        password: "thyroid2022",
        licenseNumber:10771549,
        age: 40,
        phone: "+919876543220",
        interestedField: "Thyroid Nutrition",
        degreeType: "MD",
        licenseIssuer: "Medical Council of India",
        idProofType: "Aadhaar",
        specializationDomain: "Thyroid Disorders",
        profileImage: "https://images.apollo247.in/images/consult_home/icons/female.png",
        files: {
            resume: null,
            degree_certificate: null,
            license_document: null,
            id_proof: null,
            experience_certificates: null,
            specialization_certifications: null,
            internship_certificate: null,
            research_papers: null,
            finalReport: null
        },
        verificationStatus: {
            resume: "Verified",
            degree_certificate: "Verified",
            license_document: "Verified",
            id_proof: "Verified",
            experience_certificates: "Verified",
            specialization_certifications: "Verified",
            internship_certificate: "Verified",
            research_papers: "Verified",
            finalReport: "Verified"
        },
        specialization: ["Hyperthyroidism", "Autoimmune Thyroid Disease"],
        experience: 11,
        fees: 1800,
        languages: ["English", "Tamil", "Malayalam"],
        location: "Chennai",
        rating: 4.8,
        online: true,
        offline: true,
        about: "Expert in nutritional therapies for hyperthyroidism and autoimmune thyroid conditions.",
        education: ["MBBS", "MD in Endocrinology", "Certification in Autoimmune Nutrition"]
    },
    {
        name: "Dr. Vikram Singh",
        email: "vikram.singh@nutriconnect.com",

        password: "diabeticcare303",
        licenseNumber:91212318,
        age: 41,
        phone: "+919876543221",
        interestedField: "Diabetes Nutrition",
        degreeType: "MBBS",
        licenseIssuer: "Medical Council of India",
        idProofType: "Aadhaar",
        specializationDomain: "Diabetes Management",
        profileImage:"https://images.apollo247.in/images/consult_home/icons/male.png?tr=w-150,c-at_max,f-auto,q=80,dpr-2",
        files: {
            resume: null,
            degree_certificate: null,
            license_document: null,
            id_proof: null,
            experience_certificates: null,
            specialization_certifications: null,
            internship_certificate: null,
            research_papers: null,
            finalReport: null
        },
        verificationStatus: {
            resume: "Verified",
            degree_certificate: "Verified",
            license_document: "Verified",
            id_proof: "Verified",
            experience_certificates: "Verified",
            specialization_certifications: "Verified",
            internship_certificate: "Verified",
            research_papers: "Verified",
            finalReport: "Verified"
        },
        specialization: ["Type 2 Diabetes", "Diabetic Neuropathy"],
        experience: 10,
        fees: 1700,
        languages: ["English", "Hindi", "Marathi"],
        location: "Pune",
        rating: 4.7,
        online: true,
        offline: true,
        about: "Specializes in diabetic complications management through dietary intervention.",
        education: ["MBBS", "Diploma in Diabetology", "Certification in Diabetic Complications"]
    },
    {
        name: "Dr. Ayesha Khan",
        email: "ayesha.khan@nutriconnect.com",
        password: "skinhealth2023",
        licenseNumber:70756125,
        age: 40,
        phone: "+919876543228",
        interestedField: "Nutritional Dermatology",
        degreeType: "MBBS",
        licenseIssuer: "Medical Council of India",
        idProofType: "Aadhaar",
        specializationDomain: "Skin Health",
        profileImage: "https://images.apollo247.in/images/consult_home/icons/female.png",
        files: {
            resume: null,
            degree_certificate: null,
            license_document: null,
            id_proof: null,
            experience_certificates: null,
            specialization_certifications: null,
            internship_certificate: null,
            research_papers: null,
            finalReport: null
        },
        verificationStatus: {
            resume: "Verified",
            degree_certificate: "Verified",
            license_document: "Verified",
            id_proof: "Verified",
            experience_certificates: "Verified",
            specialization_certifications: "Verified",
            internship_certificate: "Verified",
            research_papers: "Verified",
            finalReport: "Verified"
        },
        specialization: ["Acne Management", "Skin Glow", "Anti-Aging"],
        experience: 10,
        fees: 1800,
        languages: ["English", "Hindi", "Urdu"],
        location: "Mumbai",
        rating: 4.9,
        online: true,
        offline: true,
        about: "Expert in nutrition for skin health with focus on acne management and natural glow.",
        education: ["MBBS", "Diploma in Dermatology", "Certification in Nutritional Dermatology"]
    },
    {
        name: "Shivani Kapoor",
        email: "shivani.kapoor@nutriconnect.com",
        password: "haircare456",
        licenseNumber:25698764,
        age: 34,
        phone: "+919876543229",
        interestedField: "Nutritional Trichology",
        degreeType: "BSc",
        licenseIssuer: "Indian Dietetic Association",
        idProofType: "Aadhaar",
        specializationDomain: "Hair Health",
        profileImage: "https://images.apollo247.in/images/consult_home/icons/female.png",
        files: {
            resume: null,
            degree_certificate: null,
            license_document: null,
            id_proof: null,
            experience_certificates: null,
            specialization_certifications: null,
            internship_certificate: null,
            research_papers: null,
            finalReport: null
        },
        verificationStatus: {
            resume: "Verified",
            degree_certificate: "Verified",
            license_document: "Verified",
            id_proof: "Verified",
            experience_certificates: "Verified",
            specialization_certifications: "Verified",
            internship_certificate: "Verified",
            research_papers: "Verified",
            finalReport: "Verified"
        },
        specialization: ["Hair Loss", "Hair Strength"],
        experience: 7,
        fees: 1400,
        languages: ["English", "Hindi"],
        location: "Delhi",
        rating: 4.8,
        online: true,
        offline: false,
        about: "Specialized in nutritional interventions for hair loss and promoting hair growth.",
        education: ["BSc in Nutrition", "Certification in Trichology"]
    },
    {
        name: "Rajan Sharma",
        email: "rajan.sharma@nutriconnect.com",
        password: "antiaging789",
        licenseNumber:25256791,
        age: 45,
        phone: "+919876543230",
        interestedField: "Nutritional Dermatology",
        degreeType: "MD",
        licenseIssuer: "Medical Council of India",
        idProofType: "Aadhaar",
        specializationDomain: "Skin Health",
        profileImage: "https://images.apollo247.in/images/consult_home/icons/male.png?tr=w-150,c-at_max,f-auto,q=80,dpr-2",
        files: {
            resume: null,
            degree_certificate: null,
            license_document: null,
            id_proof: null,
            experience_certificates: null,
            specialization_certifications: null,
            internship_certificate: null,
            research_papers: null,
            finalReport: null
        },
        verificationStatus: {
            resume: "Verified",
            degree_certificate: "Verified",
            license_document: "Verified",
            id_proof: "Verified",
            experience_certificates: "Verified",
            specialization_certifications: "Verified",
            internship_certificate: "Verified",
            research_papers: "Verified",
            finalReport: "Verified"
        },
        specialization: ["Anti-Aging", "Skin Glow"],
        experience: 12,
        fees: 2000,
        languages: ["English", "Kannada", "Tamil"],
        location: "Bangalore",
        rating: 4.9,
        online: true,
        offline: true,
        about: "Expert in anti-aging nutritional interventions and skin regeneration.",
        education: ["MBBS", "MD in Dermatology", "PhD in Skin Nutrition"]
    },
    {
        name: "Anika Sharma",
        email: "anika.sharma@nutriconnect.com",
        password: "skincomplexion101",
        licenseNumber:11246578,
        age: 30,
        phone: "+919876543231",
        interestedField: "Nutritional Dermatology",
        degreeType: "MSc",
        licenseIssuer: "Indian Dietetic Association",
        idProofType: "Aadhaar",
        specializationDomain: "Skin Health",
        profileImage: "https://images.apollo247.in/images/consult_home/icons/female.png",
        files: {
            resume: null,
            degree_certificate: null,
            license_document: null,
            id_proof: null,
            experience_certificates: null,
            specialization_certifications: null,
            internship_certificate: null,
            research_papers: null,
            finalReport: null
        },
        verificationStatus: {
            resume: "Verified",
            degree_certificate: "Verified",
            license_document: "Verified",
            id_proof: "Verified",
            experience_certificates: "Verified",
            specialization_certifications: "Verified",
            internship_certificate: "Verified",
            research_papers: "Verified",
            finalReport: "Verified"
        },
        specialization: ["Acne Management", "Skin Glow"],
        experience: 5,
        fees: 1000,
        languages: ["English", "Telugu", "Hindi"],
        location: "Hyderabad",
        rating: 4.6,
        online: true,
        offline: false,
        about: "Specialized in diet-based solutions for acne and improving skin complexion.",
        education: ["MSc in Clinical Nutrition", "Certification in Skin Health"]
    },
    {
        name: "Dr. Preeti Nair",
        email: "preeti.nair@nutriconnect.com",
        password: "hairstrength2022",
        licenseNumber:21436587,
        age: 37,
        phone: "+919876543232",
        interestedField: "Nutritional Trichology",
        degreeType: "MBBS",
        licenseIssuer: "Medical Council of India",
        idProofType: "Aadhaar",
        specializationDomain: "Hair Health",
        profileImage: "https://images.apollo247.in/images/consult_home/icons/female.png",
        files: {
            resume: null,
            degree_certificate: null,
            license_document: null,
            id_proof: null,
            experience_certificates: null,
            specialization_certifications: null,
            internship_certificate: null,
            research_papers: null,
            finalReport: null
        },
        verificationStatus: {
            resume: "Verified",
            degree_certificate: "Verified",
            license_document: "Verified",
            id_proof: "Verified",
            experience_certificates: "Verified",
            specialization_certifications: "Verified",
            internship_certificate: "Verified",
            research_papers: "Verified",
            finalReport: "Verified"
        },
        specialization: ["Hair Loss", "Hair Strength", "Scalp Health"],
        experience: 9,
        fees: 1600,
        languages: ["English", "Tamil", "Malayalam"],
        location: "Chennai",
        rating: 4.8,
        online: true,
        offline: true,
        about: "Hair care nutrition expert with focus on scalp health and hair strength.",
        education: ["MBBS", "Trichology Specialization", "Certification in Hair Nutrition"]
    },
    {
        name: "Vikram Malhotra",
        email: "vikram.malhotra@nutriconnect.com",
        password: "skinelasticity303",
        licenseNumber:65464587,
        age: 36,
        phone: "+919876543233",
        interestedField: "Nutritional Dermatology",
        degreeType: "MSc",
        licenseIssuer: "Indian Dietetic Association",
        idProofType: "Aadhaar",
        specializationDomain: "Skin Health",
        profileImage: "https://images.apollo247.in/images/consult_home/icons/male.png?tr=w-150,c-at_max,f-auto,q=80,dpr-2",
        files: {
            resume: null,
            degree_certificate: null,
            license_document: null,
            id_proof: null,
            experience_certificates: null,
            specialization_certifications: null,
            internship_certificate: null,
            research_papers: null,
            finalReport: null
        },
        verificationStatus: {
            resume: "Verified",
            degree_certificate: "Verified",
            license_document: "Verified",
            id_proof: "Verified",
            experience_certificates: "Verified",
            specialization_certifications: "Verified",
            internship_certificate: "Verified",
            research_papers: "Verified",
            finalReport: "Verified"
        },
        specialization: ["Anti-Aging", "Skin Elasticity"],
        experience: 8,
        fees: 1500,
        languages: ["English", "Hindi", "Marathi"],
        location: "Pune",
        rating: 4.7,
        online: true,
        offline: true,
        about: "Specialized in anti-aging nutrition and improving skin elasticity.",
        education: ["MSc in Nutrition", "Certification in Anti-Aging Nutrition"]
    },
    {
        name: "Dr. Meera Sharma",
        email: "meera.sharma@nutriconnect.com",
        password: "guthealth2023",
        licenseNumber:45769821,
        age: 38,
        phone: "+919876543222",
        interestedField: "Gut Health Nutrition",
        degreeType: "MD",
        licenseIssuer: "Medical Council of India",
        idProofType: "Aadhaar",
        specializationDomain: "Digestive Health",
        profileImage: "https://images.apollo247.in/images/consult_home/icons/female.png",
        files: {
            resume: null,
            degree_certificate: null,
            license_document: null,
            id_proof: null,
            experience_certificates: null,
            specialization_certifications: null,
            internship_certificate: null,
            research_papers: null,
            finalReport: null
        },
        verificationStatus: {
            resume: "Verified",
            degree_certificate: "Verified",
            license_document: "Verified",
            id_proof: "Verified",
            experience_certificates: "Verified",
            specialization_certifications: "Verified",
            internship_certificate: "Verified",
            research_papers: "Verified",
            finalReport: "Verified"
        },
        specialization: ["IBS Management", "GERD", "Gut Microbiome"],
        experience: 9,
        fees: 1500,
        languages: ["English", "Hindi"],
        location: "Mumbai",
        rating: 4.9,
        online: true,
        offline: true,
        about: "Specialist in treating digestive disorders with a focus on IBS and leaky gut syndrome.",
        education: ["MD in Gastroenterology", "Certified in Nutritional Medicine"]
    },
    {
        name: "Rohan Desai",
        email: "rohan.desai@nutriconnect.com",
        password: "microbiome456",
        licenseNumber:32416579,
        age: 32,
        phone: "+919876543223",
        interestedField: "Gut Health Nutrition",
        degreeType: "MSc",
        licenseIssuer: "Indian Dietetic Association",
        idProofType: "Aadhaar",
        specializationDomain: "Gut Microbiome",
        profileImage: "https://images.apollo247.in/images/consult_home/icons/male.png?tr=w-150,c-at_max,f-auto,q=80,dpr-2",
        files: {
            resume: null,
            degree_certificate: null,
            license_document: null,
            id_proof: null,
            experience_certificates: null,
            specialization_certifications: null,
            internship_certificate: null,
            research_papers: null,
            finalReport: null
        },
        verificationStatus: {
            resume: "Verified",
            degree_certificate: "Verified",
            license_document: "Verified",
            id_proof: "Verified",
            experience_certificates: "Verified",
            specialization_certifications: "Verified",
            internship_certificate: "Verified",
            research_papers: "Verified",
            finalReport: "Verified"
        },
        specialization: ["Gut Microbiome", "Food Sensitivities"],
        experience: 6,
        fees: 1200,
        languages: ["English", "Kannada", "Hindi"],
        location: "Bangalore",
        rating: 4.7,
        online: true,
        offline: false,
        about: "Expert in gut microbiome optimization and food sensitivity management.",
        education: ["MSc in Nutritional Science", "Certification in Functional Medicine"]
    },
    {
        name: "Dr. Anjali Reddy",
        email: "anjali.reddy@nutriconnect.com",
        password: "gutcare789",
        licenseNumber:78460922,
        age: 45,
        phone: "+919876543224",
        interestedField: "Gut Health Nutrition",
        degreeType: "PhD",
        licenseIssuer: "Medical Council of India",
        idProofType: "Aadhaar",
        specializationDomain: "Digestive Health",
        profileImage: "https://images.apollo247.in/images/consult_home/icons/female.png",
        files: {
            resume: null,
            degree_certificate: null,
            license_document: null,
            id_proof: null,
            experience_certificates: null,
            specialization_certifications: null,
            internship_certificate: null,
            research_papers: null,
            finalReport: null
        },
        verificationStatus: {
            resume: "Verified",
            degree_certificate: "Verified",
            license_document: "Verified",
            id_proof: "Verified",
            experience_certificates: "Verified",
            specialization_certifications: "Verified",
            internship_certificate: "Verified",
            research_papers: "Verified",
            finalReport: "Verified"
        },
        specialization: ["GERD", "Gut Inflammation", "IBS Management"],
        experience: 12,
        fees: 1800,
        languages: ["English", "Telugu", "Hindi"],
        location: "Hyderabad",
        rating: 4.9,
        online: true,
        offline: true,
        about: "Specialized in holistic gut health restoration and acid reflux management.",
        education: ["PhD in Digestive Health", "MS in Clinical Nutrition"]
    },
    {
        name: "Pramod Kumar",
        email: "pramod.kumar@nutriconnect.com",
        password: "leakygut101",
        licenseNumber:98732145,
        age: 29,
        phone: "+919876543225",
        interestedField: "Gut Health Nutrition",
        degreeType: "BSc",
        licenseIssuer: "Indian Dietetic Association",
        idProofType: "Aadhaar",
        specializationDomain: "Digestive Health",
        profileImage: "https://images.apollo247.in/images/consult_home/icons/male.png?tr=w-150,c-at_max,f-auto,q=80,dpr-2",
        files: {
            resume: null,
            degree_certificate: null,
            license_document: null,
            id_proof: null,
            experience_certificates: null,
            specialization_certifications: null,
            internship_certificate: null,
            research_papers: null,
            finalReport: null
        },
        verificationStatus: {
            resume: "Verified",
            degree_certificate: "Verified",
            license_document: "Verified",
            id_proof: "Verified",
            experience_certificates: "Verified",
            specialization_certifications: "Verified",
            internship_certificate: "Verified",
            research_papers: "Verified",
            finalReport: "Verified"
        },
        specialization: ["Leaky Gut Syndrome", "Gut Microbiome"],
        experience: 4,
        fees: 800,
        languages: ["English", "Hindi"],
        location: "Delhi",
        rating: 4.5,
        online: true,
        offline: false,
        about: "Focuses on healing leaky gut syndrome through dietary interventions.",
        education: ["BSc in Nutrition", "Certified in Digestive Health"]
    },
    {
        name: "Dr. Priya Venkatesh",
        email: "priya.venkatesh@nutriconnect.com",
        password: "ibdcare2022",
        licenseNumber:99933312,
        age: 40,
        phone: "+919876543226",
        interestedField: "Gut Health Nutrition",
        degreeType: "MD",
        licenseIssuer: "Medical Council of India",
        idProofType: "Aadhaar",
        specializationDomain: "Digestive Health",
        profileImage: "https://images.apollo247.in/images/consult_home/icons/female.png",
        files: {
            resume: null,
            degree_certificate: null,
            license_document: null,
            id_proof: null,
            experience_certificates: null,
            specialization_certifications: null,
            internship_certificate: null,
            research_papers: null,
            finalReport: null
        },
        verificationStatus: {
            resume: "Verified",
            degree_certificate: "Verified",
            license_document: "Verified",
            id_proof: "Verified",
            experience_certificates: "Verified",
            specialization_certifications: "Verified",
            internship_certificate: "Verified",
            research_papers: "Verified",
            finalReport: "Verified"
        },
        specialization: ["IBD", "GERD", "Gut Inflammation"],
        experience: 10,
        fees: 1600,
        languages: ["English", "Tamil", "Telugu"],
        location: "Chennai",
        rating: 4.8,
        online: true,
        offline: true,
        about: "Expert in treating inflammatory bowel disease through nutrition.",
        education: ["MD in Internal Medicine", "Diploma in Gastroenterology"]
    },
    {
        name: "Karthik Rao",
        email: "karthik.rao@nutriconnect.com",
        password: "foodintolerance303",
        licenseNumber:11223344,
        age: 33,
        phone: "+919876543227",
        interestedField: "Gut Health Nutrition",
        degreeType: "MSc",
        licenseIssuer: "Indian Dietetic Association",
        idProofType: "Aadhaar",
        specializationDomain: "Gut Microbiome",
        profileImage: "https://images.apollo247.in/images/consult_home/icons/male.png?tr=w-150,c-at_max,f-auto,q=80,dpr-2",
        files: {
            resume: null,
            degree_certificate: null,
            license_document: null,
            id_proof: null,
            experience_certificates: null,
            specialization_certifications: null,
            internship_certificate: null,
            research_papers: null,
            finalReport: null
        },
        verificationStatus: {
            resume: "Verified",
            degree_certificate: "Verified",
            license_document: "Verified",
            id_proof: "Verified",
            experience_certificates: "Verified",
            specialization_certifications: "Verified",
            internship_certificate: "Verified",
            research_papers: "Verified",
            finalReport: "Verified"
        },
        specialization: ["Gut Microbiome", "Food Intolerances"],
        experience: 5,
        fees: 900,
        languages: ["English", "Marathi", "Hindi"],
        location: "Pune",
        rating: 4.6,
        online: true,
        offline: true,
        about: "Specializes in gut health recovery and food intolerance management.",
        education: ["MSc in Clinical Nutrition", "Certification in Microbiome Analysis"]
    },
    {
        name: "Dr. Harish Mehta",
        email: "harish.mehta@nutriconnect.com",
        password: "weightloss2023",
        licenseNumber:66542233,
        age: 42,
        phone: "+919876543234",
        interestedField: "Weight Management",
        degreeType: "MBBS",
        licenseIssuer: "Medical Council of India",
        idProofType: "Aadhaar",
        specializationDomain: "Obesity and Metabolic Health",
        profileImage: "https://images.apollo247.in/images/consult_home/icons/male.png?tr=w-150,c-at_max,f-auto,q=80,dpr-2",
        files: {
            resume: null,
            degree_certificate: null,
            license_document: null,
            id_proof: null,
            experience_certificates: null,
            specialization_certifications: null,
            internship_certificate: null,
            research_papers: null,
            finalReport: null
        },
        verificationStatus: {
            resume: "Verified",
            degree_certificate: "Verified",
            license_document: "Verified",
            id_proof: "Verified",
            experience_certificates: "Verified",
            specialization_certifications: "Verified",
            internship_certificate: "Verified",
            research_papers: "Verified",
            finalReport: "Verified"
        },
        specialization: ["Weight Loss", "Obesity Management", "Metabolic Health"],
        experience: 10,
        fees: 1800,
        languages: ["English", "Hindi", "Marathi"],
        location: "Mumbai",
        rating: 4.9,
        online: true,
        offline: true,
        about: "Expert in sustainable weight loss with focus on metabolic health improvement.",
        education: ["MBBS", "Diploma in Clinical Nutrition", "Certification in Obesity Management"]
    },
    {
        name: "Natasha Patel",
        email: "natasha.patel@nutriconnect.com",
        password: "mindfuleating456",
        licenseNumber:19965887,
        age: 34,
        phone: "+919876543235",
        interestedField: "Weight Management",
        degreeType: "MSc",
        licenseIssuer: "Indian Dietetic Association",
        idProofType: "Aadhaar",
        specializationDomain: "Mindful Eating",
        profileImage: "https://images.apollo247.in/images/consult_home/icons/female.png",
        files: {
            resume: null,
            degree_certificate: null,
            license_document: null,
            id_proof: null,
            experience_certificates: null,
            specialization_certifications: null,
            internship_certificate: null,
            research_papers: null,
            finalReport: null
        },
        verificationStatus: {
            resume: "Verified",
            degree_certificate: "Verified",
            license_document: "Verified",
            id_proof: "Verified",
            experience_certificates: "Verified",
            specialization_certifications: "Verified",
            internship_certificate: "Verified",
            research_papers: "Verified",
            finalReport: "Verified"
        },
        specialization: ["Weight Loss", "Mindful Eating"],
        experience: 7,
        fees: 1400,
        languages: ["English", "Hindi"],
        location: "Delhi",
        rating: 4.7,
        online: true,
        offline: false,
        about: "Specialized in mindful eating approaches for sustainable weight management.",
        education: ["MSc in Nutrition", "Certification in Mindful Eating Coaching"]
    },
    {
        name: "Dr. Ramesh Iyer",
        email: "ramesh.iyer@nutriconnect.com",
        password: "metabolic789",
        licenseNumber:45669871,
        age: 48,
        phone: "+919876543236",
        interestedField: "Weight Management",
        degreeType: "MD",
        licenseIssuer: "Medical Council of India",
        idProofType: "Aadhaar",
        specializationDomain: "Obesity and Metabolic Health",
        profileImage: "https://images.apollo247.in/images/consult_home/icons/male.png?tr=w-150,c-at_max,f-auto,q=80,dpr-2",
        files: {
            resume: null,
            degree_certificate: null,
            license_document: null,
            id_proof: null,
            experience_certificates: null,
            specialization_certifications: null,
            internship_certificate: null,
            research_papers: null,
            finalReport: null
        },
        verificationStatus: {
            resume: "Verified",
            degree_certificate: "Verified",
            license_document: "Verified",
            id_proof: "Verified",
            experience_certificates: "Verified",
            specialization_certifications: "Verified",
            internship_certificate: "Verified",
            research_papers: "Verified",
            finalReport: "Verified"
        },
        specialization: ["Metabolic Health", "Obesity Management"],
        experience: 15,
        fees: 2200,
        languages: ["English", "Kannada", "Tamil"],
        location: "Bangalore",
        rating: 4.9,
        online: true,
        offline: true,
        about: "Specializes in treating clinical obesity and metabolic disorders.",
        education: ["MBBS", "MD in Endocrinology", "PhD in Metabolic Research"]
    },
    {
        name: "Sarika Reddy",
        email: "sarika.reddy@nutriconnect.com",
        password: "sportsnutrition101",
        licenseNumber:13074518,
        age: 31,
        phone: "+919876543237",
        interestedField: "Weight Management",
        degreeType: "BSc",
        licenseIssuer: "Indian Dietetic Association",
        idProofType: "Aadhaar",
        specializationDomain: "Sports Nutrition",
        profileImage: "https://images.apollo247.in/images/consult_home/icons/female.png",
        files: {
            resume: null,
            degree_certificate: null,
            license_document: null,
            id_proof: null,
            experience_certificates: null,
            specialization_certifications: null,
            internship_certificate: null,
            research_papers: null,
            finalReport: null
        },
        verificationStatus: {
            resume: "Verified",
            degree_certificate: "Verified",
            license_document: "Verified",
            id_proof: "Verified",
            experience_certificates: "Verified",
            specialization_certifications: "Verified",
            internship_certificate: "Verified",
            research_papers: "Verified",
            finalReport: "Verified"
        },
        specialization: ["Weight Loss", "Sports Nutrition"],
        experience: 6,
        fees: 1200,
        languages: ["English", "Telugu", "Hindi"],
        location: "Hyderabad",
        rating: 4.6,
        online: true,
        offline: false,
        about: "Focuses on athletic performance enhancement and weight management.",
        education: ["BSc in Nutrition", "Sports Nutrition Certification", "Weight Management Specialist"]
    },
    {
        name: "Dr. Nandini Shah",
        email: "nandini.shah@nutriconnect.com",
        password: "weightgain2022",
        licenseNumber:20223033,
        age: 38,
        phone: "+919876543238",
        interestedField: "Weight Management",
        degreeType: "MBBS",
        licenseIssuer: "Medical Council of India",
        idProofType: "Aadhaar",
        specializationDomain: "Holistic Nutrition",
        profileImage: "https://images.apollo247.in/images/consult_home/icons/female.png",
        files: {
            resume: null,
            degree_certificate: null,
            license_document: null,
            id_proof: null,
            experience_certificates: null,
            specialization_certifications: null,
            internship_certificate: null,
            research_papers: null,
            finalReport: null
        },
        verificationStatus: {
            resume: "Verified",
            degree_certificate: "Verified",
            license_document: "Verified",
            id_proof: "Verified",
            experience_certificates: "Verified",
            specialization_certifications: "Verified",
            internship_certificate: "Verified",
            research_papers: "Verified",
            finalReport: "Verified"
        },
        specialization: ["Weight Gain", "Holistic Nutrition"],
        experience: 9,
        fees: 1600,
        languages: ["English", "Tamil", "Hindi"],
        location: "Chennai",
        rating: 4.8,
        online: true,
        offline: true,
        about: "Expert in healthy weight gain and holistic nutrition approaches.",
        education: ["MBBS", "Diploma in Nutrition", "Holistic Health Certification"]
    },
    {
        name: "Dr. Rajiv Kapoor",
        email: "rajiv.kapoor@nutriconnect.com",
        password: "obesitycare303",
        licenseNumber:89788984,
        age: 43,
        phone: "+919876543239",
        interestedField: "Weight Management",
        degreeType: "MD",
        licenseIssuer: "Medical Council of India",
        idProofType: "Aadhaar",
        specializationDomain: "Obesity Management",
        profileImage: "https://images.apollo247.in/images/consult_home/icons/male.png?tr=w-150,c-at_max,f-auto,q=80,dpr-2",
        files: {
            resume: null,
            degree_certificate: null,
            license_document: null,
            id_proof: null,
            experience_certificates: null,
            specialization_certifications: null,
            internship_certificate: null,
            research_papers: null,
            finalReport: null
        },
        verificationStatus: {
            resume: "Verified",
            degree_certificate: "Verified",
            license_document: "Verified",
            id_proof: "Verified",
            experience_certificates: "Verified",
            specialization_certifications: "Verified",
            internship_certificate: "Verified",
            research_papers: "Verified",
            finalReport: "Verified"
        },
        specialization: ["Obesity Management", "Weight Loss"],
        experience: 11,
        fees: 1900,
        languages: ["English", "Hindi", "Marathi"],
        location: "Pune",
        rating: 4.7,
        online: true,
        offline: true,
        about: "Specializes in clinical approaches to obesity management.",
        education: ["MBBS", "MD in Internal Medicine", "Certification in Obesity Medicine"]
    },
    {
    name: "Dr. Priya Sharma",
    email: "priya.sharma@nutriconnect.com",
    password: "pcoscare2023",
    licenseNumber:20242025,
    age: 38,
    phone: "+919876543240",
    interestedField: "Women's Health Nutrition",
    degreeType: "MD",
    licenseIssuer: "Medical Council of India",
    idProofType: "Aadhaar",
    specializationDomain: "Reproductive Health",
    profileImage: "https://images.apollo247.in/images/consult_home/icons/female.png",
    files: {
        resume: null,
        degree_certificate: null,
        license_document: null,
        id_proof: null,
        experience_certificates: null,
        specialization_certifications: null,
        internship_certificate: null,
        research_papers: null,
        finalReport: null
    },
    verificationStatus: {
        resume: "Verified",
        degree_certificate: "Verified",
        license_document: "Verified",
        id_proof: "Verified",
        experience_certificates: "Verified",
        specialization_certifications: "Verified",
        internship_certificate: "Verified",
        research_papers: "Verified",
        finalReport: "Verified"
    },
    specialization: ["PCOS", "Pregnancy Nutrition", "Fertility"],
    experience: 10,
    fees: 1800,
    languages: ["English", "Hindi", "Marathi"],
    location: "Mumbai",
    rating: 4.9,
    online: true,
    offline: true,
    about: "Specialist in PCOS management and fertility enhancement through nutrition.",
    education: ["MBBS", "MD in Obstetrics & Gynecology", "Certification in Reproductive Nutrition"]
},
{
    name: "Anita Desai",
    email: "anita.desai@womenshealth.com",
    password: "pregnancynutrition456",
    licenseNumber:19981985,
    age: 35,
    phone: "+919876543241",
    interestedField: "Women's Health Nutrition",
    degreeType: "MSc",
    licenseIssuer: "Indian Dietetic Association",
    idProofType: "Aadhaar",
    specializationDomain: "Maternal Nutrition",
    profileImage: "https://images.apollo247.in/images/consult_home/icons/female.png",
    files: {
        resume: null,
        degree_certificate: null,
        license_document: null,
        id_proof: null,
        experience_certificates: null,
        specialization_certifications: null,
        internship_certificate: null,
        research_papers: null,
        finalReport: null
    },
    verificationStatus: {
        resume: "Verified",
        degree_certificate: "Verified",
        license_document: "Verified",
        id_proof: "Verified",
        experience_certificates: "Verified",
        specialization_certifications: "Verified",
        internship_certificate: "Verified",
        research_papers: "Verified",
        finalReport: "Verified"
    },
    specialization: ["Pregnancy Nutrition", "Post-Partum Diet"],
    experience: 8,
    fees: 1500,
    languages: ["English", "Hindi"],
    location: "Delhi",
    rating: 4.8,
    online: true,
    offline: true,
    about: "Expert in prenatal and postnatal nutrition with focus on balanced nourishment.",
    education: ["MSc in Clinical Nutrition", "Specialized in Maternal Nutrition"]
},
{
    name: "Dr. Lakshmi Menon",
    email: "lakshmi.menon@nutriconnect.com",
    password: "menopause789",
    licenseNumber:20052006,
    age: 47,
    phone: "+919876543242",
    interestedField: "Women's Health Nutrition",
    degreeType: "MD",
    licenseIssuer: "Medical Council of India",
    idProofType: "Aadhaar",
    specializationDomain: "Menopause and Hormonal Health",
    profileImage: "https://images.apollo247.in/images/consult_home/icons/female.png",
    files: {
        resume: null,
        degree_certificate: null,
        license_document: null,
        id_proof: null,
        experience_certificates: null,
        specialization_certifications: null,
        internship_certificate: null,
        research_papers: null,
        finalReport: null
    },
    verificationStatus: {
        resume: "Verified",
        degree_certificate: "Verified",
        license_document: "Verified",
        id_proof: "Verified",
        experience_certificates: "Verified",
        specialization_certifications: "Verified",
        internship_certificate: "Verified",
        research_papers: "Verified",
        finalReport: "Verified"
    },
    specialization: ["Menopause", "Hormonal Balance"],
    experience: 15,
    fees: 2000,
    languages: ["English", "Kannada", "Malayalam"],
    location: "Bangalore",
    rating: 4.9,
    online: true,
    offline: true,
    about: "Specialized in managing menopausal symptoms and hormonal imbalances through diet.",
    education: ["MBBS", "MD in Internal Medicine", "Certification in Women's Health"]
},
{
    name: "Divya Reddy",
    email: "divya.reddy@nutriconnect.com",
    password: "fertility101",
    licenseNumber:10110220,
    age: 32,
    phone: "+919876543243",
    interestedField: "Women's Health Nutrition",
    degreeType: "BSc",
    licenseIssuer: "Indian Dietetic Association",
    idProofType: "Aadhaar",
    specializationDomain: "Reproductive Health",
    profileImage: "https://images.apollo247.in/images/consult_home/icons/female.png",
    files: {
        resume: null,
        degree_certificate: null,
        license_document: null,
        id_proof: null,
        experience_certificates: null,
        specialization_certifications: null,
        internship_certificate: null,
        research_papers: null,
        finalReport: null
    },
    verificationStatus: {
        resume: "Verified",
        degree_certificate: "Verified",
        license_document: "Verified",
        id_proof: "Verified",
        experience_certificates: "Verified",
        specialization_certifications: "Verified",
        internship_certificate: "Verified",
        research_papers: "Verified",
        finalReport: "Verified"
    },
    specialization: ["PCOS", "Fertility", "Weight Management"],
    experience: 7,
    fees: 1200,
    languages: ["English", "Telugu", "Hindi"],
    location: "Hyderabad",
    rating: 4.7,
    online: true,
    offline: false,
    about: "Helps women with PCOS manage symptoms and improve fertility through tailored nutrition.",
    education: ["BSc in Nutrition", "Certification in Reproductive Health Nutrition"]
},
{
    name: "Dr. Maya Iyer",
    email: "maya.iyer@nutriconnect.com",
    password: "pregnancycare2022",
    licenseNumber:98487601,
    age: 36,
    phone: "+919876543244",
    interestedField: "Women's Health Nutrition",
    degreeType: "MBBS",
    licenseIssuer: "Medical Council of India",
    idProofType: "Aadhaar",
    specializationDomain: "Maternal Nutrition",
    profileImage: "https://images.apollo247.in/images/consult_home/icons/female.png",
    files: {
        resume: null,
        degree_certificate: null,
        license_document: null,
        id_proof: null,
        experience_certificates: null,
        specialization_certifications: null,
        internship_certificate: null,
        research_papers: null,
        finalReport: null
    },
    verificationStatus: {
        resume: "Verified",
        degree_certificate: "Verified",
        license_document: "Verified",
        id_proof: "Verified",
        experience_certificates: "Verified",
        specialization_certifications: "Verified",
        internship_certificate: "Verified",
        research_papers: "Verified",
        finalReport: "Verified"
    },
    specialization: ["Pregnancy Nutrition", "Breastfeeding Support"],
    experience: 9,
    fees: 1600,
    languages: ["English", "Tamil", "Malayalam"],
    location: "Chennai",
    rating: 4.8,
    online: true,
    offline: true,
    about: "Expert in pregnancy nutrition and breastfeeding dietary support.",
    education: ["MBBS", "Diploma in Maternal Nutrition", "Lactation Consultant Certification"]
},
{
    name: "Neha Kapoor",
    email: "neha.kapoor@nutriconnect.com",
    password: "bonehealth303",
    licenseNumber:30120360,
    age: 41,
    phone: "+919876543245",
    interestedField: "Women's Health Nutrition",
    degreeType: "MSc",
    licenseIssuer: "Indian Dietetic Association",
    idProofType: "Aadhaar",
    specializationDomain: "Menopause and Bone Health",
    profileImage: "https://images.apollo247.in/images/consult_home/icons/female.png",
    files: {
        resume: null,
        degree_certificate: null,
        license_document: null,
        id_proof: null,
        experience_certificates: null,
        specialization_certifications: null,
        internship_certificate: null,
        research_papers: null,
        finalReport: null
    },
    verificationStatus: {
        resume: "Verified",
        degree_certificate: "Verified",
        license_document: "Verified",
        id_proof: "Verified",
        experience_certificates: "Verified",
        specialization_certifications: "Verified",
        internship_certificate: "Verified",
        research_papers: "Verified",
        finalReport: "Verified"
    },
    specialization: ["Menopause", "Bone Health"],
    experience: 12,
    fees: 1700,
    languages: ["English", "Hindi", "Marathi"],
    location: "Pune",
    rating: 4.7,
    online: true,
    offline: true,
    about: "Focuses on nutrition for menopausal women with emphasis on bone health.",
    education: ["MSc in Nutrition", "PhD in Women's Health Nutrition"]
}
];


// DietitianInfo data
const dietitianInfoData = [
    {
        title: "Dr. Anjali Sharma - Skin & Hair Care Specialist",
        description: "Specialist in nutrition-based interventions for skin and hair health.",
        specialties: ["Skin Health", "Hair Care", "Nutritional Dermatology"],
        education: ["MD in Dermatology", "Certified in Nutritional Medicine"],
        expertise: ["Skin Health", "Hair Care", "Nutritional Dermatology"],
        certifications: [
            { name: "Certified Nutritional Dermatologist", year: 2020, issuer: "International Board of Nutritional Dermatology" }
        ],
        awards: [
            { name: "Excellence in Dermatology Nutrition", year: 2021, description: "Awarded for innovative approaches in nutritional dermatology" }
        ],
        publications: [
            { title: "Nutrition's Role in Skin Health", year: 2022, link: "https://example.com/publication1" }
        ],
        testimonials: [
            { text: "Dr. Sharma's nutritional approach transformed my skin health completely.", author: "Priya K.", rating: 5 }
        ],
        languages: ["English", "Hindi", "Telugu"],
        consultationTypes: [
            { type: "online", duration: 45, fee: 1500 }
        ],
        availability: {
            workingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            workingHours: { start: "09:00", end: "17:00" }
        },
        socialMedia: {
            linkedin: "https://linkedin.com/in/dr-anjali-sharma",
            twitter: "https://twitter.com/dranjalisharmaa"
        }
    },
    {
        title: "Dr. Priya Singh - PCOS Nutrition Specialist",
        description: "Dr. Priya Singh specializes in managing Polycystic Ovary Syndrome (PCOS) through tailored nutrition plans. With 5 years of experience, she helps women balance hormones and improve overall health.",
        specialties: ["PCOS Management", "Hormonal Balance", "Women's Health"],
        education: ["M.S. in Nutrition", "Registered Dietitian Nutritionist (RDN)", "Certified in Women's Health Nutrition"],
        expertise: ["PCOS Diet Plans", "Hormonal Health", "Weight Management for Women", "Fertility Nutrition"],
        certifications: [
            { name: "Certified Women's Health Nutritionist", year: 2019, issuer: "International Board of Nutrition" }
        ],
        awards: [
            { name: "Excellence in Women's Health Nutrition", year: 2021, description: "Recognized for outstanding contributions to PCOS management" }
        ],
        publications: [
            { title: "Nutritional Approaches to PCOS Management", year: 2021, link: "https://example.com/pcos-nutrition" }
        ],
        testimonials: [
            { text: "Dr.Priya's guidance helped me manage my PCOS symptoms effectively. Her diet plans are easy to follow and highly effective.", author: "Sneha R.", rating: 5 },
            { text: "I feel more in control of my health thanks to Dr. Priya's expertise and support.", author: "Kavita P.", rating: 5 }
        ],
        languages: ["English", "Hindi"],
        consultationTypes: [
            { type: "online", duration: 45, fee: 1000 },
            { type: "offline", duration: 60, fee: 1200 }
        ],
        availability: {
            workingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            workingHours: { start: "09:00", end: "17:00" }
        },
        socialMedia: {
            linkedin: "https://linkedin.com/in/dr-priya-singh",
            twitter: "https://twitter.com/drpriyasingh"
        }
    },
    {
        title: "Dr. Vikas Gupta - Thyroid Care Specialist",
        description: "Dr. Vikas Gupta focuses on thyroid health and provides evidence-based nutrition plans to manage thyroid disorders. With 3 years of experience, he has helped numerous clients improve their thyroid function.",
        specialties: ["Thyroid Management", "Metabolic Health", "Weight Control"],
        education: ["M.S. in Clinical Nutrition", "Registered Dietitian Nutritionist (RDN)"],
        expertise: ["Thyroid Diet Plans", "Hypothyroidism Management", "Hyperthyroidism Nutrition", "Metabolic Syndrome"],
        certifications: [
            { name: "Certified Thyroid Nutrition Specialist", year: 2020, issuer: "International Board of Thyroid Nutrition" }
        ],
        awards: [
            { name: "Excellence in Thyroid Care", year: 2022, description: "Recognized for innovative approaches in thyroid nutrition" }
        ],
        publications: [
            { title: "Nutritional Management of Thyroid Disorders", year: 2022, link: "https://example.com/thyroid-nutrition" }
        ],
        testimonials: [
            { text: "Dr. Vikas's diet plan helped me manage my hypothyroidism effectively. I feel more energetic and healthier.", author: "Rahul S.", rating: 5 },
            { text: "His expertise in thyroid care is unmatched. Highly recommend him for anyone struggling with thyroid issues.", author: "Priya K.", rating: 5 }
        ],
        languages: ["Hindi"],
        consultationTypes: [
            { type: "offline", duration: 45, fee: 800 }
        ],
        availability: {
            workingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            workingHours: { start: "09:00", end: "17:00" }
        },
        socialMedia: {
            linkedin: "https://linkedin.com/in/dr-vikas-gupta",
            twitter: "https://twitter.com/drvikasgupta"
        }
    },
    {
        title: "Dr. Deepak Chowdary - Weight Loss Specialist",
        description: "Dr. Deepak Chowdary has 7 years of experience in weight management and specializes in creating sustainable weight loss plans. His holistic approach ensures long-term results.",
        specialties: ["Weight Loss", "Obesity Management", "Metabolic Health"],
        education: ["Ph.D. in Nutrition", "Registered Dietitian Nutritionist (RDN)", "Certified Obesity Specialist"],
        expertise: ["Weight Loss Programs", "Obesity Management", "Metabolic Syndrome", "Sustainable Diet Plans"],
        certifications: [
            { name: "Certified Obesity Specialist", year: 2018, issuer: "International Board of Obesity Management" }
        ],
        awards: [
            { name: "Excellence in Weight Management", year: 2021, description: "Recognized for innovative approaches in sustainable weight loss" }
        ],
        publications: [
            { title: "Sustainable Approaches to Weight Management", year: 2021, link: "https://example.com/weight-management" }
        ],
        testimonials: [
            { text: "Dr. Chowdary's weight loss program helped me shed 20 kgs in a healthy and sustainable way. Highly recommend him!", author: "Arjun Thakur", rating: 5 },
            { text: "His approach is practical and effective. I finally found a diet plan that works for me.", author: "Suman Aiyer", rating: 5 }
        ],
        languages: ["Telugu", "Hindi", "English", "Tamil"],
        consultationTypes: [
            { type: "offline", duration: 60, fee: 2000 }
        ],
        availability: {
            workingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            workingHours: { start: "09:00", end: "17:00" }
        },
        socialMedia: {
            linkedin: "https://linkedin.com/in/dr-deepak-chowdary",
            twitter: "https://twitter.com/drdeepakchowdary"
        }
    },
    {
        title: "Dr. Shriya Patel - Pregnancy Care Specialist",
        description: "Dr. Shriya Patel specializes in maternal and prenatal nutrition, ensuring the health of both mother and baby. With 1 year of experience, she provides tailored nutrition plans for pregnant women.",
        specialties: ["Pregnancy Nutrition", "Maternal Health", "Postpartum Care"],
        education: ["M.S. in Nutrition", "Registered Dietitian Nutritionist (RDN)", "Certified in Maternal Nutrition"],
        expertise: ["Prenatal Nutrition", "Postpartum Recovery", "Lactation Support", "Healthy Pregnancy Diets"],
        certifications: [
            { name: "Certified Maternal Nutrition Specialist", year: 2022, issuer: "International Board of Maternal Health" }
        ],
        awards: [
            { name: "Excellence in Maternal Nutrition", year: 2022, description: "Recognized for outstanding contributions to maternal health" }
        ],
        publications: [
            { title: "Nutritional Care During Pregnancy", year: 2022, link: "https://example.com/pregnancy-nutrition" }
        ],
        testimonials: [
            { text: "Mam Shriya's guidance during my pregnancy was invaluable. Her diet plans kept me and my baby healthy.", author: "Anjali R.", rating: 5 },
            { text: "Her expertise in pregnancy nutrition is exceptional. I felt confident and well-supported throughout my journey.", author: "Meera K.", rating: 5 }
        ],
        languages: ["Telugu", "Hindi", "Tamil"],
        consultationTypes: [
            { type: "offline", duration: 45, fee: 500 }
        ],
        availability: {
            workingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            workingHours: { start: "09:00", end: "17:00" }
        },
        socialMedia: {
            linkedin: "https://linkedin.com/in/dr-shriya-patel",
            twitter: "https://twitter.com/drshriyapatel"
        }
    },
    {
        title: "Dr. Laura Sen - Cardiac Health Nutrition Specialist",
        description: "Dr. Laura Sen has 7 years of experience in cardiac nutrition, helping clients manage heart health through tailored diet plans. Her expertise ensures optimal cardiovascular health.",
        specialties: ["Cardiac Health", "Cholesterol Management", "Heart Disease Prevention"],
        education: ["Ph.D. in Nutrition", "Registered Dietitian Nutritionist (RDN)", "Certified in Cardiac Nutrition"],
        expertise: ["Heart-Healthy Diets", "Cholesterol Control", "Hypertension Management", "Cardiac Rehabilitation"],
        certifications: [
            { name: "Certified Cardiac Nutrition Specialist", year: 2018, issuer: "International Board of Cardiac Nutrition" }
        ],
        awards: [
            { name: "Excellence in Cardiac Nutrition", year: 2021, description: "Recognized for innovative approaches in heart health management" }
        ],
        publications: [
            { title: "Nutritional Management of Heart Disease", year: 2021, link: "https://example.com/cardiac-nutrition" }
        ],
        testimonials: [
            { text: "Dr. Sen's diet plan helped me lower my cholesterol levels significantly. Her expertise is unmatched.", author: "Rajesh P.", rating: 5 },
            { text: "I feel more confident about my heart health thanks to Dr. Laura's guidance.", author: "Sonia M.", rating: 5 }
        ],
        languages: ["Telugu"],
        consultationTypes: [
            { type: "online", duration: 45, fee: 1800 }
        ],
        availability: {
            workingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            workingHours: { start: "09:00", end: "17:00" }
        },
        socialMedia: {
            linkedin: "https://linkedin.com/in/dr-laura-sen",
            twitter: "https://twitter.com/drlaura"
        }
    },
    {
        title: "Dr. Reyansh Gupta - Cholesterol Control Specialist",
        description: "Dr. Reyansh Gupta specializes in cholesterol management and metabolic health. With 3 years of experience, he provides effective nutrition plans to improve lipid profiles.",
        specialties: ["Cholesterol Control", "Metabolic Health", "Weight Management"],
        education: ["M.S. in Nutrition", "Registered Dietitian Nutritionist (RDN)", "Certified in Lipid Management"],
        expertise: ["Cholesterol-Lowering Diets", "Metabolic Syndrome", "Weight Loss Programs", "Heart Health"],
        certifications: [
            { name: "Certified Lipid Management Specialist", year: 2020, issuer: "International Board of Lipid Management" }
        ],
        awards: [
            { name: "Excellence in Lipid Management", year: 2022, description: "Recognized for innovative approaches in cholesterol control" }
        ],
        publications: [
            { title: "Nutritional Approaches to Cholesterol Management", year: 2022, link: "https://example.com/cholesterol-nutrition" }
        ],
        testimonials: [
            { text: "Dr. Gupta's diet plan helped me lower my cholesterol levels naturally. Highly recommend his expertise!", author: "Vikram Seth", rating: 5 },
            { text: "His approach is practical and effective. I feel healthier and more energetic.", author: "Neha Rachit", rating: 5 }
        ],
        languages: ["Hindi", "English"],
        consultationTypes: [
            { type: "online", duration: 45, fee: 700 },
            { type: "offline", duration: 60, fee: 900 }
        ],
        availability: {
            workingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            workingHours: { start: "09:00", end: "17:00" }
        },
        socialMedia: {
            linkedin: "https://linkedin.com/in/dr-reyansh-gupta",
            twitter: "https://twitter.com/drreyansh"
        }
    },
    {
        title: "Dr. Bhaskar Rao - Weight Loss Specialist",
        description: "Dr. Bhaskar Rao has 7 years of experience in weight management and specializes in creating sustainable weight loss plans. His holistic approach ensures long-term results.",
        specialties: ["Weight Loss", "Obesity Management", "Metabolic Health"],
        education: ["Ph.D. in Nutrition", "Registered Dietitian Nutritionist (RDN)", "Certified Obesity Specialist"],
        expertise: ["Weight Loss Programs", "Obesity Management", "Metabolic Syndrome", "Sustainable Diet Plans"],
        certifications: [
            { name: "Certified Obesity Specialist", year: 2018, issuer: "International Board of Obesity Management" }
        ],
        awards: [
            { name: "Excellence in Weight Management", year: 2021, description: "Recognized for innovative approaches in sustainable weight loss" }
        ],
        publications: [
            { title: "Sustainable Approaches to Weight Management", year: 2021, link: "https://example.com/weight-management" }
        ],
        testimonials: [
            { text: "Dr. Rao's weight loss program helped me achieve my goals in a healthy and sustainable way. Highly recommend him!", author: "Suresh K.", rating: 5 },
            { text: "His approach is practical and effective. I finally found a diet plan that works for me.", author: "Latha R.", rating: 5 }
        ],
        languages: ["Telugu", "Hindi", "English"],
        consultationTypes: [
            { type: "offline", duration: 60, fee: 2000 }
        ],
        availability: {
            workingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            workingHours: { start: "09:00", end: "17:00" }
        },
        socialMedia: {
            linkedin: "https://linkedin.com/in/dr-bhaskar-rao",
            twitter: "https://twitter.com/drbhaskarrao"
        }
    },
    {
        title: "Dr. Rahul Sharma - Sports Nutrition Specialist",
        description: "Dr. Rahul Sharma specializes in sports nutrition, helping athletes optimize their performance and recovery. With 5 years of experience, he provides tailored nutrition plans for all fitness levels.",
        specialties: ["Sports Nutrition", "Performance", "Recovery"],
        education: ["M.S. in Sports Nutrition", "Registered Dietitian Nutritionist (RDN)", "Certified Specialist in Sports Dietetics (CSSD)"],
        expertise: ["Athletic Performance Nutrition", "Muscle Building", "Race/Event Preparation", "Recovery Optimization"],
        certifications: [
            { name: "Certified Sports Nutrition Specialist", year: 2019, issuer: "International Board of Sports Nutrition" }
        ],
        awards: [
            { name: "Excellence in Sports Nutrition", year: 2021, description: "Recognized for outstanding contributions to athletic performance" }
        ],
        publications: [
            { title: "Nutritional Strategies for Athletic Performance", year: 2021, link: "https://example.com/sports-nutrition" }
        ],
        testimonials: [
            { text: "Dr. Sharma's nutrition plan helped me improve my marathon time by 15 minutes. His knowledge of sports nutrition is unmatched.", author: "David K., Marathon Runner", rating: 5 },
            { text: "As a professional athlete, nutrition is critical to my performance. Dr. Rahul's guidance has been instrumental in taking my game to the next level.", author: "Lisa M., Professional Tennis Player", rating: 5 }
        ],
        languages: ["English", "Hindi"],
        consultationTypes: [
            { type: "online", duration: 45, fee: 1100 }
        ],
        availability: {
            workingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            workingHours: { start: "09:00", end: "17:00" }
        },
        socialMedia: {
            linkedin: "https://linkedin.com/in/dr-rahul-sharma",
            twitter: "https://twitter.com/drrahulsharma"
        }
    },
    {
        "title": "Dr. Neha Reddy - Women's Health Nutrition Specialist",
        "description": "Dr. Neha Reddy is dedicated to empowering women through personalized nutrition plans that support hormonal balance, reproductive health, and overall wellness. She works with women across all life stages, from adolescence to menopause.",
        "specialties": ["Women's Nutrition", "Hormonal Health", "Fertility & Pregnancy Nutrition"],
        "education": ["M.S. in Nutrition", "Registered Dietitian Nutritionist (RDN)", "Board Certified Specialist in Women's Health Nutrition"],
        "expertise": ["Hormonal Balance", "Prenatal & Postnatal Nutrition", "Menopause Management", "Polycystic Ovary Syndrome (PCOS)"],
        "certifications": [
            { "name": "Certified Women's Health Nutrition Specialist", "year": 2022, "issuer": "International Board of Nutrition and Dietetics" }
        ],
        "awards": [
            { "name": "Excellence in Women's Nutrition", "year": 2022, "description": "Recognized for innovative approaches in women's health nutrition" }
        ],
        "publications": [
            { "title": "Nutrition for Women's Wellness", "year": 2022, "link": "https://example.com/womens-nutrition" }
        ],
        "testimonials": [
            { "text": "Dr. Reddy's guidance on managing my PCOS through diet was life-changing. I feel more balanced and energized!", "author": "Priya M., Client", "rating": 5 },
            { "text": "Thanks to Dr. Neha, my pregnancy nutrition plan was easy to follow and helped me stay healthy for my baby.", "author": "Sarah K., Client", "rating": 5 }
        ],
        "languages": ["Telugu"],
        "consultationTypes": [
            { "type": "offline", "duration": 45, "fee": 600 }
        ],
        "availability": {
            "workingDays": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            "workingHours": { "start": "09:00", "end": "17:00" }
        },
        "socialMedia": {
            "linkedin": "https://linkedin.com/in/dr-neha-reddy",
            "twitter": "https://twitter.com/drneha"
        }
    },
    {
        title: "Dr. Rajiv Sharma - Heart Health Specialist",
        description: "Cardiologist with over 12 years of experience specializing in nutrition-based interventions for heart health.",
        specialties: ["Cholesterol Management", "Hypertension"],
        education: ["MD in Cardiology", "Certified in Nutritional Medicine"],
        expertise: ["Cholesterol Management", "Hypertension"],
        certifications: [
            { name: "Certified Cardiac Nutritionist", year: 2015, issuer: "International Board of Nutritional Medicine" }
        ],
        awards: [
            { name: "Excellence in Cardiac Nutrition", year: 2018, description: "Awarded for contributions to heart health nutrition" }
        ],
        publications: [
            { title: "Nutrition and Heart Health", year: 2020, link: "https://example.com/publication2" }
        ],
        testimonials: [
            { text: "Dr. Sharma's diet plans significantly improved my cholesterol levels.", author: "Amit P.", rating: 5 }
        ],
        languages: ["English", "Hindi"],
        consultationTypes: [
            { type: "online", duration: 45, fee: 1200 },
            { type: "offline", duration: 45, fee: 1200 }
        ],
        availability: {
            workingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            workingHours: { start: "09:00", end: "17:00" }
        },
        socialMedia: {
            linkedin: "https://linkedin.com/in/dr-rajiv-sharma",
            twitter: "https://twitter.com/drrajivsharma"
        }
    },
    {
        title: "Dr. Meera Iyer - Cardiac Recovery Specialist",
        description: "Specialized in post-cardiac surgery dietary management and hypertension control through nutrition.",
        specialties: ["Post-Cardiac Surgery", "Hypertension"],
        education: ["MBBS", "MD (Nutrition)", "Fellowship in Cardiac Rehabilitation"],
        expertise: ["Post-Cardiac Surgery", "Hypertension"],
        certifications: [
            { name: "Certified Cardiac Rehabilitation Specialist", year: 2019, issuer: "Indian Association of Cardiac Rehabilitation" }
        ],
        awards: [
            { name: "Best Nutritionist in Cardiac Care", year: 2020, description: "Recognized for expertise in post-surgery nutrition" }
        ],
        publications: [
            { title: "Dietary Management Post-Cardiac Surgery", year: 2021, link: "https://example.com/publication3" }
        ],
        testimonials: [
            { text: "Dr. Iyer's guidance helped me recover faster after surgery.", author: "Suresh R.", rating: 4.8 }
        ],
        languages: ["English", "Tamil", "Telugu"],
        consultationTypes: [
            { type: "online", duration: 45, fee: 900 },
            { type: "offline", duration: 45, fee: 900 }
        ],
        availability: {
            workingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            workingHours: { start: "09:00", end: "17:00" }
        },
        socialMedia: {
            linkedin: "https://linkedin.com/in/dr-meera-iyer",
            twitter: "https://twitter.com/drmeeraaiyer"
        }
    },
    {
        title: "Anita Desai - Cardiac Nutrition Specialist",
        description: "Dedicated to helping cardiac patients improve their heart health through evidence-based nutrition plans.",
        specialties: ["Cholesterol Management", "Post-Cardiac Surgery"],
        education: ["MSc in Clinical Nutrition", "Specialized Cardiac Nutritionist"],
        expertise: ["Cholesterol Management", "Post-Cardiac Surgery"],
        certifications: [
            { name: "Certified Clinical Nutritionist", year: 2018, issuer: "Indian Dietetic Association" }
        ],
        awards: [
            { name: "Innovative Nutritionist Award", year: 2019, description: "Recognized for evidence-based cardiac nutrition plans" }
        ],
        publications: [
            { title: "Cholesterol Management through Nutrition", year: 2020, link: "https://example.com/publication4" }
        ],
        testimonials: [
            { text: "Anita's diet plans were easy to follow and effective.", author: "Rina S.", rating: 4.6 }
        ],
        languages: ["English", "Hindi", "Gujarati"],
        consultationTypes: [
            { type: "online", duration: 45, fee: 800 }
        ],
        availability: {
            workingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            workingHours: { start: "09:00", end: "17:00" }
        },
        socialMedia: {
            linkedin: "https://linkedin.com/in/anita-desai",
            twitter: "https://twitter.com/anitadesaii"
        }
    },
    {
        title: "Dr. Vikram Naidu - Heart Health Expert",
        description: "Expert in managing cardiac conditions through lifestyle and nutrition interventions with 15+ years experience.",
        specialties: ["Hypertension", "Cholesterol Management"],
        education: ["MD in Cardiology", "PhD in Nutritional Sciences"],
        expertise: ["Hypertension", "Cholesterol Management"],
        certifications: [
            { name: "Certified Nutritional Cardiologist", year: 2014, issuer: "International Board of Nutritional Medicine" }
        ],
        awards: [
            { name: "Lifetime Achievement in Cardiac Nutrition", year: 2022, description: "Honored for contributions to cardiac nutrition" }
        ],
        publications: [
            { title: "Lifestyle Interventions for Heart Health", year: 2023, link: "https://example.com/publication5" }
        ],
        testimonials: [
            { text: "Dr. Naidu's expertise changed my life for the better.", author: "Venkat T.", rating: 5 }
        ],
        languages: ["English", "Telugu"],
        consultationTypes: [
            { type: "online", duration: 45, fee: 1500 },
            { type: "offline", duration: 45, fee: 1500 }
        ],
        availability: {
            workingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            workingHours: { start: "09:00", end: "17:00" }
        },
        socialMedia: {
            linkedin: "https://linkedin.com/in/dr-vikram-naidu",
            twitter: "https://twitter.com/drvikramnaidu"
        }
    },
    {
        title: "Priya Malhotra - Cardiac Recovery Nutritionist",
        description: "Focused on preventive cardiac nutrition and post-surgery dietary management for optimal recovery.",
        specialties: ["Post-Cardiac Surgery", "Cholesterol Management"],
        education: ["BSc in Nutrition", "Certified in Cardiac Rehabilitation Nutrition"],
        expertise: ["Post-Cardiac Surgery", "Cholesterol Management"],
        certifications: [
            { name: "Certified Cardiac Nutritionist", year: 2021, issuer: "Indian Dietetic Association" }
        ],
        awards: [
            { name: "Emerging Nutritionist Award", year: 2022, description: "Recognized for work in preventive cardiac nutrition" }
        ],
        publications: [
            { title: "Preventive Nutrition for Heart Health", year: 2023, link: "https://example.com/publication6" }
        ],
        testimonials: [
            { text: "Priya's diet plans were practical and helped my recovery.", author: "Neha J.", rating: 4.5 }
        ],
        languages: ["English", "Hindi", "Punjabi"],
        consultationTypes: [
            { type: "online", duration: 45, fee: 600 },
            { type: "offline", duration: 45, fee: 600 }
        ],
        availability: {
            workingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            workingHours: { start: "09:00", end: "17:00" }
        },
        socialMedia: {
            linkedin: "https://linkedin.com/in/priya-malhotra",
            twitter: "https://twitter.com/priyamalhotraa"
        }
    },
    {
        title: "Dr. Sunita Sharma - Diabetes Management Specialist",
        description: "Diabetes management expert specializing in nutrition therapy for blood sugar control.",
        specialties: ["Type 2 Diabetes", "Insulin Management", "Diabetic Diet"],
        education: ["MBBS", "MD in Endocrinology", "Certification in Diabetes Education"],
        expertise: ["Type 2 Diabetes", "Insulin Management", "Diabetic Diet"],
        certifications: [
            { name: "Certified Diabetes Educator", year: 2016, issuer: "National Diabetes Education Board" }
        ],
        awards: [
            { name: "Excellence in Diabetes Nutrition", year: 2020, description: "Recognized for innovative diabetes management techniques" }
        ],
        publications: [
            { title: "Nutrition Therapy for Diabetes", year: 2021, link: "https://example.com/publication7" }
        ],
        testimonials: [
            { text: "Dr. Sharma's nutrition plans helped me control my diabetes effectively.", author: "Ravi M.", rating: 5 }
        ],
        languages: ["English", "Hindi", "Marathi"],
        consultationTypes: [
            { type: "online", duration: 45, fee: 2000 },
            { type: "offline", duration: 45, fee: 2000 }
        ],
        availability: {
            workingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            workingHours: { start: "09:00", end: "17:00" }
        },
        socialMedia: {
            linkedin: "https://linkedin.com/in/dr-sunita-sharma",
            twitter: "https://twitter.com/drsunitasharma"
        }
    },
    {
        title: "Dr. Ajay Verma - Thyroid Nutrition Specialist",
        description: "Specializes in nutritional management of thyroid disorders, particularly hypothyroidism.",
        specialties: ["Thyroid Disorders", "Hypothyroidism"],
        education: ["MBBS", "Diploma in Endocrinology", "Thyroid Nutrition Specialist"],
        expertise: ["Thyroid Disorders", "Hypothyroidism"],
        certifications: [
            { name: "Certified Thyroid Nutritionist", year: 2018, issuer: "Indian Thyroid Society" }
        ],
        awards: [
            { name: "Best Thyroid Nutritionist", year: 2019, description: "Recognized for expertise in hypothyroidism management" }
        ],
        publications: [
            { title: "Nutritional Management of Hypothyroidism", year: 2020, link: "https://example.com/publication8" }
        ],
        testimonials: [
            { text: "Dr. Verma's diet plans improved my thyroid function significantly.", author: "Anita R.", rating: 4.8 }
        ],
        languages: ["English", "Hindi"],
        consultationTypes: [
            { type: "online", duration: 45, fee: 1600 },
            { type: "offline", duration: 45, fee: 1600 }
        ],
        availability: {
            workingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            workingHours: { start: "09:00", end: "17:00" }
        },
        socialMedia: {
            linkedin: "https://linkedin.com/in/dr-ajay-verma",
            twitter: "https://twitter.com/drajayverma"
        }
    },
    {
        title: "Dr. Meera Krishnan - Diabetes Care Specialist",
        description: "Specialist in type 1 diabetes management and gestational diabetes care.",
        specialties: ["Type 1 Diabetes", "Gestational Diabetes"],
        education: ["MBBS", "MD in Internal Medicine", "Fellowship in Diabetology"],
        expertise: ["Type 1 Diabetes", "Gestational Diabetes"],
        certifications: [
            { name: "Certified Diabetologist", year: 2015, issuer: "Indian Association of Diabetology" }
        ],
        awards: [
            { name: "Excellence in Gestational Diabetes Care", year: 2021, description: "Recognized for expertise in gestational diabetes" }
        ],
        publications: [
            { title: "Gestational Diabetes Management", year: 2022, link: "https://example.com/publication9" }
        ],
        testimonials: [
            { text: "Dr. Krishnan's guidance was invaluable during my pregnancy.", author: "Lakshmi S.", rating: 5 }
        ],
        languages: ["English", "Kannada", "Tamil"],
        consultationTypes: [
            { type: "online", duration: 45, fee: 2200 },
            { type: "offline", duration: 45, fee: 2200 }
        ],
        availability: {
            workingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            workingHours: { start: "09:00", end: "17:00" }
        },
        socialMedia: {
            linkedin: "https://linkedin.com/in/dr-meera-krishnan",
            twitter: "https://twitter.com/drmeeraak"
        }
    },
    {
        title: "Rahul Kapoor - Diabetes Prevention Specialist",
        description: "Focuses on preventing diabetes progression through nutrition and lifestyle modifications.",
        specialties: ["Pre-Diabetes", "Metabolic Syndrome"],
        education: ["MSc in Clinical Nutrition", "Certification in Diabetes Prevention"],
        expertise: ["Pre-Diabetes", "Metabolic Syndrome"],
        certifications: [
            { name: "Certified Diabetes Prevention Specialist", year: 2019, issuer: "Indian Dietetic Association" }
        ],
        awards: [
            { name: "Innovative Nutritionist Award", year: 2020, description: "Recognized for diabetes prevention strategies" }
        ],
        publications: [
            { title: "Preventing Diabetes through Nutrition", year: 2021, link: "https://example.com/publication10" }
        ],
        testimonials: [
            { text: "Rahul's lifestyle advice helped me avoid diabetes.", author: "Sandeep K.", rating: 4.7 }
        ],
        languages: ["English", "Hindi", "Telugu"],
        consultationTypes: [
            { type: "online", duration: 45, fee: 1200 }
        ],
        availability: {
            workingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            workingHours: { start: "09:00", end: "17:00" }
        },
        socialMedia: {
            linkedin: "https://linkedin.com/in/rahul-kapoor",
            twitter: "https://twitter.com/rahulkapoor"
        }
    },
    {
        title: "Dr. Priya Nair - Thyroid Nutrition Expert",
        description: "Expert in nutritional therapies for hyperthyroidism and autoimmune thyroid conditions.",
        specialties: ["Hyperthyroidism", "Autoimmune Thyroid Disease"],
        education: ["MBBS", "MD in Endocrinology", "Certification in Autoimmune Nutrition"],
        expertise: ["Hyperthyroidism", "Autoimmune Thyroid Disease"],
        certifications: [
            { name: "Certified Autoimmune Nutritionist", year: 2017, issuer: "Indian Thyroid Society" }
        ],
        awards: [
            { name: "Excellence in Thyroid Nutrition", year: 2021, description: "Recognized for contributions to thyroid health" }
        ],
        publications: [
            { title: "Nutrition for Autoimmune Thyroid Conditions", year: 2022, link: "https://example.com/publication11" }
        ],
        testimonials: [
            { text: "Dr. Nair's diet plans helped manage my hyperthyroidism effectively.", author: "Divya P.", rating: 4.9 }
        ],
        languages: ["English", "Tamil", "Malayalam"],
        consultationTypes: [
            { type: "online", duration: 45, fee: 1800 },
            { type: "offline", duration: 45, fee: 1800 }
        ],
        availability: {
            workingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            workingHours: { start: "09:00", end: "17:00" }
        },
        socialMedia: {
            linkedin: "https://linkedin.com/in/dr-priya-nair",
            twitter: "https://twitter.com/drpriyanair"
        }
    },
    {
        title: "Dr. Vikram Singh - Diabetic Complications Specialist",
        description: "Specializes in diabetic complications management through dietary intervention.",
        specialties: ["Type 2 Diabetes", "Diabetic Neuropathy"],
        education: ["MBBS", "Diploma in Diabetology", "Certification in Diabetic Complications"],
        expertise: ["Type 2 Diabetes", "Diabetic Neuropathy"],
        certifications: [
            { name: "Certified Diabetic Complications Specialist", year: 2018, issuer: "Indian Association of Diabetology" }
        ],
        awards: [
            { name: "Best Diabetologist Award", year: 2020, description: "Recognized for expertise in diabetic complications" }
        ],
        publications: [
            { title: "Dietary Interventions for Diabetic Neuropathy", year: 2021, link: "https://example.com/publication12" }
        ],
        testimonials: [
            { text: "Dr. Singh's guidance reduced my neuropathy symptoms significantly.", author: "Mahesh T.", rating: 4.8 }
        ],
        languages: ["English", "Hindi", "Marathi"],
        consultationTypes: [
            { type: "online", duration: 45, fee: 1700 },
            { type: "offline", duration: 45, fee: 1700 }
        ],
        availability: {
            workingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            workingHours: { start: "09:00", end: "17:00" }
        },
        socialMedia: {
            linkedin: "https://linkedin.com/in/dr-vikram-singh",
            twitter: "https://twitter.com/drvikramsingh"
        }
    },
    {
        title: "Dr. Meera Sharma - Gut Health Specialist",
        description: "Specialist in treating digestive disorders with a focus on IBS and leaky gut syndrome.",
        specialties: ["IBS Management", "GERD", "Gut Microbiome"],
        education: ["MD in Gastroenterology", "Certified in Nutritional Medicine"],
        expertise: ["IBS Management", "GERD", "Gut Microbiome"],
        certifications: [
            { name: "Certified Gut Health Nutritionist", year: 2018, issuer: "Indian Association of Gastroenterology" }
        ],
        awards: [
            { name: "Excellence in Gut Health Nutrition", year: 2021, description: "Recognized for innovative IBS management techniques" }
        ],
        publications: [
            { title: "Nutrition for IBS and Gut Health", year: 2022, link: "https://example.com/publication13" }
        ],
        testimonials: [
            { text: "Dr. Sharma's diet plans transformed my digestive health.", author: "Neha S.", rating: 5 }
        ],
        languages: ["English", "Hindi"],
        consultationTypes: [
            { type: "online", duration: 45, fee: 1500 },
            { type: "offline", duration: 45, fee: 1500 }
        ],
        availability: {
            workingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            workingHours: { start: "09:00", end: "17:00" }
        },
        socialMedia: {
            linkedin: "https://linkedin.com/in/dr-meera-sharma",
            twitter: "https://twitter.com/drmeeraasharma"
        }
    },
    {
        title: "Rohan Desai - Gut Microbiome Specialist",
        description: "Expert in gut microbiome optimization and food sensitivity management.",
        specialties: ["Gut Microbiome", "Food Sensitivities"],
        education: ["MSc in Nutritional Science", "Certification in Functional Medicine"],
        expertise: ["Gut Microbiome", "Food Sensitivities"],
        certifications: [
            { name: "Certified Functional Medicine Practitioner", year: 2019, issuer: "Indian Dietetic Association" }
        ],
        awards: [
            { name: "Innovative Nutritionist Award", year: 2020, description: "Recognized for microbiome optimization techniques" }
        ],
        publications: [
            { title: "Optimizing Gut Microbiome through Nutrition", year: 2021, link: "https://example.com/publication14" }
        ],
        testimonials: [
            { text: "Rohan's guidance helped me manage my food sensitivities effectively.", author: "Arjun K.", rating: 4.8 }
        ],
        languages: ["English", "Kannada", "Hindi"],
        consultationTypes: [
            { type: "online", duration: 45, fee: 1200 }
        ],
        availability: {
            workingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            workingHours: { start: "09:00", end: "17:00" }
        },
        socialMedia: {
            linkedin: "https://linkedin.com/in/rohan-desai",
            twitter: "https://twitter.com/rohandesaii"
        }
    },
    {
        title: "Dr. Anjali Reddy - Digestive Health Specialist",
        description: "Specialized in holistic gut health restoration and acid reflux management.",
        specialties: ["GERD", "Gut Inflammation", "IBS Management"],
        education: ["PhD in Digestive Health", "MS in Clinical Nutrition"],
        expertise: ["GERD", "Gut Inflammation", "IBS Management"],
        certifications: [
            { name: "Certified Digestive Health Specialist", year: 2016, issuer: "Indian Association of Gastroenterology" }
        ],
        awards: [
            { name: "Excellence in Gut Health Restoration", year: 2022, description: "Recognized for holistic gut health approaches" }
        ],
        publications: [
            { title: "Holistic Management of Acid Reflux", year: 2023, link: "https://example.com/publication15" }
        ],
        testimonials: [
            { text: "Dr. Reddy's approach completely resolved my GERD issues.", author: "Srinivas R.", rating: 5 }
        ],
        languages: ["English", "Telugu", "Hindi"],
        consultationTypes: [
            { type: "online", duration: 45, fee: 1800 },
            { type: "offline", duration: 45, fee: 1800 }
        ],
        availability: {
            workingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            workingHours: { start: "09:00", end: "17:00" }
        },
        socialMedia: {
            linkedin: "https://linkedin.com/in/dr-anjali-reddy",
            twitter: "https://twitter.com/dranjalireddy"
        }
    },
    {
        title: "Pramod Kumar - Leaky Gut Specialist",
        description: "Focuses on healing leaky gut syndrome through dietary interventions.",
        specialties: ["Leaky Gut Syndrome", "Gut Microbiome"],
        education: ["BSc in Nutrition", "Certified in Digestive Health"],
        expertise: ["Leaky Gut Syndrome", "Gut Microbiome"],
        certifications: [
            { name: "Certified Digestive Health Nutritionist", year: 2020, issuer: "Indian Dietetic Association" }
        ],
        awards: [
            { name: "Emerging Nutritionist Award", year: 2021, description: "Recognized for leaky gut syndrome management" }
        ],
        publications: [
            { title: "Dietary Interventions for Leaky Gut", year: 2022, link: "https://example.com/publication16" }
        ],
        testimonials: [
            { text: "Pramod's diet plans helped heal my leaky gut issues.", author: "Ritu M.", rating: 4.6 }
        ],
        languages: ["English", "Hindi"],
        consultationTypes: [
            { type: "online", duration: 45, fee: 800 }
        ],
        availability: {
            workingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            workingHours: { start: "09:00", end: "17:00" }
        },
        socialMedia: {
            linkedin: "https://linkedin.com/in/pramod-kumar",
            twitter: "https://twitter.com/pramodkumarr"
        }
    },
    {
        title: "Dr. Priya Venkatesh - IBD Nutrition Expert",
        description: "Expert in treating inflammatory bowel disease through nutrition.",
        specialties: ["IBD", "GERD", "Gut Inflammation"],
        education: ["MD in Internal Medicine", "Diploma in Gastroenterology"],
        expertise: ["IBD", "GERD", "Gut Inflammation"],
        certifications: [
            { name: "Certified IBD Nutritionist", year: 2017, issuer: "Indian Association of Gastroenterology" }
        ],
        awards: [
            { name: "Excellence in IBD Nutrition", year: 2020, description: "Recognized for contributions to IBD management" }
        ],
        publications: [
            { title: "Nutrition for Inflammatory Bowel Disease", year: 2021, link: "https://example.com/publication17" }
        ],
        testimonials: [
            { text: "Dr. Venkatesh's guidance significantly improved my IBD symptoms.", author: "Vijay S.", rating: 4.9 }
        ],
        languages: ["English", "Tamil", "Telugu"],
        consultationTypes: [
            { type: "online", duration: 45, fee: 1600 },
            { type: "offline", duration: 45, fee: 1600 }
        ],
        availability: {
            workingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            workingHours: { start: "09:00", end: "17:00" }
        },
        socialMedia: {
            linkedin: "https://linkedin.com/in/dr-priya-venkatesh",
            twitter: "https://twitter.com/drpriyavenkatesh"
        }
    },
    {
        title: "Karthik Rao - Gut Recovery Specialist",
        description: "Specializes in gut health recovery and food intolerance management.",
        specialties: ["Gut Microbiome", "Food Intolerances"],
        education: ["MSc in Clinical Nutrition", "Certification in Microbiome Analysis"],
        expertise: ["Gut Microbiome", "Food Intolerances"],
        certifications: [
            { name: "Certified Microbiome Analyst", year: 2019, issuer: "Indian Dietetic Association" }
        ],
        awards: [
            { name: "Best Nutritionist in Gut Recovery", year: 2021, description: "Recognized for food intolerance management" }
        ],
        publications: [
            { title: "Managing Food Intolerances through Nutrition", year: 2022, link: "https://example.com/publication18" }
        ],
        testimonials: [
            { text: "Karthik's expertise helped me recover my gut health.", author: "Sneha P.", rating: 4.7 }
        ],
        languages: ["English", "Marathi", "Hindi"],
        consultationTypes: [
            { type: "online", duration: 45, fee: 900 },
            { type: "offline", duration: 45, fee: 900 }
        ],
        availability: {
            workingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            workingHours: { start: "09:00", end: "17:00" }
        },
        socialMedia: {
            linkedin: "https://linkedin.com/in/karthik-rao",
            twitter: "https://twitter.com/karthikrao"
        }
    },
    {
        title: "Dr. Ayesha Khan - Skin Health Specialist",
        description: "Expert in nutrition for skin health with focus on acne management and natural glow.",
        specialties: ["Acne Management", "Skin Glow", "Anti-Aging"],
        education: ["MBBS", "Diploma in Dermatology", "Certification in Nutritional Dermatology"],
        expertise: ["Acne Management", "Skin Glow", "Anti-Aging"],
        certifications: [
            { name: "Certified Nutritional Dermatologist", year: 2017, issuer: "Indian Association of Dermatology" }
        ],
        awards: [
            { name: "Excellence in Skin Nutrition", year: 2020, description: "Recognized for innovative acne management techniques" }
        ],
        publications: [
            { title: "Nutrition for Skin Health", year: 2021, link: "https://example.com/publication19" }
        ],
        testimonials: [
            { text: "Dr. Khan's diet plans cleared my acne and improved my skin glow.", author: "Sana M.", rating: 5 }
        ],
        languages: ["English", "Hindi", "Urdu"],
        consultationTypes: [
            { type: "online", duration: 45, fee: 1800 },
            { type: "offline", duration: 45, fee: 1800 }
        ],
        availability: {
            workingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            workingHours: { start: "09:00", end: "17:00" }
        },
        socialMedia: {
            linkedin: "https://linkedin.com/in/dr-ayesha-khan",
            twitter: "https://twitter.com/drayeshakhan"
        }
    },
    {
        title: "Shivani Kapoor - Hair Care Specialist",
        description: "Specialized in nutritional interventions for hair loss and promoting hair growth.",
        specialties: ["Hair Loss", "Hair Strength"],
        education: ["BSc in Nutrition", "Certification in Trichology"],
        expertise: ["Hair Loss", "Hair Strength"],
        certifications: [
            { name: "Certified Trichologist", year: 2018, issuer: "Indian Trichology Association" }
        ],
        awards: [
            { name: "Best Hair Nutritionist", year: 2021, description: "Recognized for expertise in hair growth nutrition" }
        ],
        publications: [
            { title: "Nutrition for Hair Growth", year: 2020, link: "https://example.com/publication20" }
        ],
        testimonials: [
            { text: "Shivani's guidance significantly reduced my hair loss.", author: "Priya R.", rating: 4.9 }
        ],
        languages: ["English", "Hindi"],
        consultationTypes: [
            { type: "online", duration: 45, fee: 1400 }
        ],
        availability: {
            workingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            workingHours: { start: "09:00", end: "17:00" }
        },
        socialMedia: {
            linkedin: "https://linkedin.com/in/shivani-kapoor",
            twitter: "https://twitter.com/shivanikapoor"
        }
    },
    {
        title: "Rajan Sharma - Anti-Aging Specialist",
        description: "Expert in anti-aging nutritional interventions and skin regeneration.",
        specialties: ["Anti-Aging", "Skin Glow"],
        education: ["MBBS", "MD in Dermatology", "PhD in Skin Nutrition"],
        expertise: ["Anti-Aging", "Skin Glow"],
        certifications: [
            { name: "Certified Skin Nutrition Specialist", year: 2016, issuer: "Indian Association of Dermatology" }
        ],
        awards: [
            { name: "Excellence in Anti-Aging Nutrition", year: 2022, description: "Recognized for contributions to skin regeneration" }
        ],
        publications: [
            { title: "Anti-Aging through Nutrition", year: 2023, link: "https://example.com/publication21" }
        ],
        testimonials: [
            { text: "Rajan’s nutrition plans made my skin look younger.", author: "Karthik V.", rating: 5 }
        ],
        languages: ["English", "Kannada", "Tamil"],
        consultationTypes: [
            { type: "online", duration: 45, fee: 2000 },
            { type: "offline", duration: 45, fee: 2000 }
        ],
        availability: {
            workingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            workingHours: { start: "09:00", end: "17:00" }
        },
        socialMedia: {
            linkedin: "https://linkedin.com/in/rajan-sharma",
            twitter: "https://twitter.com/rajansharmaa"
        }
    },
    {
        title: "Anika Sharma - Skin Complexion Specialist",
        description: "Specialized in diet-based solutions for acne and improving skin complexion.",
        specialties: ["Acne Management", "Skin Glow"],
        education: ["MSc in Clinical Nutrition", "Certification in Skin Health"],
        expertise: ["Acne Management", "Skin Glow"],
        certifications: [
            { name: "Certified Skin Health Nutritionist", year: 2020, issuer: "Indian Dietetic Association" }
        ],
        awards: [
            { name: "Emerging Nutritionist Award", year: 2021, description: "Recognized for acne management solutions" }
        ],
        publications: [
            { title: "Diet for Clear Skin", year: 2022, link: "https://example.com/publication22" }
        ],
        testimonials: [
            { text: "Anika’s diet plans improved my skin complexion drastically.", author: "Riya T.", rating: 4.7 }
        ],
        languages: ["English", "Telugu", "Hindi"],
        consultationTypes: [
            { type: "online", duration: 45, fee: 1000 }
        ],
        availability: {
            workingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            workingHours: { start: "09:00", end: "17:00" }
        },
        socialMedia: {
            linkedin: "https://linkedin.com/in/anika-sharma",
            twitter: "https://twitter.com/anikasharmaa"
        }
    },
    {
        title: "Dr. Preeti Nair - Hair Nutrition Expert",
        description: "Hair care nutrition expert with focus on scalp health and hair strength.",
        specialties: ["Hair Loss", "Hair Strength", "Scalp Health"],
        education: ["MBBS", "Trichology Specialization", "Certification in Hair Nutrition"],
        expertise: ["Hair Loss", "Hair Strength", "Scalp Health"],
        certifications: [
            { name: "Certified Hair Nutritionist", year: 2018, issuer: "Indian Trichology Association" }
        ],
        awards: [
            { name: "Excellence in Hair Nutrition", year: 2020, description: "Recognized for contributions to scalp health" }
        ],
        publications: [
            { title: "Nutrition for Scalp and Hair Health", year: 2021, link: "https://example.com/publication23" }
        ],
        testimonials: [
            { text: "Dr. Nair’s guidance strengthened my hair significantly.", author: "Deepa S.", rating: 4.9 }
        ],
        languages: ["English", "Tamil", "Malayalam"],
        consultationTypes: [
            { type: "online", duration: 45, fee: 1600 },
            { type: "offline", duration: 45, fee: 1600 }
        ],
        availability: {
            workingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            workingHours: { start: "09:00", end: "17:00" }
        },
        socialMedia: {
            linkedin: "https://linkedin.com/in/dr-preeti-nair",
            twitter: "https://twitter.com/drpreetinair"
        }
    },
    {
        title: "Vikram Malhotra - Skin Elasticity Specialist",
        description: "Specialized in anti-aging nutrition and improving skin elasticity.",
        specialties: ["Anti-Aging", "Skin Elasticity"],
        education: ["MSc in Nutrition", "Certification in Anti-Aging Nutrition"],
        expertise: ["Anti-Aging", "Skin Elasticity"],
        certifications: [
            { name: "Certified Anti-Aging Nutritionist", year: 2019, issuer: "Indian Dietetic Association" }
        ],
        awards: [
            { name: "Best Nutritionist in Skin Health", year: 2021, description: "Recognized for skin elasticity improvements" }
        ],
        publications: [
            { title: "Nutrition for Skin Elasticity", year: 2022, link: "https://example.com/publication24" }
        ],
        testimonials: [
            { text: "Vikram’s diet plans improved my skin’s firmness.", author: "Rohan P.", rating: 4.8 }
        ],
        languages: ["English", "Hindi", "Marathi"],
        consultationTypes: [
            { type: "online", duration: 45, fee: 1500 },
            { type: "offline", duration: 45, fee: 1500 }
        ],
        availability: {
            workingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            workingHours: { start: "09:00", end: "17:00" }
        },
        socialMedia: {
            linkedin: "https://linkedin.com/in/vikram-malhotra",
            twitter: "https://twitter.com/vikrammalhotra"
        }
    },
    {
        title: "Dr. Harish Mehta - Weight Loss Specialist",
        description: "Expert in sustainable weight loss with focus on metabolic health improvement.",
        specialties: ["Weight Loss", "Obesity Management", "Metabolic Health"],
        education: ["MBBS", "Diploma in Clinical Nutrition", "Certification in Obesity Management"],
        expertise: ["Weight Loss", "Obesity Management", "Metabolic Health"],
        certifications: [
            { name: "Certified Obesity Management Specialist", year: 2017, issuer: "Indian Association of Obesity Medicine" }
        ],
        awards: [
            { name: "Excellence in Weight Management", year: 2020, description: "Recognized for sustainable weight loss strategies" }
        ],
        publications: [
            { title: "Nutrition for Metabolic Health", year: 2021, link: "https://example.com/publication25" }
        ],
        testimonials: [
            { text: "Dr. Mehta’s plans helped me lose weight sustainably.", author: "Rohan S.", rating: 5 }
        ],
        languages: ["English", "Hindi", "Marathi"],
        consultationTypes: [
            { type: "online", duration: 45, fee: 1800 },
            { type: "offline", duration: 45, fee: 1800 }
        ],
        availability: {
            workingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            workingHours: { start: "09:00", end: "17:00" }
        },
        socialMedia: {
            linkedin: "https://linkedin.com/in/dr-harish-mehta",
            twitter: "https://twitter.com/drharishmehta"
        }
    },
    {
        title: "Natasha Patel - Mindful Eating Specialist",
        description: "Specialized in mindful eating approaches for sustainable weight management.",
        specialties: ["Weight Loss", "Mindful Eating"],
        education: ["MSc in Nutrition", "Certification in Mindful Eating Coaching"],
        expertise: ["Weight Loss", "Mindful Eating"],
        certifications: [
            { name: "Certified Mindful Eating Coach", year: 2018, issuer: "Indian Dietetic Association" }
        ],
        awards: [
            { name: "Best Nutritionist in Mindful Eating", year: 2021, description: "Recognized for innovative weight management techniques" }
        ],
        publications: [
            { title: "Mindful Eating for Weight Loss", year: 2020, link: "https://example.com/publication26" }
        ],
        testimonials: [
            { text: "Natasha’s mindful eating approach changed my relationship with food.", author: "Anita P.", rating: 4.8 }
        ],
        languages: ["English", "Hindi"],
        consultationTypes: [
            { type: "online", duration: 45, fee: 1400 }
        ],
        availability: {
            workingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            workingHours: { start: "09:00", end: "17:00" }
        },
        socialMedia: {
            linkedin: "https://linkedin.com/in/natasha-patel",
            twitter: "https://twitter.com/natashapatel"
        }
    },
    {
        title: "Dr. Ramesh Iyer - Obesity Management Specialist",
        description: "Specializes in treating clinical obesity and metabolic disorders.",
        specialties: ["Metabolic Health", "Obesity Management"],
        education: ["MBBS", "MD in Endocrinology", "PhD in Metabolic Research"],
        expertise: ["Metabolic Health", "Obesity Management"],
        certifications: [
            { name: "Certified Metabolic Health Specialist", year: 2015, issuer: "Indian Association of Endocrinology" }
        ],
        awards: [
            { name: "Excellence in Metabolic Research", year: 2022, description: "Recognized for contributions to obesity treatment" }
        ],
        publications: [
            { title: "Managing Obesity through Nutrition", year: 2023, link: "https://example.com/publication27" }
        ],
        testimonials: [
            { text: "Dr. Iyer’s expertise helped me manage my obesity effectively.", author: "Vikram R.", rating: 5 }
        ],
        languages: ["English", "Kannada", "Tamil"],
        consultationTypes: [
            { type: "online", duration: 45, fee: 2200 },
            { type: "offline", duration: 45, fee: 2200 }
        ],
        availability: {
            workingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            workingHours: { start: "09:00", end: "17:00" }
        },
        socialMedia: {
            linkedin: "https://linkedin.com/in/dr-ramesh-iyer",
            twitter: "https://twitter.com/drrameshiyer"
        }
    },
    {
        title: "Sarika Reddy - Sports Nutrition Specialist",
        description: "Focuses on athletic performance enhancement and weight management.",
        specialties: ["Weight Loss", "Sports Nutrition"],
        education: ["BSc in Nutrition", "Sports Nutrition Certification", "Weight Management Specialist"],
        expertise: ["Weight Loss", "Sports Nutrition"],
        certifications: [
            { name: "Certified Sports Nutritionist", year: 2019, issuer: "Indian Dietetic Association" }
        ],
        awards: [
            { name: "Emerging Nutritionist Award", year: 2020, description: "Recognized for athletic nutrition strategies" }
        ],
        publications: [
            { title: "Nutrition for Athletic Performance", year: 2021, link: "https://example.com/publication28" }
        ],
        testimonials: [
            { text: "Sarika’s plans improved my performance and weight management.", author: "Kiran S.", rating: 4.7 }
        ],
        languages: ["English", "Telugu", "Hindi"],
        consultationTypes: [
            { type: "online", duration: 45, fee: 1200 }
        ],
        availability: {
            workingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            workingHours: { start: "09:00", end: "17:00" }
        },
        socialMedia: {
            linkedin: "https://linkedin.com/in/sarika-reddy",
            twitter: "https://twitter.com/sarikareddy"
        }
    },
    {
        title: "Dr. Nandini Shah - Weight Gain Specialist",
        description: "Expert in healthy weight gain and holistic nutrition approaches.",
        specialties: ["Weight Gain", "Holistic Nutrition"],
        education: ["MBBS", "Diploma in Nutrition", "Holistic Health Certification"],
        expertise: ["Weight Gain", "Holistic Nutrition"],
        certifications: [
            { name: "Certified Holistic Nutritionist", year: 2017, issuer: "Indian Association of Nutrition" }
        ],
        awards: [
            { name: "Excellence in Holistic Nutrition", year: 2020, description: "Recognized for healthy weight gain strategies" }
        ],
        publications: [
            { title: "Nutrition for Healthy Weight Gain", year: 2021, link: "https://example.com/publication29" }
        ],
        testimonials: [
            { text: "Dr. Shah’s guidance helped me gain weight healthily.", author: "Priya M.", rating: 4.9 }
        ],
        languages: ["English", "Tamil", "Hindi"],
        consultationTypes: [
            { type: "online", duration: 45, fee: 1600 },
            { type: "offline", duration: 45, fee: 1600 }
        ],
        availability: {
            workingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            workingHours: { start: "09:00", end: "17:00" }
        },
        socialMedia: {
            linkedin: "https://linkedin.com/in/dr-nandini-shah",
            twitter: "https://twitter.com/drnandinishah"
        }
    },
    {
        title: "Dr. Rajiv Kapoor - Obesity Management Expert",
        description: "Specializes in clinical approaches to obesity management.",
        specialties: ["Obesity Management", "Weight Loss"],
        education: ["MBBS", "MD in Internal Medicine", "Certification in Obesity Medicine"],
        expertise: ["Obesity Management", "Weight Loss"],
        certifications: [
            { name: "Certified Obesity Medicine Specialist", year: 2018, issuer: "Indian Association of Obesity Medicine" }
        ],
        awards: [
            { name: "Best Obesity Management Specialist", year: 2021, description: "Recognized for clinical obesity treatment" }
        ],
        publications: [
            { title: "Clinical Approaches to Obesity", year: 2022, link: "https://example.com/publication30" }
        ],
        testimonials: [
            { text: "Dr. Kapoor’s expertise helped me overcome obesity.", author: "Suresh T.", rating: 4.8 }
        ],
        languages: ["English", "Hindi", "Marathi"],
        consultationTypes: [
            { type: "online", duration: 45, fee: 1900 },
            { type: "offline", duration: 45, fee: 1900 }
        ],
        availability: {
            workingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            workingHours: { start: "09:00", end: "17:00" }
        },
        socialMedia: {
            linkedin: "https://linkedin.com/in/dr-rajiv-kapoor",
            twitter: "https://twitter.com/drrajivkapoor"
        }
    },
    {
        title: "Dr. Priya Sharma - PCOS and Fertility Specialist",
        description: "Specialist in PCOS management and fertility enhancement through nutrition.",
        specialties: ["PCOS", "Pregnancy Nutrition", "Fertility"],
        education: ["MBBS", "MD in Obstetrics & Gynecology", "Certification in Reproductive Nutrition"],
        expertise: ["PCOS", "Pregnancy Nutrition", "Fertility"],
        certifications: [
            { name: "Certified Reproductive Nutritionist", year: 2017, issuer: "Indian Society of Reproductive Health" }
        ],
        awards: [
            { name: "Excellence in Women's Health Nutrition", year: 2020, description: "Recognized for PCOS management techniques" }
        ],
        publications: [
            { title: "Nutrition for PCOS and Fertility", year: 2021, link: "https://example.com/publication31" }
        ],
        testimonials: [
            { text: "Dr. Sharma’s diet plans improved my PCOS symptoms significantly.", author: "Riya S.", rating: 5 }
        ],
        languages: ["English", "Hindi", "Marathi"],
        consultationTypes: [
            { type: "online", duration: 45, fee: 1800 },
            { type: "offline", duration: 45, fee: 1800 }
        ],
        availability: {
            workingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            workingHours: { start: "09:00", end: "17:00" }
        },
        socialMedia: {
            linkedin: "https://linkedin.com/in/dr-priya-sharma",
            twitter: "https://twitter.com/drpriyasharma"
        }
    },
    {
        title: "Anita Desai - Maternal Nutrition Specialist",
        description: "Expert in prenatal and postnatal nutrition with focus on balanced nourishment.",
        specialties: ["Pregnancy Nutrition", "Post-Partum Diet"],
        education: ["MSc in Clinical Nutrition", "Specialized in Maternal Nutrition"],
        expertise: ["Pregnancy Nutrition", "Post-Partum Diet"],
        certifications: [
            { name: "Certified Maternal Nutritionist", year: 2018, issuer: "Indian Dietetic Association" }
        ],
        awards: [
            { name: "Best Nutritionist in Maternal Care", year: 2021, description: "Recognized for prenatal nutrition expertise" }
        ],
        publications: [
            { title: "Nutrition for Pregnancy and Post-Partum", year: 2020, link: "https://example.com/publication32" }
        ],
        testimonials: [
            { text: "Anita’s guidance ensured a healthy pregnancy for me.", author: "Sneha R.", rating: 4.9 }
        ],
        languages: ["English", "Hindi"],
        consultationTypes: [
            { type: "online", duration: 45, fee: 1500 },
            { type: "offline", duration: 45, fee: 1500 }
        ],
        availability: {
            workingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            workingHours: { start: "09:00", end: "17:00" }
        },
        socialMedia: {
            linkedin: "https://linkedin.com/in/anita-desai",
            twitter: "https://twitter.com/anitadesai"
        }
    },
    {
        title: "Dr. Lakshmi Menon - Menopause Nutrition Specialist",
        description: "Specialized in managing menopausal symptoms and hormonal imbalances through diet.",
        specialties: ["Menopause", "Hormonal Balance"],
        education: ["MBBS", "MD in Internal Medicine", "Certification in Women's Health"],
        expertise: ["Menopause", "Hormonal Balance"],
        certifications: [
            { name: "Certified Women's Health Nutritionist", year: 2016, issuer: "Indian Society of Women's Health" }
        ],
        awards: [
            { name: "Excellence in Menopause Nutrition", year: 2022, description: "Recognized for hormonal balance expertise" }
        ],
        publications: [
            { title: "Nutrition for Menopause", year: 2023, link: "https://example.com/publication33" }
        ],
        testimonials: [
            { text: "Dr. Menon’s diet plans eased my menopausal symptoms.", author: "Latha K.", rating: 5 }
        ],
        languages: ["English", "Kannada", "Malayalam"],
        consultationTypes: [
            { type: "online", duration: 45, fee: 2000 },
            { type: "offline", duration: 45, fee: 2000 }
        ],
        availability: {
            workingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            workingHours: { start: "09:00", end: "17:00" }
        },
        socialMedia: {
            linkedin: "https://linkedin.com/in/dr-lakshmi-menon",
            twitter: "https://twitter.com/drlakshmimenon"
        }
    },
    {
        title: "Divya Reddy - PCOS and Fertility Nutritionist",
        description: "Helps women with PCOS manage symptoms and improve fertility through tailored nutrition.",
        specialties: ["PCOS", "Fertility", "Weight Management"],
        education: ["BSc in Nutrition", "Certification in Reproductive Health Nutrition"],
        expertise: ["PCOS", "Fertility", "Weight Management"],
        certifications: [
            { name: "Certified Reproductive Health Nutritionist", year: 2019, issuer: "Indian Dietetic Association" }
        ],
        awards: [
            { name: "Emerging Nutritionist Award", year: 2020, description: "Recognized for PCOS nutrition strategies" }
        ],
        publications: [
            { title: "Nutrition for PCOS Management", year: 2021, link: "https://example.com/publication34" }
        ],
        testimonials: [
            { text: "Divya’s tailored plans helped me manage my PCOS effectively.", author: "Ananya P.", rating: 4.8 }
        ],
        languages: ["English", "Telugu", "Hindi"],
        consultationTypes: [
            { type: "online", duration: 45, fee: 1200 }
        ],
        availability: {
            workingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            workingHours: { start: "09:00", end: "17:00" }
        },
        socialMedia: {
            linkedin: "https://linkedin.com/in/divya-reddy",
            twitter: "https://twitter.com/divyareddy"
        }
    },
    {
        title: "Dr. Maya Iyer - Pregnancy Nutrition Expert",
        description: "Expert in pregnancy nutrition and breastfeeding dietary support.",
        specialties: ["Pregnancy Nutrition", "Breastfeeding Support"],
        education: ["MBBS", "Diploma in Maternal Nutrition", "Lactation Consultant Certification"],
        expertise: ["Pregnancy Nutrition", "Breastfeeding Support"],
        certifications: [
            { name: "Certified Lactation Consultant", year: 2018, issuer: "Indian Lactation Association" }
        ],
        awards: [
            { name: "Excellence in Maternal Nutrition", year: 2021, description: "Recognized for breastfeeding support expertise" }
        ],
        publications: [
            { title: "Nutrition for Pregnancy and Breastfeeding", year: 2022, link: "https://example.com/publication35" }
        ],
        testimonials: [
            { text: "Dr. Iyer’s guidance was invaluable during my pregnancy.", author: "Meera S.", rating: 4.9 }
        ],
        languages: ["English", "Tamil", "Malayalam"],
        consultationTypes: [
            { type: "online", duration: 45, fee: 1600 },
            { type: "offline", duration: 45, fee: 1600 }
        ],
        availability: {
            workingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            workingHours: { start: "09:00", end: "17:00" }
        },
        socialMedia: {
            linkedin: "https://linkedin.com/in/dr-maya-iyer",
            twitter: "https://twitter.com/drmayaiyer"
        }
    },
    {
        title: "Neha Kapoor - Menopause and Bone Health Specialist",
        description: "Focuses on nutrition for menopausal women with emphasis on bone health.",
        specialties: ["Menopause", "Bone Health"],
        education: ["MSc in Nutrition", "PhD in Women's Health Nutrition"],
        expertise: ["Menopause", "Bone Health"],
        certifications: [
            { name: "Certified Bone Health Nutritionist", year: 2017, issuer: "Indian Dietetic Association" }
        ],
        awards: [
            { name: "Best Nutritionist in Women's Health", year: 2021, description: "Recognized for bone health nutrition expertise" }
        ],
        publications: [
            { title: "Nutrition for Menopause and Bone Health", year: 2022, link: "https://example.com/publication36" }
        ],
        testimonials: [
            { text: "Neha’s diet plans improved my bone health during menopause.", author: "Shalini T.", rating: 4.8 }
        ],
        languages: ["English", "Hindi", "Marathi"],
        consultationTypes: [
            { type: "online", duration: 45, fee: 1700 },
            { type: "offline", duration: 45, fee: 1700 }
        ],
        availability: {
            workingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            workingHours: { start: "09:00", end: "17:00" }
        },
        socialMedia: {
            linkedin: "https://linkedin.com/in/neha-kapoor",
            twitter: "https://twitter.com/nehakapoor"
        }
    }
];

function generateSlots(workingHours) {
    const slots = [];
    const today = new Date();
    
    for (let i = 0; i < 30; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        
        // Skip weekends
        if (date.getDay() === 0 || date.getDay() === 6) continue;
        
        const dateStr = date.toISOString().split('T')[0];
        const availableSlots = [];
        
        const startHour = parseInt(workingHours.start.split(':')[0]);
        const endHour = parseInt(workingHours.end.split(':')[0]);
        
        for (let hour = startHour; hour < endHour; hour++) {
            availableSlots.push(`${hour.toString().padStart(2, '0')}:00`);
            availableSlots.push(`${hour.toString().padStart(2, '0')}:30`);
        }
        
        if (availableSlots.length > 0) {
            slots.push({
                date: dateStr,
                slots: availableSlots
            });
        }
    }
    
    return slots;
};

async function fetchImageAsBuffer(url) {
    try {
        const response = await axios.get(url, { responseType: 'arraybuffer', timeout: 5000 });
        return Buffer.from(response.data);
    } catch (err) {
        console.error(`Error fetching image from ${url}:`, err.message);
        const fallbackUrl = 'https://ui-avatars.com/api/?name=Default&size=150&background=0D8ABC&color=fff';
        try {
            const response = await axios.get(fallbackUrl, { responseType: 'arraybuffer', timeout: 5000 });
            return Buffer.from(response.data);
        } catch (fallbackErr) {
            console.error('Error fetching fallback image:', fallbackErr.message);
            throw new Error('Failed to fetch both primary and fallback images');
        }
    }
};


// Seed the database
async function seedDatabase() {
    try {
        await mongoose.connect('mongodb://localhost:27017/NutriConnectDB');

        console.log('Connected to MongoDB');

        // Clear only Dietitian and DietitianInfo collections
        await Dietitian.deleteMany({});
        await DietitianInfo.deleteMany({});
        console.log('Cleared existing data from Dietitian and DietitianInfo collections');

        // Hash passwords and prepare dietitians
        const dietitiansWithHashedPasswords = await Promise.all(dietitians.map(async (dietitian) => {
            const hashedPassword = await bcrypt.hash(dietitian.password, 10);
            const slots = generateSlots({ start: "09:00", end: "17:00" });
            const profileImage = await fetchImageAsBuffer(dietitian.profileImage);
            return { 
                ...dietitian, 
                password: hashedPassword,
                profileImage, 
                slots,
                licenseNumber: dietitian.licenseNumber
            };
        }));

        // Insert dietitians
        const insertedDietitians = await Dietitian.insertMany(dietitiansWithHashedPasswords);
        console.log(`Inserted ${insertedDietitians.length} dietitians`);

        // Prepare and insert dietitian info
        const dietitianInfoWithIds = dietitianInfoData.map(info => {
            const dietitian = insertedDietitians.find(d => info.title.includes(d.name));
            if (!dietitian) {
                console.warn(`No dietitian found for info: ${info.title}`);
                return null;
            }
            return { ...info, dietitianId: dietitian._id };
        }).filter(info => info !== null);

        await DietitianInfo.insertMany(dietitianInfoWithIds);
        console.log(`Inserted ${dietitianInfoWithIds.length} dietitian info records`);

        console.log('Database seeded successfully!');
    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        mongoose.connection.close();
        console.log('MongoDB connection closed');
        process.exit(0);
    }
}

// Run the seed function
seedDatabase();
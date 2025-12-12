document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); 
    
    const usernameInput = document.getElementById('username').value.trim();
    const passwordInput = document.getElementById('password').value.trim();
    const messageElement = document.getElementById('message');
    
    // --- Bagian 1: Data Pengguna dan Akses ---
    const users = {
        // PERHATIAN: Nilai filter_value diubah ke PUI PT SAKTI
        "ecoa": { password: "pass1", filter_value: "PUI PT SAKTI" }, 
        
        // Pengguna lain (jika ada)
        // "datascience": { password: "pass2", filter_value: "Data Science" },
        
        // Admin: Tidak difilter
        "admin": { password: "adminpass", filter_value: "SEMUA_COE" } 
    };
    
    // --- Bagian 2: Pengaturan Looker Studio ---
    const REPORT_ID = '13ab274b-ffe2-41ad-808c-905dbc0c6cfc'; 
    const PAGE_ID = '_p1'; 
    
    // FIELD ID YANG PALING MUNGKIN BENAR BERDASARKAN GAMBAR SUMBER DATA
    const FIELD_ID_TO_FILTER = 'COE'; 

    // --- Bagian 3: Logika Otentikasi & Redirect ---
    const user = users[usernameInput];

    if (user && user.password === passwordInput) {
        messageElement.style.color = 'green';
        messageElement.textContent = "Login Berhasil. Mengalihkan ke Laporan...";
        
        const filterValue = user.filter_value; 
        let paramsObject = {};

        if (filterValue !== "SEMUA_COE") {
            // Pembuatan filter JSON: {"COE":"PUI PT SAKTI"}
            paramsObject[FIELD_ID_TO_FILTER] = filterValue;
        }
        
        const encodedParams = encodeURIComponent(JSON.stringify(paramsObject));
        const lookerStudioURL = `https://lookerstudio.google.com/reporting/${REPORT_ID}/page/${PAGE_ID}?params=${encodedParams}`;

        // REDIRECT!
        window.location.href = lookerStudioURL;

    } else {
        messageElement.style.color = 'red';
        messageElement.textContent = "Nama Pengguna atau Kata Sandi Salah. Silakan coba lagi.";
        document.getElementById('password').value = ''; 
    }
});

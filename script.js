document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); 
    
    const usernameInput = document.getElementById('username').value.trim();
    const passwordInput = document.getElementById('password').value.trim();
    const messageElement = document.getElementById('message');
    
    // --- Bagian 1: Data Pengguna dan Filter (KREDENSIAL) ---
    const users = {
        // PUI PT SAKTI adalah nilai COE yang harus dicari di Looker Studio (Case Sensitive!)
        "ecoa": { password: "pass1", filter_value: "PUI PT SAKTI" }, 
        
        // Admin: Tidak difilter
        "admin": { password: "adminpass", filter_value: "SEMUA_COE" } 
    };
    
    // --- Bagian 2: Pengaturan Looker Studio (KONSTANTA) ---
    const REPORT_ID = '13ab274b-ffe2-41ad-808c-905dbc0c6cfc'; 
    const PAGE_ID = '_p1'; 
    
    // FIELD ID YANG PALING MUNGKIN BENAR BERDASARKAN SUMBER DATA ANDA
    const FIELD_ID_TO_FILTER = 'COE'; 

    // --- Bagian 3: Logika Otentikasi & Redirect ---
    const user = users[usernameInput];

    if (user && user.password === passwordInput) {
        messageElement.style.color = 'green';
        messageElement.textContent = "Login Berhasil. Mengalihkan ke Laporan...";
        
        const filterValue = user.filter_value; 
        let paramsObject = {};

        // 1. Buat Objek Parameter Filter
        if (filterValue !== "SEMUA_COE") {
            // Contoh: {"COE":"PUI PT SAKTI"}
            paramsObject[FIELD_ID_TO_FILTER] = filterValue;
        }

        // 2. Encode Objek JSON menjadi String Parameter
        // URL Looker Studio mengharuskan parameter filter di-encode dua kali.
        const encodedParams = encodeURIComponent(JSON.stringify(paramsObject));
        
        // 3. Gabungkan menjadi URL lengkap
        const lookerStudioURL = `https://lookerstudio.google.com/reporting/${REPORT_ID}/page/${PAGE_ID}?params=${encodedParams}`;

        // 4. Redirect! (Setelah 1.5 detik untuk melihat pesan sukses)
        setTimeout(() => {
            window.location.href = lookerStudioURL;
        }, 1500); // Penundaan 1.5 detik

    } else {
        messageElement.style.color = 'red';
        messageElement.textContent = "Nama Pengguna atau Kata Sandi Salah. Silakan coba lagi.";
        document.getElementById('password').value = ''; 
    }
});

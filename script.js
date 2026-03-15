document.addEventListener('DOMContentLoaded', () => {
    // --- 1. ตัวแปรเริ่มต้น (Variables) ---
    const bgMusic = document.getElementById('bg-music');
    const musicSource = document.getElementById('music-source');
    const musicToggle = document.getElementById('music-toggle');
    const mainContent = document.getElementById('main-content');
    const overlay = document.getElementById('year-overlay');
    const closeBtns = document.querySelectorAll('.back-btn');
    const video = document.getElementById('year-video');
    const videoSource = video.querySelector("source");
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const downloadBtn = document.getElementById('download-btn');
    const closeLightbox = document.querySelector('.close-lightbox');

    let lastScrollPos = 0;
    let wasMusicPlaying = false;

    // API Config
    const CLOUD_CONFIG = {
        imgbb_key: 'ba584c155e9b64c57e201317448d6a38',
        sheet_url: 'https://sheetdb.io/api/v1/rr3drww9jhekg'
    };

    // --- 2. ข้อมูลรูปภาพและวิดีโอ (Data) ---
    const yearData = {
        "2023": {
            video: "Clipmemory/Cilp2023.mp4",
            desc: "ปีแรกที่เพิ่งรู้จักกัน ยังพูดเพราะใส่กันอยู่ คนในกลุ่มยังขาดๆเกินๆอยู่เลย",
            images: [
                "images2023/LINE_ALBUM_23_260313_1.jpg", "images2023/LINE_ALBUM_23_260313_2.jpg",
                "images2023/LINE_ALBUM_23_260313_3.jpg", "images2023/LINE_ALBUM_23_260313_4.jpg",
                "images2023/LINE_ALBUM_23_260313_5.jpg", "images2023/LINE_ALBUM_23_260313_6.jpg",
                "images2023/LINE_ALBUM_23_260313_7.jpg", "images2023/LINE_ALBUM_23_260313_8.jpg",
                "images2023/LINE_ALBUM_23_260313_9.jpg", "images2023/LINE_ALBUM_23_260313_10.jpg",
                "images2023/LINE_ALBUM_23_260313_11.jpg", "images2023/LINE_ALBUM_23_260313_12.jpg",
                "images2023/LINE_ALBUM_23_260313_13.jpg", "images2023/LINE_ALBUM_23_260313_14.jpg",
                "images2023/LINE_ALBUM_23_260313_15.jpg", "images2023/LINE_ALBUM_23_260313_16.jpg",
                "images2023/LINE_ALBUM_23_260313_17.jpg", "images2023/LINE_ALBUM_23_260313_18.jpg",
                "images2023/LINE_ALBUM_23_260313_19.jpg", "images2023/LINE_ALBUM_23_260313_20.jpg",
                "images2023/LINE_ALBUM_23_260313_21.jpg", "images2023/LINE_ALBUM_23_260313_22.jpg",
                "images2023/LINE_ALBUM_23_260313_23.jpg", "images2023/LINE_ALBUM_23_260313_24.jpg",
                "images2023/LINE_ALBUM_23_260313_25.jpg", "images2023/LINE_ALBUM_23_260313_26.jpg",
                "images2023/LINE_ALBUM_23_260313_27.jpg", "images2023/LINE_ALBUM_23_260313_28.jpg",
                "images2023/LINE_ALBUM_23_260313_29.jpg", "images2023/LINE_ALBUM_23_260313_30.jpg",
                "images2023/LINE_ALBUM_23_260313_31.jpg", "images2023/LINE_ALBUM_23_260313_32.jpg",
                "images2023/LINE_ALBUM_23_260313_33.jpg", "images2023/LINE_ALBUM_23_260313_34.jpg",
                "images2023/LINE_ALBUM_23_260313_35.jpg", "images2023/LINE_ALBUM_23_260313_36.jpg"
            ]
        },
        "2024": {
            video: "Clipmemory/Clip2024.mp4",
            desc: "ปีที่2 คนในกลุ่มเริ่มครบแล้ว เป็นช่วงเวลาที่มีทั้งความสนุก เสียงหัวเราะ การร้องไห้ การโกธรและให้อภัยกัน",
            images: [
                "images2024/LINE_ALBUM_24_260313_1.jpg", "images2024/LINE_ALBUM_24_260313_2.jpg",
                "images2024/LINE_ALBUM_24_260313_3.jpg", "images2024/LINE_ALBUM_24_260313_4.jpg",
                "images2024/LINE_ALBUM_24_260313_5.jpg", "images2024/LINE_ALBUM_24_260313_6.jpg",
                "images2024/LINE_ALBUM_24_260313_7.jpg", "images2024/LINE_ALBUM_24_260313_8.jpg",
                "images2024/LINE_ALBUM_24_260313_9.jpg", "images2024/LINE_ALBUM_24_260313_10.jpg",
                "images2024/LINE_ALBUM_24_260313_11.jpg", "images2024/LINE_ALBUM_24_260313_12.jpg",
                "images2024/LINE_ALBUM_24_260313_13.jpg", "images2024/LINE_ALBUM_24_260313_14.jpg",
                "images2024/LINE_ALBUM_24_260313_15.jpg", "images2024/LINE_ALBUM_24_260313_16.jpg",
                "images2024/LINE_ALBUM_24_260313_17.jpg", "images2024/LINE_ALBUM_24_260313_18.jpg",
                "images2024/LINE_ALBUM_24_260313_19.jpg", "images2024/LINE_ALBUM_24_260313_20.jpg",
                "images2024/LINE_ALBUM_24_260313_21.jpg", "images2024/LINE_ALBUM_24_260313_22.jpg",
                "images2024/LINE_ALBUM_24_260313_23.jpg", "images2024/LINE_ALBUM_24_260313_24.jpg",
                "images2024/LINE_ALBUM_24_260313_25.jpg", "images2024/LINE_ALBUM_24_260313_26.jpg",
                "images2024/LINE_ALBUM_24_260313_27.jpg", "images2024/LINE_ALBUM_24_260313_28.jpg"
            ]
        },
        "2025": {
            video: "Clipmemory/Clip2025.mp4",
            desc: "ปีสุดท้ายของการการเดินทาง งานเยอะมากเริ่มจริงจังกับมหาลัยจนไม่มีเวลาให้กัน",
            images: [
                "images2025/LINE_ALBUM_25_260313_1.jpg", "images2025/LINE_ALBUM_25_260313_2.jpg",
                "images2025/LINE_ALBUM_25_260313_3.jpg", "images2025/LINE_ALBUM_25_260313_4.jpg",
                "images2025/LINE_ALBUM_25_260313_5.jpg", "images2025/LINE_ALBUM_25_260313_6.jpg",
                "images2025/LINE_ALBUM_25_260313_7.jpg", "images2025/LINE_ALBUM_25_260313_8.jpg",
                "images2025/LINE_ALBUM_25_260313_9.jpg", "images2025/LINE_ALBUM_25_260313_10.jpg",
                "images2025/LINE_ALBUM_25_260313_11.jpg", "images2025/LINE_ALBUM_25_260313_12.jpg",
                "images2025/LINE_ALBUM_25_260313_13.jpg", "images2025/LINE_ALBUM_25_260313_14.jpg",
                "images2025/LINE_ALBUM_25_260313_15.jpg", "images2025/LINE_ALBUM_25_260313_16.jpg",
                "images2025/LINE_ALBUM_25_260313_17.jpg", "images2025/LINE_ALBUM_25_260313_18.jpg",
                "images2025/LINE_ALBUM_25_260313_19.jpg", "images2025/LINE_ALBUM_25_260313_20.jpg",
                "images2025/LINE_ALBUM_25_260313_21.jpg", "images2025/LINE_ALBUM_25_260313_22.jpg",
                "images2025/LINE_ALBUM_25_260313_23.jpg", "images2025/LINE_ALBUM_25_260313_24.jpg",
                "images2025/LINE_ALBUM_25_260313_25.jpg", "images2025/LINE_ALBUM_25_260313_26.jpg",
                "images2025/LINE_ALBUM_25_260313_27.jpg", "images2025/LINE_ALBUM_25_260313_28.jpg",
                "images2025/LINE_ALBUM_25_260313_29.jpg", "images2025/LINE_ALBUM_25_260313_30.jpg",
                "images2025/LINE_ALBUM_25_260313_31.jpg", "images2025/LINE_ALBUM_25_260313_32.jpg",
                "images2025/LINE_ALBUM_25_260313_33.jpg", "images2025/LINE_ALBUM_25_260313_34.jpg",
                "images2025/LINE_ALBUM_25_260313_35.jpg", "images2025/LINE_ALBUM_25_260313_36.jpg",
                "images2025/LINE_ALBUM_25_260313_37.jpg", "images2025/LINE_ALBUM_25_260313_38.jpg",
                "images2025/LINE_ALBUM_25_260313_39.jpg", "images2025/LINE_ALBUM_25_260313_40.jpg",
                "images2025/LINE_ALBUM_25_260313_41.jpg", "images2025/LINE_ALBUM_25_260313_42.jpg",
                "images2025/LINE_ALBUM_25_260313_43.jpg", "images2025/LINE_ALBUM_25_260313_44.jpg",
                "images2025/LINE_ALBUM_25_260313_45.jpg", "images2025/LINE_ALBUM_25_260313_46.jpg",
                "images2025/LINE_ALBUM_25_260313_47.jpg", "images2025/LINE_ALBUM_25_260313_48.jpg",
                "images2025/LINE_ALBUM_25_260313_49.jpg", "images2025/LINE_ALBUM_25_260313_50.jpg",
                "images2025/LINE_ALBUM_25_260313_51.jpg", "images2025/LINE_ALBUM_25_260313_52.jpg",
                "images2025/LINE_ALBUM_25_260313_53.jpg", "images2025/LINE_ALBUM_25_260313_54.jpg",
                "images2025/LINE_ALBUM_25_260313_55.jpg", "images2025/LINE_ALBUM_25_260313_56.jpg",
                "images2025/LINE_ALBUM_25_260313_57.jpg", "images2025/LINE_ALBUM_25_260313_58.jpg"
            ]
        }
    };

    const playlist = {
        "main": "song_forever.mp3",
        "2023": "song_forever.mp3",
        "2024": "song_forever.mp3",
        "2025": "song_forever.mp3"
    };

    // --- 3. ฟังก์ชันส่วนกลาง (Core Functions) ---

    // ฟังก์ชันเปิด Lightbox
    function openLightbox(url) {
        if (!lightbox || !lightboxImg) return;
        lightboxImg.src = url;
        if (downloadBtn) downloadBtn.href = url;
        lightbox.classList.remove('hidden');
    }

    // ฟังก์ชันเปลี่ยนเพลง
    function changeMusic(pageKey) {
        const newSrc = playlist[pageKey];
        if (musicSource.getAttribute('src') !== newSrc) {
            musicSource.setAttribute('src', newSrc);
            bgMusic.load();
            bgMusic.play().catch(e => console.log("รอการคลิกเพื่อเริ่มเพลง"));
            musicToggle.textContent = "หยุดเพลง";
        }
    }

    // ฟังก์ชันช่วยแสดงรูปใน Album
    function appendPhoto(url, isCloud = false) {
        const photoGrid = document.getElementById('overlay-photos');
        if (!photoGrid) return;

        const img = document.createElement('img');
        img.src = url;
        img.className = 'album-img';
        img.alt = 'Memory';
        img.style.cursor = 'pointer';

        img.addEventListener('click', () => openLightbox(url));

        const plusBtn = document.querySelector('.polaroid-plus-card');
        if (plusBtn) {
            photoGrid.insertBefore(img, plusBtn);
        } else {
            photoGrid.appendChild(img);
        }
    }

    // --- 4. แก้ปัญหา 4 รูปหน้าแรก (ทัศนศึกษา) ---
    // สั่งให้รูปในคลาส .polaroid ทั้งหมดสามารถคลิกดู Lightbox ได้
    document.querySelectorAll('.polaroid img').forEach(img => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', () => {
            openLightbox(img.src);
        });
    });

    // --- 5. ระบบจัดการเพลงและวิดีโอ ---
    musicToggle.addEventListener('click', () => {
        if (bgMusic.paused) {
            bgMusic.play();
            musicToggle.textContent = "หยุดเพลง";
        } else {
            bgMusic.pause();
            musicToggle.textContent = "เล่นเพลง";
        }
    });

    const resumeMusic = () => {
        if (wasMusicPlaying) {
            bgMusic.play();
            musicToggle.textContent = "หยุดเพลง";
        }
    };

    video.addEventListener('play', () => {
        if (!bgMusic.paused) {
            wasMusicPlaying = true;
            bgMusic.pause();
            musicToggle.textContent = "เล่นเพลง";
        } else {
            wasMusicPlaying = false;
        }
    });

    video.addEventListener('pause', resumeMusic);
    video.addEventListener('ended', resumeMusic);

    // --- 6. ระบบ Overlay และ Cloud ---
    function renderUploadButton() {
        const photoGrid = document.getElementById('overlay-photos');
        if (!photoGrid || document.querySelector('.polaroid-plus-card')) return;

        const btn = document.createElement('div');
        btn.className = 'polaroid-plus-card';
        btn.innerHTML = `<div class="plus-icon-style">+</div><div class="plus-text-style">เพิ่มรูป</div>`;
        btn.onclick = () => document.getElementById('cloud-upload-input').click();
        photoGrid.appendChild(btn);
    }

    async function fetchCloudPhotos(year) {
        try {
            const response = await fetch(CLOUD_CONFIG.sheet_url);
            const data = await response.json();
            data.filter(item => item.year === year).forEach(item => {
                appendPhoto(item.url, true);
            });
        } catch (err) { console.error("Cloud Load Error:", err); }
    }

    document.querySelectorAll('.year-card').forEach(card => {
        card.addEventListener('click', () => {
            lastScrollPos = window.scrollY;
            const year = card.dataset.year;
            const data = yearData[year];

            videoSource.src = data.video;
            video.load();

            document.getElementById('overlay-year-title').innerText = year;
            document.getElementById('overlay-description').innerText = data.desc;

            const photoGrid = document.getElementById('overlay-photos');
            photoGrid.innerHTML = '';

            data.images.forEach(imgSrc => appendPhoto(imgSrc));
            renderUploadButton();
            fetchCloudPhotos(year);

            mainContent.classList.add('hidden');
            overlay.classList.remove('hidden');
            overlay.scrollTo(0, 0);
            window.scrollTo(0, 0);
            changeMusic(year);
        });
    });

    closeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            overlay.classList.add('hidden');
            mainContent.classList.remove('hidden');
            window.scrollTo(0, lastScrollPos);
            video.pause();
            changeMusic("main");
            resumeMusic();
        });
    });

    // --- 7. ระบบอัปโหลด ---
    const uploadInput = document.getElementById('cloud-upload-input');
    if (uploadInput) {
        uploadInput.onchange = async (e) => {
            const file = e.target.files[0];
            if (!file) return;

            const currentYear = document.getElementById('overlay-year-title').innerText;
            alert("กำลังบันทึกความทรงจำลงระบบ...");

            const formData = new FormData();
            formData.append('image', file);

            try {
                const res = await fetch(`https://api.imgbb.com/1/upload?key=${CLOUD_CONFIG.imgbb_key}`, {
                    method: 'POST',
                    body: formData
                });
                const resData = await res.json();
                const finalUrl = resData.data.url;

                await fetch(CLOUD_CONFIG.sheet_url, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ "url": finalUrl, "year": currentYear })
                });

                appendPhoto(finalUrl, true);
                alert("บันทึกสำเร็จและอยู่ถาวรแล้ว!");
            } catch (err) {
                alert("เกิดข้อผิดพลาด ลองใหม่อีกครั้งนะ");
            }
        };
    }

    // --- 8. ปิด Lightbox ---
    if (closeLightbox) {
        closeLightbox.addEventListener('click', () => {
            lightbox.classList.add('hidden');
        });
    }

    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.classList.add('hidden');
            }
        });
    }

    // --- 9. เอฟเฟกต์อื่นๆ (Typewriter / Fade-in / Rotate) ---
    const noteText = "หลายปีที่ผ่านมานี้ ไม่ใช่แค่เรื่องของการเรียน แต่คือเรื่องของมิตรภาพที่พวกเราสร้างขึ้นมาด้วยกัน ความทรงจำเหล่านี้จะเป็นของเราตลอดไป";
    let hasTyped = false;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                if (entry.target.classList.contains('note-section') && !hasTyped) {
                    hasTyped = true;
                    typeWriter();
                }
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

    function typeWriter() {
        const el = document.getElementById('handwritten-note');
        if (!el) return;
        let i = 0;
        function typing() {
            if (i < noteText.length) {
                el.innerHTML += noteText.charAt(i);
                i++;
                setTimeout(typing, 40 + Math.random() * 40);
            }
        }
        typing();
    }

    document.querySelectorAll('.polaroid').forEach((p, index) => {
        const rot = index % 2 === 0 ? (Math.random() * -3 - 1) : (Math.random() * 3 + 1);
        p.style.setProperty('--rot', `${rot}deg`);
    });

    const secretBtn = document.getElementById('secret-btn');
    if (secretBtn) {
        secretBtn.addEventListener('click', function () {
            this.style.display = 'none';
            document.getElementById('secret-message').classList.remove('hidden');
        });
    }
});
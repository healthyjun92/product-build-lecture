document.addEventListener('DOMContentLoaded', () => {
    const cuisineButtons = document.querySelectorAll('.cuisine-btn');
    const menuRecommendation = document.getElementById('menuRecommendation');
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const body = document.body;

    // Theme Toggle Logic
    const currentTheme = localStorage.getItem('theme') || 'light';
    body.setAttribute('data-theme', currentTheme);

    themeToggleBtn.addEventListener('click', () => {
        const newTheme = body.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });

    const menus = {
        korean: [
            "불고기", "비빔밥", "김치찌개", "된장찌개", "삼겹살",
            "닭갈비", "제육볶음", "순두부찌개", "갈비찜", "감자탕"
        ],
        chinese: [
            "짜장면", "짬뽕", "탕수육", "마파두부", "볶음밥",
            "깐풍기", "유린기", "고추잡채", "양장피", "궁보계정"
        ],
        japanese: [
            "초밥", "라멘", "돈까스", "우동", "규동",
            "타코야끼", "오코노미야끼", "사시미", "야키토리", "가츠동"
        ],
        western: [
            "스테이크", "파스타", "피자", "햄버거", "샐러드",
            "리조또", "뇨끼", "오믈렛", "수프", "샌드위치"
        ],
        other: [
            "쌀국수 (베트남)", "팟타이 (태국)", "카레 (인도)", "타코 (멕시코)", "케밥 (터키)",
            "똠얌꿍 (태국)", "피시 앤 칩스 (영국)", "에스까르고 (프랑스)", "피쉬볼 (홍콩)", "빠에야 (스페인)"
        ]
    };

    cuisineButtons.forEach(button => {
        button.addEventListener('click', () => {
            const cuisineType = button.dataset.cuisine;
            recommendMenu(cuisineType);
        });
    });

    function recommendMenu(cuisineType) {
        const selectedMenus = menus[cuisineType];
        if (selectedMenus && selectedMenus.length > 0) {
            const randomIndex = Math.floor(Math.random() * selectedMenus.length);
            menuRecommendation.textContent = selectedMenus[randomIndex];
        } else {
            menuRecommendation.textContent = "메뉴를 찾을 수 없습니다.";
        }
    }
});

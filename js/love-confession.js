document.addEventListener('DOMContentLoaded', function() {
    // 获取DOM元素
    let yesButton = document.getElementById("yes");
    let noButton = document.getElementById("no");
    let questionText = document.getElementById("question");
    let mainImage = document.getElementById("mainImage");
    let container = document.querySelector('.love-confession-container');

    let clickCount = 0;  // 记录点击No的次数

    // No按钮的文字变化数组
    const noTexts = [
        "？你认真的吗…", 
        "要不再想想？", 
        "不许选这个！", 
        "我会很伤心…", 
        "不行:(",
        "真的不行😭",
        "求你了...",
        "我要哭了..."
    ];

    // No按钮点击事件
    noButton.addEventListener("click", function() {
        clickCount++;

        // 让Yes按钮变大
        let yesSize = 1 + (clickCount * 0.3);
        yesButton.style.transform = `scale(${yesSize})`;

        // 让No按钮移动（随机方向）
        let maxOffset = Math.min(clickCount * 30, 150);
        let xOffset = (Math.random() - 0.5) * maxOffset * 2;
        let yOffset = (Math.random() - 0.5) * maxOffset;
        noButton.style.transform = `translate(${xOffset}px, ${yOffset}px)`;

        // 让图片和文字轻微上移
        let moveUp = Math.min(clickCount * 15, 100);
        mainImage.style.transform = `translateY(-${moveUp}px)`;
        questionText.style.transform = `translateY(-${moveUp}px)`;

        // No文案变化
        if (clickCount <= noTexts.length) {
            noButton.innerText = noTexts[clickCount - 1];
        } else {
            noButton.innerText = noTexts[noTexts.length - 1];
        }

        // 图片变化
        switch(clickCount) {
            case 1:
                mainImage.src = "/images/love-confession/shocked.png";
                break;
            case 2:
                mainImage.src = "/images/love-confession/think.png";
                break;
            case 3:
                mainImage.src = "/images/love-confession/angry.png";
                break;
            case 4:
            case 5:
                mainImage.src = "/images/love-confession/crying.png";
                break;
            default:
                mainImage.src = "/images/love-confession/crying.png";
                // 添加抖动效果
                mainImage.style.animation = 'shake 0.5s ease-in-out';
                setTimeout(() => {
                    mainImage.style.animation = '';
                }, 500);
        }

        // 如果点击超过10次，强制跳转到成功页面
        if (clickCount >= 10) {
            showSuccessPage();
        }
    });

    // Yes按钮点击事件
    yesButton.addEventListener("click", function() {
        // 添加点击反馈
        yesButton.style.transform = 'scale(0.95)';
        setTimeout(() => {
            showSuccessPage();
        }, 150);
    });

    // 显示成功页面的函数
    function showSuccessPage() {
        // 创建庆祝效果
        createCelebration();
        
        // 显示成功页面
        setTimeout(() => {
            container.innerHTML = `
                <div class="yes-screen">
                    <h1 class="yes-text">!!!喜欢你!! ( >᎑<)♡︎ᐝ</h1>
                    <img src="/images/love-confession/hug.png" alt="拥抱" class="yes-image">
                    <p style="margin-top: 25px; color: #68495b; font-size: 18px; font-weight: bold;">
                        谢谢你的肯定！💕 我们会一直幸福的！
                    </p>
                    <button onclick="location.reload()" style="
                        margin-top: 30px; 
                        padding: 12px 30px; 
                        background: linear-gradient(135deg, #d4818e, #c76978); 
                        color: white; 
                        border: none; 
                        border-radius: 25px; 
                        cursor: pointer; 
                        font-size: 16px;
                        font-weight: bold;
                    ">再玩一次</button>
                </div>
            `;
            
            // 禁用滚动
            document.body.style.overflow = "hidden";
        }, 1000);
    }

    // 创建庆祝效果（爱心飘落）
    function createCelebration() {
        const colors = ['#ff6b6b', '#ff8e8e', '#ffaaaa', '#ffc8c8', '#ff6b9d', '#ff8ebb'];
        
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.innerHTML = '❤';
                heart.style.position = 'fixed';
                heart.style.left = Math.random() * 100 + 'vw';
                heart.style.top = '-50px';
                heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
                heart.style.color = colors[Math.floor(Math.random() * colors.length)];
                heart.style.zIndex = '999';
                heart.style.pointerEvents = 'none';
                heart.style.animation = `fall ${Math.random() * 3 + 2}s linear forwards`;
                
                document.body.appendChild(heart);
                
                // 移除爱心元素
                setTimeout(() => {
                    if (heart.parentNode) {
                        heart.parentNode.removeChild(heart);
                    }
                }, 5000);
            }, i * 100);
        }
        
        // 添加fall动画
        if (!document.querySelector('#celebration-styles')) {
            const style = document.createElement('style');
            style.id = 'celebration-styles';
            style.textContent = `
                @keyframes fall {
                    to {
                        transform: translateY(100vh) rotate(360deg);
                        opacity: 0;
                    }
                }
                @keyframes shake {
                    0%, 100% { transform: translateX(0) translateY(-${Math.min(clickCount * 15, 100)}px); }
                    25% { transform: translateX(-5px) translateY(-${Math.min(clickCount * 15, 100)}px); }
                    75% { transform: translateX(5px) translateY(-${Math.min(clickCount * 15, 100)}px); }
                }
            `;
            document.head.appendChild(style);
        }
    }

    // 添加键盘事件支持
    document.addEventListener('keydown', function(event) {
        if (event.key === 'y' || event.key === 'Y' || event.key === 'Enter') {
            // Y键或回车键触发Yes
            event.preventDefault();
            yesButton.click();
        } else if (event.key === 'n' || event.key === 'N' || event.key === 'Escape') {
            // N键或ESC键触发No
            event.preventDefault();
            noButton.click();
        }
    });

    console.log('💕 表白页面加载完成！可以使用Y/N键或点击按钮进行操作。');
});
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
        "不行:("
    ];

    // No按钮点击事件
    noButton.addEventListener("click", function() {
        clickCount++;

        // 让Yes按钮变大
        let yesSize = 1 + (clickCount * 1.2);
        yesButton.style.transform = `scale(${yesSize})`;

        // 让No按钮向右移动
        let noOffset = clickCount * 50;
        noButton.style.transform = `translateX(${noOffset}px)`;

        // 让图片和文字往上移动
        let moveUp = clickCount * 25;
        mainImage.style.transform = `translateY(-${moveUp}px)`;
        questionText.style.transform = `translateY(-${moveUp}px)`;

        // No文案变化（前5次变化）
        if (clickCount <= 5) {
            noButton.innerText = noTexts[clickCount - 1];
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
        }

        // 如果点击超过8次，强制跳转到成功页面
        if (clickCount >= 8) {
            showSuccessPage();
        }
    });

    // Yes按钮点击事件
    yesButton.addEventListener("click", function() {
        showSuccessPage();
    });

    // 显示成功页面的函数
    function showSuccessPage() {
        container.innerHTML = `
            <div class="yes-screen">
                <h1 class="yes-text">!!!喜欢你!! ( >᎑<)♡︎ᐝ</h1>
                <img src="/images/love-confession/hug.png" alt="拥抱" class="yes-image">
                <p style="margin-top: 20px; color: #68495b; font-size: 18px;">谢谢你的肯定！💕</p>
            </div>
        `;
        
        // 禁用滚动
        document.body.style.overflow = "hidden";
        
        // 添加点击事件，让用户可以返回
        setTimeout(() => {
            document.querySelector('.yes-screen').addEventListener('click', function() {
                window.location.reload();
            });
        }, 1000);
    }

    // 添加键盘事件支持
    document.addEventListener('keydown', function(event) {
        if (event.key === 'y' || event.key === 'Y' || event.key === 'Enter') {
            // Y键或回车键触发Yes
            showSuccessPage();
        } else if (event.key === 'n' || event.key === 'N' || event.key === 'Escape') {
            // N键或ESC键触发No
            noButton.click();
        }
    });

    console.log('表白页面加载完成！可以使用Y/N键或点击按钮进行操作。');
});
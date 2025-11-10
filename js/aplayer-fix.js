// source/js/aplayer-fix.js
// APlayer点击事件修复

document.addEventListener('DOMContentLoaded', function() {
    // 延迟执行以确保APlayer已初始化
    setTimeout(function() {
        const aplayers = document.querySelectorAll('.aplayer');
        
        aplayers.forEach(function(player) {
            // 确保播放器本身不拦截点击
            player.style.pointerEvents = 'none';
            
            // 但播放器内部元素可以点击
            const body = player.querySelector('.aplayer-body');
            if (body) body.style.pointerEvents = 'auto';
            
            const miniswitcher = player.querySelector('.aplayer-miniswitcher');
            if (miniswitcher) miniswitcher.style.pointerEvents = 'auto';
            
            const list = player.querySelector('.aplayer-list');
            if (list) list.style.pointerEvents = 'auto';
        });
        
        console.log('APlayer点击修复已应用');
    }, 1500);
});

// 防止APlayer阻止页面滚动（移动端）
document.addEventListener('touchstart', function(e) {
    if (e.target.closest('.aplayer') && 
        !e.target.closest('.aplayer-list') &&
        !e.target.closest('.aplayer-pic')) {
        e.stopPropagation();
    }
}, { passive: true });
let depth = 5;

function setup() {
    createCanvas(800, 800);
    colorMode(HSB, 360, 100, 100, 100);
    // 监听滑块变化
    const depthSlider = document.getElementById('depth');
    const depthValue = document.getElementById('depthValue');
    depthSlider.addEventListener('input', function() {
        depth = parseInt(this.value);
        depthValue.textContent = depth;
    });
}

function draw() {
    background(240);
    // 将原点移到画布中心
    translate(width/2, height/2);
    // 绘制三角形
    drawSierpinski(0, -200, 400, depth);
}

function drawSierpinski(x, y, size, level) {
    if (level === 0) {
        // 绘制一个等边三角形
        const h = size * sqrt(3) / 2;
        
        // 使用多个时间变量创造更丰富的动态效果
        let timeOffset = frameCount * 0.03;
        let timeOffset2 = frameCount * 0.015;
        
        // 根据位置和多个时间变量计算色相值
        let baseHue = (x + y + 400) % 360;
        let hue = (baseHue + sin(timeOffset) * 120 + cos(timeOffset2) * 60) % 360;
        
        // 使用多个周期函数计算饱和度
        let saturation = map(size, 0, 400, 100, 50);
        saturation += sin(x * 0.02 + timeOffset) * 25;
        saturation += cos(y * 0.02 + timeOffset2) * 15;
        saturation = constrain(saturation, 40, 100);
        
        // 使用复合函数计算亮度
        let brightness = map(y, -200, 200, 100, 60);
        brightness += sin(x * 0.015 + timeOffset) * 20;
        brightness += cos(timeOffset2 * 2) * 15;
        brightness = constrain(brightness, 50, 100);
        
        // 添加更动态的透明度效果
        let alpha = map(size, 0, 400, 95, 65);
        alpha += sin(timeOffset * 3) * 15;
        alpha += cos(x * 0.01 + y * 0.01) * 10;
        alpha = constrain(alpha, 55, 95);
        
        // 使用混合模式创造更炫丽的效果
        blendMode(HARD_LIGHT);
        fill(hue, saturation, brightness, alpha);
        noStroke();
        triangle(
            x, y,
            x - size/2, y + h,
            x + size/2, y + h
        );
        blendMode(BLEND);
    } else {
        // 递归绘制三个小三角形
        const newSize = size / 2;
        const h = newSize * sqrt(3) / 2;
        
        // 顶部三角形
        drawSierpinski(x, y, newSize, level - 1);
        // 左下三角形
        drawSierpinski(x - newSize/2, y + h, newSize, level - 1);
        // 右下三角形
        drawSierpinski(x + newSize/2, y + h, newSize, level - 1);
    }
}
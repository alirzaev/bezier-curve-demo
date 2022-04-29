function recursiveBezier(t, ...points) {
    const len = points.length;

    if (len === 1) {
        return points[0];
    }

    const derivedPoints = [];
    for (let i = 0; i < len - 1; ++i) {
        const [p0_x, p0_y] = points[i];
        const [p1_x, p1_y] = points[i + 1];

        const x = p0_x + t * (p1_x - p0_x);
        const y = p0_y + t * (p1_y - p0_y);

        derivedPoints.push([x, y])
    }

    return recursiveBezier(t, ...derivedPoints);
}

export function drawBezierCurve(ctx, basePoints, size) {
    const points = [];

    for (let i = 0; i <= size; ++i) {
        const t = i / size;

        const b = recursiveBezier(t, ...basePoints);
        points.push(b);
    }

    ctx.beginPath();
    ctx.moveTo(points[0][0], points[0][1]);

    for (const [x, y] of points.slice(1)) {
        ctx.lineTo(x, y);
    }

    ctx.stroke();
    ctx.closePath();
}
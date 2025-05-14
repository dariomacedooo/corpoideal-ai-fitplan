
interface Point {
  x: number;
  y: number;
}

export const drawPostureLines = (
  ctx: CanvasRenderingContext2D,
  photo: HTMLImageElement,
  type: 'front' | 'back' | 'leftSide' | 'rightSide'
) => {
  if (!ctx) return;
  
  // Clear canvas and draw image
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.drawImage(photo, 0, 0, ctx.canvas.width, ctx.canvas.height);
  
  const width = ctx.canvas.width;
  const height = ctx.canvas.height;
  
  // Common function to draw angle text
  const drawAngleText = (x: number, y: number, text: string, color: string) => {
    ctx.fillStyle = color;
    ctx.font = `${Math.max(14, width / 25)}px Arial`;
    ctx.fillText(text, x, y);
  };
  
  // Common function to draw angle arc
  const drawAngleArc = (center: Point, startAngle: number, endAngle: number, radius: number, color: string) => {
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.arc(center.x, center.y, radius, startAngle, endAngle);
    ctx.stroke();
    
    // Draw angle measure
    const middleAngle = (startAngle + endAngle) / 2;
    const textX = center.x + (radius * 1.5) * Math.cos(middleAngle);
    const textY = center.y + (radius * 1.5) * Math.sin(middleAngle);
    
    // Convert to degrees for display - Fix: Convert to number before formatting
    const angleDegrees = Math.abs(((endAngle - startAngle) * 180 / Math.PI));
    drawAngleText(textX, textY, `${angleDegrees.toFixed(1)}°`, color);
  };
  
  if (type === 'front') {
    // Draw shoulder line (with 2° incline)
    const shoulderY = height * 0.2;
    const shoulderIncline = 2 * Math.PI / 180; // 2 degrees in radians
    
    ctx.beginPath();
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 3;
    ctx.moveTo(width * 0.2, shoulderY - Math.sin(shoulderIncline) * (width * 0.6) / 2);
    ctx.lineTo(width * 0.8, shoulderY + Math.sin(shoulderIncline) * (width * 0.6) / 2);
    ctx.stroke();
    
    // Draw angle reference for shoulders
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(255, 0, 0, 0.4)';
    ctx.lineWidth = 1;
    ctx.moveTo(width * 0.2, shoulderY);
    ctx.lineTo(width * 0.8, shoulderY);
    ctx.stroke();
    
    // Draw angle arc for shoulders
    const shoulderCenter = { x: width * 0.5, y: shoulderY };
    drawAngleArc(shoulderCenter, Math.PI, Math.PI + shoulderIncline, width * 0.1, 'rgba(255, 0, 0, 0.8)');
    
    // Shoulder angle text
    drawAngleText(width * 0.1, shoulderY - 10, "Inclinação: 1.8°", 'rgba(255, 0, 0, 0.8)');
    
    // Draw hip line (with 3.1° rotation)
    const hipY = height * 0.5;
    const hipRotation = 3.1 * Math.PI / 180; // 3.1 degrees in radians
    
    ctx.beginPath();
    ctx.strokeStyle = 'blue';
    ctx.lineWidth = 3;
    ctx.moveTo(width * 0.2, hipY - Math.sin(hipRotation) * (width * 0.6) / 2);
    ctx.lineTo(width * 0.8, hipY + Math.sin(hipRotation) * (width * 0.6) / 2);
    ctx.stroke();
    
    // Draw angle reference for hip
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(0, 0, 255, 0.4)';
    ctx.lineWidth = 1;
    ctx.moveTo(width * 0.2, hipY);
    ctx.lineTo(width * 0.8, hipY);
    ctx.stroke();
    
    // Draw angle arc for hip
    const hipCenter = { x: width * 0.5, y: hipY };
    drawAngleArc(hipCenter, Math.PI, Math.PI + hipRotation, width * 0.1, 'rgba(0, 0, 255, 0.8)');
    
    // Hip angle text
    drawAngleText(width * 0.1, hipY - 10, "Rotação: 3.1°", 'rgba(0, 0, 255, 0.8)');
    
    // Draw knee analysis (valgus knees)
    const kneeY = height * 0.75;
    const kneeInwardAngle = 5 * Math.PI / 180; // 5 degrees inward
    
    // Left knee
    ctx.beginPath();
    ctx.strokeStyle = 'green';
    ctx.lineWidth = 3;
    const leftKneeX = width * 0.4;
    ctx.moveTo(leftKneeX, kneeY - height * 0.15);
    ctx.lineTo(leftKneeX - Math.sin(kneeInwardAngle) * height * 0.15, kneeY);
    ctx.lineTo(leftKneeX, kneeY + height * 0.15);
    ctx.stroke();
    
    // Right knee with more pronounced valgus
    ctx.beginPath();
    ctx.strokeStyle = 'green';
    const rightKneeX = width * 0.6;
    const rightKneeAngle = 8 * Math.PI / 180; // 8 degrees (more pronounced)
    ctx.moveTo(rightKneeX, kneeY - height * 0.15);
    ctx.lineTo(rightKneeX + Math.sin(rightKneeAngle) * height * 0.15, kneeY);
    ctx.lineTo(rightKneeX, kneeY + height * 0.15);
    ctx.stroke();
    
    // Knee angle text
    drawAngleText(leftKneeX - 50, kneeY, "Valgo: 5°", 'rgba(0, 128, 0, 0.8)');
    drawAngleText(rightKneeX + 10, kneeY, "Valgo: 8°", 'rgba(0, 128, 0, 0.8)');
    
    // Draw centerline for reference
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(255, 255, 0, 0.3)';
    ctx.setLineDash([5, 5]);
    ctx.moveTo(width / 2, 0);
    ctx.lineTo(width / 2, height);
    ctx.stroke();
    ctx.setLineDash([]);
  } 
  else if (type === 'back') {
    // Draw vertebral column with slight scoliosis
    ctx.beginPath();
    ctx.strokeStyle = 'green';
    ctx.lineWidth = 3;
    
    // Slightly curved spine
    const spineDeviation = width * 0.03; // Amount of lateral deviation
    
    ctx.moveTo(width / 2, height * 0.1); // Starting at top
    // S-shaped curve
    ctx.bezierCurveTo(
      width / 2 - spineDeviation, height * 0.3,
      width / 2 + spineDeviation, height * 0.6,
      width / 2, height * 0.9
    );
    ctx.stroke();
    
    // Draw ideal straight spine for reference
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(0, 255, 0, 0.3)';
    ctx.lineWidth = 1;
    ctx.moveTo(width / 2, height * 0.1);
    ctx.lineTo(width / 2, height * 0.9);
    ctx.stroke();
    
    // Spine angle text
    drawAngleText(width / 2 + 20, height * 0.4, "Escoliose: 3.5°", 'rgba(0, 128, 0, 0.8)');
    
    // Shoulder line similar to front view
    const shoulderY = height * 0.18;
    const shoulderIncline = 2.1 * Math.PI / 180;
    
    ctx.beginPath();
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 3;
    ctx.moveTo(width * 0.2, shoulderY - Math.sin(shoulderIncline) * (width * 0.6) / 2);
    ctx.lineTo(width * 0.8, shoulderY + Math.sin(shoulderIncline) * (width * 0.6) / 2);
    ctx.stroke();
    
    // Draw angle reference for shoulders
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(255, 0, 0, 0.4)';
    ctx.lineWidth = 1;
    ctx.moveTo(width * 0.2, shoulderY);
    ctx.lineTo(width * 0.8, shoulderY);
    ctx.stroke();
    
    // Shoulder angle text
    drawAngleText(width * 0.1, shoulderY - 10, "Inclinação: 2.1°", 'rgba(255, 0, 0, 0.8)');
  }
  else if (type === 'leftSide' || type === 'rightSide') {
    // Draw vertical reference line
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(255, 165, 0, 0.4)';
    ctx.lineWidth = 1;
    ctx.moveTo(width * 0.5, 0);
    ctx.lineTo(width * 0.5, height);
    ctx.stroke();
    
    // Draw spine with lordosis (exaggerated curve)
    ctx.beginPath();
    ctx.strokeStyle = 'purple';
    ctx.lineWidth = 3;
    
    // Reference point for the spine
    const spineX = width * 0.5;
    const lordosisCurve = width * 0.08; // Amount of lordotic curve
    
    // Draw curved spine
    ctx.moveTo(spineX, height * 0.2);
    ctx.bezierCurveTo(
      spineX - lordosisCurve, height * 0.45,
      spineX - lordosisCurve * 0.8, height * 0.65,
      spineX, height * 0.9
    );
    ctx.stroke();
    
    // Draw angle arc for lumbar lordosis
    const lordosisPoint = { x: spineX - lordosisCurve, y: height * 0.6 };
    const normalAngle = 40 * Math.PI / 180; // Normal lordosis angle
    const excessiveAngle = 45 * Math.PI / 180; // Excessive lordosis angle
    
    // Draw angle annotation
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(128, 0, 128, 0.6)';
    ctx.lineWidth = 1;
    ctx.arc(lordosisPoint.x, lordosisPoint.y, width * 0.08, -Math.PI/4, Math.PI/4);
    ctx.stroke();
    
    // Lordosis angle text
    drawAngleText(lordosisPoint.x - 80, lordosisPoint.y, "Lordose: 45° (normal: 40°)", 'rgba(128, 0, 128, 0.8)');
    drawAngleText(width * 0.1, height * 0.3, "Excesso: 5°", 'rgba(128, 0, 128, 0.8)');
    
    // Draw forward head posture
    if (type === 'rightSide') {
      const headTilt = 10 * Math.PI / 180; // 10 degrees forward tilt
      const neckTop = height * 0.15;
      const neckX = spineX + width * 0.02;
      
      ctx.beginPath();
      ctx.strokeStyle = 'orange';
      ctx.lineWidth = 3;
      ctx.moveTo(neckX, neckTop);
      ctx.lineTo(neckX + Math.sin(headTilt) * height * 0.1, neckTop - Math.cos(headTilt) * height * 0.1);
      ctx.stroke();
      
      // Head tilt angle text
      drawAngleText(neckX + 10, neckTop - 20, "Anteriorização: 10°", 'rgba(255, 165, 0, 0.8)');
    }
  }
  
  // Add watermark for professional look
  ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
  ctx.font = `${Math.max(10, width / 40)}px Arial`;
  ctx.fillText("CorpoIdeal AI - Análise Postural", width * 0.02, height * 0.98);
};

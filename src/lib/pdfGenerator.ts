import jsPDF from 'jspdf';
import type { Report } from './reportSchema';

export const generateReportPDF = (report: Report, reportId: string) => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  let yPos = 20;
  const margin = 15;
  const lineHeight = 7;
  const sectionSpacing = 10;

  // Helper function to add new page if needed
  const checkPageBreak = (requiredSpace: number) => {
    if (yPos + requiredSpace > pageHeight - margin) {
      doc.addPage();
      yPos = margin;
    }
  };

  // Helper function to add colored text
  const addColoredText = (text: string, x: number, y: number, color: [number, number, number], fontSize: number = 12) => {
    doc.setFontSize(fontSize);
    doc.setTextColor(color[0], color[1], color[2]);
    doc.text(text, x, y);
  };

  // Helper function to add section header
  const addSectionHeader = (text: string, color: [number, number, number] = [14, 165, 233]) => {
    checkPageBreak(15);
    yPos += 5;
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(color[0], color[1], color[2]);
    doc.text(text, margin, yPos);
    yPos += lineHeight;
    doc.setDrawColor(color[0], color[1], color[2]);
    doc.setLineWidth(0.5);
    doc.line(margin, yPos, pageWidth - margin, yPos);
    yPos += sectionSpacing;
  };

  // Title
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(14, 165, 233);
  doc.text('KILLARITY ENGINE', pageWidth / 2, yPos, { align: 'center' });
  yPos += lineHeight;
  
  doc.setFontSize(14);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(148, 163, 184);
  doc.text('Idea Validation Report', pageWidth / 2, yPos, { align: 'center' });
  yPos += lineHeight * 2;

  // Report Info
  doc.setFontSize(10);
  doc.setTextColor(100, 116, 139);
  doc.text(`Report #${reportId}`, margin, yPos);
  doc.text(`Generated: ${new Date(report.meta.created_at).toLocaleDateString()}`, pageWidth - margin, yPos, { align: 'right' });
  yPos += lineHeight * 2;

  // Idea
  addSectionHeader('Idea', [14, 165, 233]);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  doc.text(report.meta.idea, margin, yPos);
  yPos += lineHeight * 1.5;

  // Verdict
  addSectionHeader('Verdict', 
    report.verdict?.label === "GO HARD" ? [52, 211, 153] :
    report.verdict?.label === "PIVOT" ? [251, 191, 36] : [239, 68, 68]
  );
  
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  const verdictColor = report.verdict?.label === "GO HARD" ? [52, 211, 153] :
    report.verdict?.label === "PIVOT" ? [251, 191, 36] : [239, 68, 68];
  doc.setTextColor(verdictColor[0], verdictColor[1], verdictColor[2]);
  doc.text(report.verdict?.label || "GO", margin, yPos);
  yPos += lineHeight;

  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  doc.text(report.verdict?.headline || "", margin, yPos);
  yPos += lineHeight;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(203, 213, 225);
  const reasonLines = doc.splitTextToSize(report.verdict?.reason || "", pageWidth - 2 * margin);
  doc.text(reasonLines, margin, yPos);
  yPos += reasonLines.length * lineHeight + sectionSpacing;

  // Scores
  addSectionHeader('Scores', [14, 165, 233]);
  const scores = [
    { label: 'Demand', value: report.scores.demand, color: [52, 211, 153] },
    { label: 'Competition', value: report.scores.competition, color: [251, 191, 36] },
    { label: 'Monetization', value: report.scores.monetization, color: [14, 165, 233] },
    { label: 'Founder Fit', value: report.scores.founder_fit, color: [168, 85, 247] },
  ];

  scores.forEach((score) => {
    checkPageBreak(10);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(203, 213, 225);
    doc.text(score.label + ':', margin, yPos);
    
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(score.color[0], score.color[1], score.color[2]);
    doc.text(`${score.value}%`, pageWidth - margin - 10, yPos, { align: 'right' });
    
    // Progress bar
    const barWidth = pageWidth - 2 * margin - 20;
    const barHeight = 3;
    doc.setDrawColor(30, 41, 59);
    doc.setFillColor(30, 41, 59);
    doc.rect(margin, yPos + 2, barWidth, barHeight, 'F');
    
    doc.setFillColor(score.color[0], score.color[1], score.color[2]);
    doc.rect(margin, yPos + 2, (barWidth * score.value) / 100, barHeight, 'F');
    
    yPos += lineHeight * 1.5;
  });
  yPos += sectionSpacing;

  // ICP
  addSectionHeader('Target ICP', [14, 165, 233]);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  doc.text(report.icp.name, margin, yPos);
  yPos += lineHeight;
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(203, 213, 225);
  doc.text(report.icp.demographics, margin, yPos);
  yPos += lineHeight;
  
  if (report.icp.quote) {
    doc.setFontStyle('italic');
    doc.text(`"${report.icp.quote}"`, margin, yPos);
    yPos += lineHeight * 1.5;
  }

  // Market Signals
  if (report.market) {
    addSectionHeader('Market Signals', [14, 165, 233]);
    
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(203, 213, 225);
    doc.text(`Search Volume: ${report.market.search_volume?.toLocaleString() || 0}`, margin, yPos);
    yPos += lineHeight;
    
    if (report.market.trend_direction) {
      const trendColor = report.market.trend_direction === "rising" ? [52, 211, 153] : [239, 68, 68];
      doc.setTextColor(trendColor[0], trendColor[1], trendColor[2]);
      doc.text(
        `Trend: ${report.market.trend_direction === "rising" ? "+" : "-"}${report.market.trend_pct || 0}% ${report.market.trend_direction}`,
        margin,
        yPos
      );
      yPos += lineHeight;
    }
    yPos += sectionSpacing;
  }

  // 7-Day Execution Plan
  if (report.roadmap?.days && report.roadmap.days.length > 0) {
    addSectionHeader('7-Day Execution Plan', [14, 165, 233]);
    
    report.roadmap.days.slice(0, 7).forEach((day) => {
      checkPageBreak(20);
      
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(14, 165, 233);
      doc.text(`Day ${day.day}: ${day.title}`, margin, yPos);
      yPos += lineHeight;
      
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(203, 213, 225);
      
      day.tasks.slice(0, 3).forEach((task) => {
        doc.text(`• ${task}`, margin + 5, yPos);
        yPos += lineHeight;
      });
      
      yPos += sectionSpacing / 2;
    });
  }

  // Wedge to Win
  if (report.wedge_to_win && report.wedge_to_win.length > 0) {
    addSectionHeader('Wedge to Win', [168, 85, 247]);
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(203, 213, 225);
    
    report.wedge_to_win.forEach((item) => {
      checkPageBreak(8);
      doc.text(`• ${item}`, margin, yPos);
      yPos += lineHeight;
    });
    yPos += sectionSpacing;
  }

  // Footer on each page
  const addFooter = () => {
    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139);
    doc.text(
      'Generated by KILLARITY ENGINE • killarity.com',
      pageWidth / 2,
      pageHeight - 10,
      { align: 'center' }
    );
  };

  // Add footer to all pages
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    addFooter();
  }

  // Generate filename
  const filename = `Killarity-Report-${reportId}-${new Date().toISOString().split('T')[0]}.pdf`;
  
  // Save PDF
  doc.save(filename);
};


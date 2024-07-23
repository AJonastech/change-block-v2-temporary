declare module 'html2pdf.js' {
    interface Html2PdfOptions {
      margin?: number | number[];
      filename?: string;
      image?: { type: string; quality: number };
      html2canvas?: { scale: number };
      jsPDF?: { unit: string; format: string | number[]; orientation: string };
    }
  
    interface Html2Pdf {
      from(element: HTMLElement): Html2Pdf;
      set(opt: Html2PdfOptions): Html2Pdf;
      save(): void;
    }
  
    function html2pdf(): Html2Pdf;
  
    export default html2pdf;
  }
  